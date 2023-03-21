import { StorageManagerDisplayText } from '../displayText';

export interface DropZoneProps
  extends Pick<StorageManagerDisplayText, 'dropFilesText'> {
  acceptedFileTypes: string[];
  browseFilesText: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  onChange: (
    event: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>
  ) => void;
}
