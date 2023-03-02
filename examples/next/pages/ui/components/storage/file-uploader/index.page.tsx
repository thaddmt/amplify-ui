import { Amplify, Storage } from 'aws-amplify';
import { FileUploader, CloudImage } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import { useEffect, useState } from 'react';
Amplify.configure(awsExports);

export default function FileUploaderEmail() {
  const [key, setKey] = useState<string>();
  const onSuccess = (event) => {
    console.log('got back', event);
    setKey(event.key);
  };

  return (
    <>
    <FileUploader
      variation="drop"
      onSuccess={onSuccess}
      acceptedFileTypes={['image/*']}
      accessLevel="public"
      hasMultipleFiles={true}
      maxSize={100000000}
      maxFileCount={3}
      isResumable={true}
    />

    {key ? <CloudImage imgKey={key} alt="" level="public" /> : null}
    
    </>
  );
}
