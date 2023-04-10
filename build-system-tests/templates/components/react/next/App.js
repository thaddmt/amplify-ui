import React, { useEffect } from 'react';
import { Amplify, Notifications } from 'aws-amplify';
import {
  AccountSettings,
  Authenticator,
  FileUploader,
  MapView,
  Text,
  InAppMessagingProvider,
  InAppMessageDisplay,
} from '@aws-amplify/ui-react';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';
import awsconfig from '@/data/aws-exports';
Amplify.configure(awsconfig);

const { InAppMessaging } = Notifications;

export default function Home() {
  const handleSuccess = () => {
    alert('password is successfully changed!');
  };
  useEffect(() => {
    // sync remote in-app messages
    InAppMessaging.syncMessages();
  }, []);

  return (
    <>
      <InAppMessagingProvider>
        <InAppMessageDisplay />
        <Text>In-App Messaging Example</Text>
      </InAppMessagingProvider>
      <FileUploader acceptedFileTypes={['image/*']} accessLevel="public" />
      <Authenticator>
        {({ signOut, user = { username: '' } }) => (
          <main>
            <h1>Hello {user.username}</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
      <AccountSettings.ChangePassword onSuccess={handleSuccess} />
      <AccountSettings.DeleteUser onSuccess={handleSuccess} />
      <StorageManager
        acceptedFileTypes={['image/*']}
        accessLevel="public"
        maxFileCount={1}
        isResumable
      />
      <MapView />
    </>
  );
}