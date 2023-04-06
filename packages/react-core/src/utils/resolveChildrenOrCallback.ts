import { isString, isTypedFunction } from '@aws-amplify/ui';

type Callback<Params = unknown> = (...params: Params[]) => React.ReactNode;

export default function resolveChildrenOrCallbackTwo<Params>(
  children: React.ReactNode | Callback<Params>,
  ...params: Params[]
): React.ReactNode {
  // if `children` is a string or an array just return
  if (isString(children) || Array.isArray(children)) {
    return children;
  }

  return isTypedFunction<Callback<Params>>(children)
    ? children(...params)
    : children;
}
