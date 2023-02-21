import { Amplify, Storage } from 'aws-amplify';
import { FileUploader, CloudImage } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import { useEffect, useState } from 'react';
Amplify.configure(awsExports);

// const file = await Storage.get("Screen-Shot-2022-09-21-at-7.05.02-PM-(1)-(1).png", {
//   level: "public"
// });

export default function FileUploaderEmail() {
  const [key, setKey] = useState<string>();
  const onSuccess = (event) => {
    console.log('got back', event);
    setKey(event.key);
  };
  
  // useEffect(() => {
  //   const getImage = async () => {
  //     const file = await Storage.get("Screen-Shot-2022-09-21-at-7.05.02-PM-(1)-(1).png", {
  //       level: "public"
  //     });
  //     setImage(file);
  //   }
  //   getImage();
  // },[])
  
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
    {/* <img src={image} alt="" /> */}
    {key ? <CloudImage imgKey={key} alt="" level="public" /> : null}
    
    </>
  );
}
