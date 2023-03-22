import React from 'react';
import { humanFileSize } from '@aws-amplify/ui';

import { View, Loader, ComponentClassNames } from '../../../../primitives';

import { FileState } from '../types';
import { FileRemoveButton } from './FileRemoveButton';
import { UploadDetails } from './FileDetails';
import { FileThumbnail } from './FileThumbnail';
import { FileControlProps } from './types';

export function FileControl({
  // onCancelEdit,
  // onPause,
  // onResume,
  // onSaveEdit,
  children,
  displayName,
  // extensionNotAllowedText,
  isImage,
  loaderIsDeterminate,
  onRemove,
  onStartEdit,
  // pauseText,
  progress,
  // resumeText,
  showThumbnails = true,
  size,
  status,
  thumbnailUrl,
}: FileControlProps): JSX.Element {
  // @TODO add back edit capabilities
  const showEditButton = false;
  return (
    <View className={ComponentClassNames.StorageManagerFile}>
      <View className={ComponentClassNames.StorageManagerFileWrapper}>
        {showThumbnails ? (
          <FileThumbnail
            isImage={isImage}
            fileName={displayName}
            url={thumbnailUrl}
          />
        ) : null}

        <UploadDetails
          displayName={displayName}
          onClick={showEditButton ? onStartEdit : undefined}
        >
          {humanFileSize(size)}
        </UploadDetails>

        {status === FileState.LOADING ? (
          <Loader
            className={ComponentClassNames.StorageManagerLoader}
            variation="linear"
            percentage={progress}
            isDeterminate={loaderIsDeterminate}
            isPercentageTextHidden
          />
        ) : null}
        {status === FileState.READY ? (
          <FileRemoveButton
            altText={`Remove file${displayName}`}
            onClick={onRemove}
          />
        ) : null}
      </View>
      {children}
    </View>
  );
}
