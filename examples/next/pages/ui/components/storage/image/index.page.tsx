import * as React from 'react';
import { Amplify, Storage, Auth } from 'aws-amplify';
import { FileUploader, CloudImage, Alert } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import { useEffect, useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Loader } from '@aws-amplify/ui-react';
import { Placeholder } from '@aws-amplify/ui-react';
import { blurhashToCssGradientString } from "@unpic/placeholder";
Amplify.configure(awsExports);

// something something
// on image upload, run a BlurHash and save that to some
// meta data or something
// save that to a model or something
// how to have storage category do this automatically
// we need blurhash to css background
// https://github.com/ascorbic/unpic-placeholder

export default function CloudImageExample() {
  const [id, setId] = React.useState();
  React.useEffect(() => {
    const getUser = async () => {
      const user = await Auth.currentUserInfo();
      console.log(user);
      setId(user.identityId);
    }
    setTimeout(() => {getUser()}, 4000);
    
    return () => { setId(undefined) }
  },[]);
  const placeholder = blurhashToCssGradientString("K9C6u*%f004-9t_M~Ws:aw")
  
  return (
    <>
    <Authenticator>
      
      <CloudImage width={300} height={300} backgroundImage={placeholder} imgKey="CleanShot 2023-02-28 at 11.40.09 2@2x.png" identityId={id} alt="" level="private" />
      
      <CloudImage imgKey="badkey.jpg" identityId="foo" alt="" level="private" onError={() => { console.log('error')}} errorComponent={<>
        <Alert variation='error'>Error</Alert>
      </>} />
    </Authenticator>
    </>
  );
}
