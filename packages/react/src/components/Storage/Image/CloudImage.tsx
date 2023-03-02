import * as React from 'react';
import type { StorageAccessLevel } from '@aws-amplify/storage';
import { Image, ImageProps } from '../../../primitives';
import { useStorageURL } from '../../../internal';
import { isFunction } from '@aws-amplify/ui';

type Layout = "fullWidth" | "fixed" | "constrained";

interface CloudImageProps extends Omit<ImageProps, 'src'> {
  imgKey: string;
  path?: string;
  alt: string;
  identityId?: string;
  accessLevel?: StorageAccessLevel;
  layout?: Layout;
  errorComponent?: React.ReactElement;
  loadingComponent?: React.ReactElement;
}

export function CloudImage({
  imgKey: key,
  // path,
  alt,
  identityId,
  accessLevel,
  layout,
  width,
  height,
  errorComponent = null,
  loadingComponent = null,
  onError,
  ...rest
}: CloudImageProps): JSX.Element {
  const options = {
    level: accessLevel,
    identityId,
  };

  // Storage.get is "dumb"
  // it just creates the signed URL, but doesn't validate
  // the identity ID or anything
  const { url, error: storageError, isLoading } = useStorageURL(key, options);

  const [error, setError] = React.useState<string | Error>(storageError);
  
  const _onError: ImageProps['onError'] = (event) => {
    // this is weird because this function expects an Event, BUT
    // there could be an Error coming from Storage
    if (isFunction(onError)) {
      onError(event)
    }
    setError(new Error('Image not found'));
  }
  
  // what if I want to use the error message?
  if (error) {
    return errorComponent
  }
  
  if (isLoading) {
    return loadingComponent
  }
  
  const props: ImageProps = {
    src: url,
    alt,
    onError: _onError,
  };
  
  if (layout) {
    if (layout === 'constrained') {
      props['maxWidth'] = `${width}px`;
      props['maxHeight'] = `${height}px`;
      props['width'] = `100%`;
    }
  }
  
  
  {/* TODO: make width/height prop change on Image */}
  return (
    <Image {...rest} src={url} alt={alt} onError={_onError} />
  )
}
