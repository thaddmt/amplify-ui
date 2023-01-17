import { StorageAccessLevel } from '@aws-amplify/storage';
import { useStorageURL } from '../../../internal';

interface CloudImageProps {
  imgKey: string;
  path?: string;
  alt: string;
  identityId?: string;
  level?: StorageAccessLevel;
}

export function CloudImage({
  imgKey: key,
  path,
  alt,
  identityId,
  level,
}: CloudImageProps): JSX.Element {
  const { url, error, isLoading } = useStorageURL(key);
  
  if (isLoading) {
    return (
      <div>loading</div>
    )
  } else {
    return (
      <img src={url} alt={alt} />
    )
  }
}
