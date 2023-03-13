<script setup lang="ts">
import { Amplify } from 'aws-amplify';
import { Authenticator, SignIn } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);
const formFields = {
  confirmVerifyUser: {
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
};
const log = console.log;
</script>

<template>
  <authenticator :form-fields="formFields" :hide-sign-up="true">
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>

    <template v-slot:sign-in="{ signInProps }">
      <button class="amplify-button" @click="() => log(signInProps)">
        Log SignInProps
      </button>
      <br />
      <sign-in v-bind="signInProps" />
    </template>
  </authenticator>
</template>
