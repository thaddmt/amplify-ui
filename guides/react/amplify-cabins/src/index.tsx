import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import ReactDOM from 'react-dom/client';

import App from './App';

import '@aws-amplify/ui-react/styles.css';
import './index.css';

import { theme } from './theme';

/** import aws_exports from './aws-exports.js'; */

Amplify.configure({});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
  </ThemeProvider>
);
