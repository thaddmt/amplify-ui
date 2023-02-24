import { StorageAccessLevel } from '@aws-amplify/storage';
import { FileUploaderDisplayText } from '../displayText';

export interface FileUploaderProps {
  acceptedFileTypes: string[];
  hasMultipleFiles?: boolean;
  isPreviewerVisible?: boolean;
  isResumable?: boolean;
  accessLevel: StorageAccessLevel;
  maxFileCount?: number;
  maxSize?: number;
  onError?: (error: string) => void;
  onSuccess?: (event: { key: string }) => void;
  shouldAutoProceed?: boolean;
  showImages?: boolean;
  variation?: 'drop' | 'button';
  displayText?: Partial<FileUploaderDisplayText>;
}
