import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Authenticator } from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';

import { SignOutButton } from '../SignOutButton';
import awsconfig from './aws-exports';
Amplify.configure({
  ...awsconfig,
  // mock server endpoint for Detox e2es
  Auth: { endpoint: 'http://127.0.0.1:9091/' },
});

function App() {
  return (
    <Authenticator.Provider>
      <Authenticator initialState="signUp">
        <View style={style.container}>
          <SignOutButton />
        </View>
      </Authenticator>
    </Authenticator.Provider>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default App;
