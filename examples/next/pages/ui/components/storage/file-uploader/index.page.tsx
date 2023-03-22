import { Amplify } from 'aws-amplify';
import { FileUploader, StorageManager } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

export default function FileUploaderEmail() {
  const onSuccess = (event) => {
    console.log('got back', event);
  };
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      accessLevel="public"
      maxFileSize={100000000}
      maxFileCount={3}
      isResumable={true}
    />
  );
}
