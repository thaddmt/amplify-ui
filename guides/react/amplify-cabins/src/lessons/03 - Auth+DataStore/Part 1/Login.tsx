/*
 * 📕 Part 1 - AUTHENTICATION
 *
 *
 * 👉 STEP 1
 *
 * Add the Authenticator and include a logout button!
 *
 * 👉 STEP 2
 *
 * After authenticating route to the admin route
 *
 * 🔹 HINT
 *
 * The completed code is in the same directory!
 *
 * ✨ BONUS 1
 *
 * Can you find two different ways of logging out?
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
