import { ComponentClassNames } from '../../../../primitives';
import { IconCheck, IconError } from '../../../../primitives/Icon/internal';
import classNames from 'classnames';

import { StorageManagerDisplayText } from '../displayText';
import { FileState } from '../types';

export const getFileControlMessageProps = ({
  displayText,
  errorMessage,
  fileState,
  percentage,
}: {
  errorMessage: string;
  fileState: FileState;
  displayText: StorageManagerDisplayText;
  percentage: number;
}): { children: React.ReactNode; className: string } => {
  const { getPausedText, getUploadingText, uploadSuccessfulText } = displayText;

  switch (fileState) {
    case FileState.LOADING: {
      return {
        children: getUploadingText(percentage),
        className: ComponentClassNames.StorageManagerFileStatus,
      };
    }
    case FileState.PAUSED: {
      return {
        children: getPausedText(percentage),
        className: ComponentClassNames.StorageManagerFileStatus,
      };
    }
    case FileState.SUCCESS: {
      return {
        children: (
          <>
            <IconCheck fontSize="xl" /> {uploadSuccessfulText}
          </>
        ),
        className: classNames(
          ComponentClassNames.StorageManagerFileStatus,
          classNameModifier(
            ComponentClassNames.StorageManagerFileStatus,
            'success'
          )
        ),
      };
    }

    case FileState.ERROR: {
      return {
        children: (
          <>
            <IconError fontSize="xl" /> {errorMessage}
          </>
        ),
        className: classNames(
          ComponentClassNames.StorageManagerFileStatus,
          classNameModifier(
            ComponentClassNames.StorageManagerFileStatus,
            'error'
          )
        ),
      };
    }

    default: {
      return { children: null, className: '' };
    }
  }
};
