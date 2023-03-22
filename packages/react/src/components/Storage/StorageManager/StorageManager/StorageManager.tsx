import * as React from 'react';

import { uploadFile } from '@aws-amplify/ui';

import {
  Button,
  ComponentClassNames,
  Text,
  VisuallyHidden,
  View,
} from '../../../../primitives';
import { IconUpload } from '../../../../primitives/Icon/internal';
import { classNameModifier } from '../../../../primitives/shared/utils';

import { DropZone, useDropZoneProps } from '../DropZone';
import { defaultStorageManagerDisplayText } from '../displayText';
import { FileList } from '../FileList/FileList';
import { FileState } from '../types';
import { StorageManagerProps } from './types';
import { useStorageManager } from '../hooks/useStorageManager';
import { checkMaxFileSize } from '../utils/checkMaxFileSize';
import { filterAllowedFiles } from '../utils/filterAllowedFiles';
import { FileListContainer } from '../FileListContainer';
import { FileListHeader } from '../FileListHeader';
import { FileListFooter } from '../FileListFooter';

import { Container } from './Container';

function StorageManager({
  acceptedFileTypes, // passed directly to file input && to limit uploads
  accessLevel, // used on upload
  displayText: overrideDisplayText, // UI only
  isResumable = false, // used on upload / determines if edit is shown
  maxFileCount,
  maxFileSize, // used on add file to set error
  onUploadError, // customer handler to fire on error
  onUploadSuccess, // customer handler to fire on success
  shouldAutoUpload = false, // used on upload
  showThumbnails = true, //
  components: { UploadButton = Button } = {},
}: StorageManagerProps): JSX.Element {
  const {
    files,
    addFiles,
    setUploadingFile,
    setUploadProgress,
    setUploadSuccess,
    removeUpload,
  } = useStorageManager();

  React.useEffect(() => {
    if (shouldAutoUpload) {
      const filesReadyToUpload = files.filter(
        (file) => file.status === FileState.READY
      );
      for (const { file, name, id } of filesReadyToUpload) {
        // I don't think onComplete even runs? LOL
        const onComplete: (event: { key: string }) => void = (event) => {
          console.log('done!');
          onUploadSuccess?.(event);
          setUploadSuccess({ id });
        };

        const onProgress: (progress: {
          loaded: number;
          total: number;
        }) => void = (progress) => {
          /**
           * When a file is zero bytes, the progress.total will equal zero.
           * Therefore, this will prevent a divide by zero error.
           */
          const progressPercentage =
            progress.total !== 0
              ? Math.floor((progress.loaded / progress.total) * 100)
              : 100;
          console.log('progress', progressPercentage);
          if (progress.loaded === 100) {
            console.log('100% there!', progress);
          }
          setUploadProgress({ id, progress: progressPercentage });
        };

        const onError = (error) => {
          console.error('something broke', error);
          onUploadError?.(error);
        };

        if (isResumable) {
          // @TODO: get UploadTask later on
          throw new Error('not implemented yet');
        } else {
          uploadFile({
            file,
            fileName: name,
            isResumable: false,
            level: accessLevel,
            completeCallback: onComplete,
            progressCallback: onProgress,
            errorCallback: onError,
          });
        }
        setUploadingFile({ id });

        // dispatch action to save upload task here:
        // dispatch(uploadTask)
      }
    }
  }, [
    files,
    accessLevel,
    isResumable,
    setUploadProgress,
    setUploadingFile,
    shouldAutoUpload,
    onUploadError,
    onUploadSuccess,
    setUploadSuccess,
  ]);

  const displayText = {
    ...defaultStorageManagerDisplayText,
    ...overrideDisplayText,
  };

  const { getFileSizeErrorText, dropFilesText, browseFilesText } = displayText;

  const getMaxFileSizeErrorMessage = (file: File): string => {
    return checkMaxFileSize({
      file,
      maxFileSize,
      getFileSizeErrorText,
    });
  };

  const isDragEvent = (
    event: unknown
  ): event is React.DragEvent<HTMLDivElement> => {
    return !!(event as React.DragEvent<HTMLDivElement>)?.dataTransfer;
  };

  const onDropZoneChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    if (isDragEvent(event)) {
      const { files } = event.dataTransfer;
      if (!files || files.length === 0) {
        return;
      }

      const filteredFiles = filterAllowedFiles(
        Array.from(files),
        acceptedFileTypes
      );
      addFiles({
        files: filteredFiles,
        getFileErrorMessage: getMaxFileSizeErrorMessage,
      });
    } else {
      const { files } = event.target;
      if (!files || files.length === 0) {
        return;
      }

      addFiles({
        files: Array.from(files),
        getFileErrorMessage: getMaxFileSizeErrorMessage,
      });
    }
  };

  const onRemoveUpload = (id: string) => {
    removeUpload({ id });
  };

  const onRemoveAllUploads = () => {
    // @TODO: implement action to remove all uploads
  };

  const onUpload = () => {};

  // FileListFooter params
  // Creates aggregate percentage to show during downloads
  const allUploadsPercentage = Math.floor(
    files.reduce((prev, curr) => prev + (curr?.progress ?? 0), 0) / files.length
  );

  // checks if all downloads completed to 100%
  const allUploadsSuccessful =
    files.length === 0
      ? false
      : files.every((status) => status?.progress === 100);

  // Displays if over max files
  const hasMaxFilesError =
    files.filter((file) => file.progress < 100).length > maxFileCount;

  const uploadedFilesLength = files.filter(
    (file) => file?.status === FileState.SUCCESS
  ).length;

  const remainingFilesCount = files.length - uploadedFilesLength;

  const isUploadDisabled =
    files.some((status) =>
      [FileState.ERROR, FileState.EDITING].includes(status?.status)
    ) ||
    remainingFilesCount === 0 ||
    hasMaxFilesError;

  const uploadsPending = files.some((status) =>
    [FileState.LOADING].includes(status?.status)
  );

  const hasFiles = files.length > 0;

  const { inDropZone, ...handlers } = useDropZoneProps({
    // this is never being updated in current version
    isLoading: false,
    onDrop: onDropZoneChange,
  });

  const hiddenInput = React.useRef<HTMLInputElement>(null);

  return (
    <Container
      className={hasFiles ? ComponentClassNames.StorageManagerPreviewer : ''}
    >
      <DropZone
        {...handlers}
        className={classNames(
          inDropZone &&
            classNameModifier(
              ComponentClassNames.StorageManagerDropZone,
              'active'
            ),
          ComponentClassNames.StorageManagerDropZone
        )}
      >
        <IconUpload
          aria-hidden
          className={ComponentClassNames.StorageManagerDropZoneIcon}
        />
        <Text className={ComponentClassNames.StorageManagerDropZoneText}>
          {dropFilesText}
        </Text>
        <View style={{ display: 'flex' }}>
          <UploadButton
            className={ComponentClassNames.StorageManagerDropZoneButton}
            // isDisabled={isLoading}
            onClick={() => {
              if (hiddenInput.current) {
                hiddenInput.current.click();
                hiddenInput.current.value = '';
              }
            }}
            size="small"
          >
            {browseFilesText}
          </UploadButton>
          <VisuallyHidden>
            <input
              type="file"
              tabIndex={-1}
              ref={hiddenInput}
              onChange={onDropZoneChange}
              // multiple={allowMultipleFiles}
              accept={acceptedFileTypes.join(',')}
            />
          </VisuallyHidden>
        </View>
      </DropZone>
      <FileListContainer
        className={ComponentClassNames.StorageManagerPreviewerBody}
      >
        {hasFiles ? (
          <FileListHeader
            fileCount={files.length}
            remainingFilesCount={remainingFilesCount}
            displayText={displayText}
            allUploadsSuccessful={allUploadsSuccessful}
          />
        ) : null}
        <View style={{ display: 'flex' }}>
          <Button
            className={ComponentClassNames.StorageManagerDropZoneButton}
            // isDisabled={isLoading}
            onClick={() => {
              if (hiddenInput.current) {
                hiddenInput.current.click();
                hiddenInput.current.value = '';
              }
            }}
            size="small"
          >
            {browseFilesText}
          </Button>
          <VisuallyHidden>
            <input
              type="file"
              tabIndex={-1}
              ref={hiddenInput}
              onChange={onDropZoneChange}
              // multiple={allowMultipleFiles}
              accept={acceptedFileTypes.join(',')}
            />
          </VisuallyHidden>
        </View>
      </FileListContainer>
      {hasFiles ? (
        <FileListFooter
          allUploadsPercentage={allUploadsPercentage}
          uploadsPending={uploadsPending}
          allUploadsSuccessful={allUploadsSuccessful}
          hasMaxFilesError={hasMaxFilesError}
          displayText={displayText}
          remainingFilesCount={remainingFilesCount}
          onRemoveAllUploads={onRemoveAllUploads}
          onUpload={onUpload}
          maxFileCount={maxFileCount}
          isUploadDisabled={isUploadDisabled}
        />
      ) : null}
    </Container>
  );
}

StorageManager.Container = Container;
StorageManager.DropZone = DropZone;
StorageManager.FileList = FileList;

export { StorageManager };
