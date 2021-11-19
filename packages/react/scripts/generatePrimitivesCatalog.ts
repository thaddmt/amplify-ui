import fs from 'fs';
import path from 'path';
import { Node, Project, Symbol, Type, VariableDeclaration } from 'ts-morph';
import {
  PrimitiveCatalog,
  PrimitiveCatalogComponentProperties,
  PrimitiveCatalogComponentProperty,
  PrimitiveCatalogComponentPropertyType,
} from '../src/types/catalog';

/**
 * Determine if a TypeScript AST Node is a React component
 */
const isPrimitive = (node: Node): node is VariableDeclaration => {
  const typeName = node.getType().getText(node);
  return (
    Node.isVariableDeclaration(node) &&
    (typeName.startsWith('Primitive') ||
      typeName.startsWith('React.ForwardRef'))
  );
};

const isCallableNode = (node: Node): node is VariableDeclaration =>
  node.getType().getCallSignatures().length > 0;

const getComponentProperties = (type: Type) => {
  const properties: PrimitiveCatalogComponentProperties = {};

  type.getProperties().forEach((prop) => {
    const propName = prop.getName();
    const property = getCatalogComponentProperty(prop);

    if (property) {
      properties[propName] = property;
    }
  });

  return properties;
};

/**
 * Get a catalog-compatible component property definition
 */
const getCatalogComponentProperty = (
  property: Symbol
): PrimitiveCatalogComponentProperty => {
  const propType = property.getDeclarations()[0].getType();

  if (!propType) {
    return;
  } else if (propType.isBoolean() || propType.isBooleanLiteral()) {
    return { type: PrimitiveCatalogComponentPropertyType.Boolean };
  } else if (propType.isString() || propType.isStringLiteral()) {
    return { type: PrimitiveCatalogComponentPropertyType.String };
  } else if (propType.isNumber() || propType.isNumberLiteral()) {
    return { type: PrimitiveCatalogComponentPropertyType.Number };
  } else if (propType.isUnion()) {
    const hasString = propType
      .getUnionTypes()
      .some((prop) => prop.isStringLiteral() || prop.isString());

    if (hasString) {
      return {
        type: PrimitiveCatalogComponentPropertyType.String,
      };
    }
  }
};

const project = new Project({
  tsConfigFilePath: path.resolve(__dirname, '..', 'tsconfig.json'),
});

const source = project.getSourceFile('src/primitives/components.ts');
const catalog: PrimitiveCatalog = {};

/**
 * Extract properties from exported React components
 */
for (const [componentName, [node]] of source.getExportedDeclarations()) {
  let properties = {};

  if (isPrimitive(node)) {
    const [propsType] = node.getType().getTypeArguments();
    properties = getComponentProperties(propsType);
  } else if (isCallableNode(node)) {
    const [signature] = node.getType().getCallSignatures();

    if (signature && signature.getParameters().length > 0) {
      properties = getComponentProperties(
        signature.getParameters()[0].getValueDeclaration().getType()
      );
    }
  }

  // Skip primitives without properties
  if (Object.keys(properties).length > 0) {
    catalog[componentName] = { properties };
  }
}

// Generates dist/primitives.json file
const outputPath = path.resolve(__dirname, '..', 'dist', 'primitives.json');
fs.writeFileSync(outputPath, JSON.stringify(catalog, null, 2));
