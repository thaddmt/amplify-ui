/*
 * 📕 Part 1 - AUTHENTICATION
 *
 * Prereqs: Please make sure to copy the aws-exports.js file to the src/ folder
 * (you can copy and paste it into a new file called src/aws-exports.js)
 * as described in the wiki https://w.amazon.com/bin/view/AWS/Mobile/Amplify/AmplifyUI/Workshops/WDC2022NY/
 *
 * 👉 STEP 1
 *
 * Add the Authenticator and include a logout button!
 *
 * 👉 STEP 2
 *
 * In this step you want to navigate to the /admin route after a user logs in, make sure
 * to use the route hook and navigate.
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
