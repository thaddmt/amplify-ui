import React, { useState } from 'react';

import { View } from '../../../../primitives';

import { DropZoneProps } from './types';

export const useDropZoneProps = ({
  isLoading,
  onDrop: _onDrop,
}: {
  isLoading?: boolean;
  onDrop: (
    event: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>
  ) => void;
}): {
  inDropZone: boolean;
  onDragStart: (event: any) => void;
  onDragEnter: (event: any) => void;
  onDragLeave: (event: any) => void;
  onDrop: (
    event: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>
  ) => void;
  onDragOver: (event: any) => void;
} => {
  const [inDropZone, setInDropZone] = useState(false);

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.clearData();
  };
  const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (isLoading) {
      return false;
    }
    setInDropZone(false);
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (isLoading) {
      return false;
    }
    setInDropZone(true);
    event.dataTransfer.dropEffect = 'copy';
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (isLoading) return false;
    setInDropZone(false);
    _onDrop(event);
  };

  return {
    inDropZone,
    onDragStart,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
  };
};

export function DropZone({ children, ...rest }: DropZoneProps): JSX.Element {
  return <View {...rest}>{children}</View>;
}
