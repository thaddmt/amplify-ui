<script setup lang="ts">
import { Amplify } from 'aws-amplify';
import { Authenticator, useAuth } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);
const { user, signOut } = useAuth();
</script>

<template>
  <authenticator v-if="!user" />
  <div v-if="!!user">
    Hello, {{ user.attributes?.email }}
    <br />
    <button @click="signOut">Sign Out</button>
  </div>
</template>
