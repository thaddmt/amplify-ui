import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import {
  BaseBreadcrumbItemProps,
  BreadcrumbsItemProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';

import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import { View } from '../View';

const BreadcrumbItemPrimitive: Primitive<BreadcrumbsItemProps, 'li'> = (
  { className, children, as = 'li', ...rest },
  ref
) => {
  const componentClasses = classNames(
    ComponentClassNames.BreadcrumbsItem,
    className
  );

  return (
    <View {...rest} as={as} className={componentClasses} ref={ref}>
      {children}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/breadcrumbs)
 */
export const BreadcrumbItem: ForwardRefPrimitive<
  BaseBreadcrumbItemProps,
  'span'
> = React.forwardRef(BreadcrumbItemPrimitive) as ForwardRefPrimitive<
  BaseBreadcrumbItemProps,
  'span'
>;

BreadcrumbItem.displayName = 'Breadcrumbs.Item';
