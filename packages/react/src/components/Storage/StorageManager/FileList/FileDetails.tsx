import React from 'react';
import { IconEdit } from '../../../../primitives/Icon/icons';
import {
  Button,
  Text,
  ComponentClassNames,
  View,
  VisuallyHidden,
} from '../../../../primitives';

import { UploadDetailsProps } from './types';

export const UploadDetails = ({
  children,
  displayName,
  fileSize,
  onClick,
}: UploadDetailsProps): JSX.Element => {
  return (
    <>
      <View className={ComponentClassNames.StorageManagerFileMain}>
        <Text className={ComponentClassNames.StorageManagerFileName}>
          {displayName}
        </Text>
      </View>
      {onClick ? (
        <Button onClick={onClick} size="small" variation="link">
          <VisuallyHidden>Edit file name {displayName}</VisuallyHidden>
          <IconEdit aria-hidden fontSize="medium" />
        </Button>
      ) : null}
      <Text as="span" className={ComponentClassNames.StorageManagerFileSize}>
        {children}
      </Text>
    </>
  );
};
