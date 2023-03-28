import * as React from 'react';

import { Button, Flex } from '@aws-amplify/ui-react';

type ButtonProps = Parameters<typeof Button>[0];
interface LinkButtonProps
  extends Required<Pick<ButtonProps, 'onClick' | 'children'>> {
  key: string;
}

export interface LinkButtonsProps {
  buttons?: LinkButtonProps[];
}

const LinkButton = ({ children, key, onClick }: LinkButtonProps) => (
  <Button
    fontWeight="normal"
    key={key}
    onClick={onClick}
    type="button"
    variation="link"
  >
    {children}
  </Button>
);

export default function LinkButtons({
  buttons,
}: LinkButtonsProps): JSX.Element | null {
  if (!buttons?.length) {
    return null;
  }

  return <Flex justifyContent="space-around">{buttons?.map(LinkButton)}</Flex>;
}
