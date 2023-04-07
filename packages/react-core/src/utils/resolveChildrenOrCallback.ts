import { isTypedFunction } from '@aws-amplify/ui';

type Callback<Params = unknown> = (...params: Params[]) => React.ReactNode;

export default function resolveChildrenOrCallback<Params>(
  children: React.ReactNode | Callback<Params>,
  ...params: Params[]
): React.ReactNode {
  return isTypedFunction<Callback<Params>>(children)
    ? children(...params)
    : children;
}
