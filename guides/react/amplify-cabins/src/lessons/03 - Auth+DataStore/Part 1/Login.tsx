/*
 * 📕 Part 1 - AUTHENTICATION
 *
 * Prereqs: Please make sure to copy the aws-exports.js file to the src/ folder
 * (you can copy and paste it into a new file called src/aws-exports.js)
 * as described in the wiki https://w.amazon.com/bin/view/AWS/Mobile/Amplify/AmplifyUI/Workshops/WDC2022NY#Haws-exports.js
 *
 * 👉 STEP 1
 *
 * Add the Authenticator component.
 * - After adding the Authenticator to the page,
 *   you should be  able to view it at http://localhost:3000/login (run npm start first)
 * Add a "Sign out" button inside the Authenticator (use the Amplify UI Button component).
 * (Hint: you can see a quick example of this on our docs https://ui.docs.amplify.aws/react/connected-components/authenticator#3-add-the-authenticator)
 *
 * 👉 STEP 2
 *
 * In this step you want to navigate to the /admin route after a user logs in, make sure
 * to use the route hook and use navigate.
 * (Hint: In the useEffect, check if the current route is 'authenticated'. If so,
 * use 'navigate' to redirect the user to the '/admin' url. You can find a similar
 * example on our docs: https://ui.docs.amplify.aws/react/guides/auth-protected#setting-up-the-authenticator)
 *
 * 🔹 HINT
 *
 * The completed code is in the same directory!
 *
 * Also check out our setting up the Authenticator guide!
 * https://ui.docs.amplify.aws/react/guides/auth-protected#setting-up-the-authenticator
 *
 * ✨ BONUS 1
 *
 * Can you find two different ways of logging out?
 *
 * ✨ Test It Out!
 *
 * After you are done with both steps, try it out! On the command line run:
 *
 * npm start
 *
 * Then open localhost:3000/login and create a new account and log in!
 * You can also use these credentials to log in
 *
 * email: test@example.com
 * password: testuser1
 *
 * It should redirect you to the Edit Property page
 *
 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Flex,
  View,
  Authenticator,
  useAuthenticator,
  Button,
} from '@aws-amplify/ui-react';

import Layout from '../../../components/Layout';

export default function Login() {
  const { route } = useAuthenticator((context) => [context.route]);
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * 👉 STEP 2
     *
     * Hint: Use the navigate hook
     *
     */
  }, []);

  return (
    <Layout>
      <Flex direction="column" height="100%">
        <View margin="auto">
          {/**
           *
           * 👉 STEP 1
           *
           */}
        </View>
      </Flex>
    </Layout>
  );
}
