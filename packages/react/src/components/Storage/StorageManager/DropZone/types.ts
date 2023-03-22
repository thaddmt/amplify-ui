export interface DropZoneProps {
  onDragStart: (event: any) => void;
  onDragEnter: (event: any) => void;
  onDragLeave: (event: any) => void;
  onDrop: (event: any) => void;
  onDragOver: (event: any) => void;
  children?: React.ReactNode;
  className?: string;
}
