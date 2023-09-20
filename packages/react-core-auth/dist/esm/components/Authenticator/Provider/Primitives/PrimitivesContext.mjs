import { createContextUtilities } from '@aws-amplify/ui-react-core';

const { PrimitivesProvider, usePrimitives: usePrimitivesBase } = createContextUtilities({
    contextName: 'Primitives',
    errorMessage: '`usePrimitives` must be called from within a `PrimitivesProvider`',
});
// wrap `usePrimitivesBase` to allow consumers to pass in `Platform` type
// for platform specific Primitive typings
function usePrimitives() {
    return usePrimitivesBase();
}

export { PrimitivesProvider, usePrimitives };
