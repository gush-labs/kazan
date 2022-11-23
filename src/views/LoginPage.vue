<script setup lang="ts">
import LoadingCircle from "@/components/LoadingCircle.vue";
import { Authentication } from "@/core/Authentication";
import ActionButton from "@/components/ActionButton.vue";
import { WaniKaniClient } from "@/core/WaniKaniClient";
import PageLink from "@/components/PageLink.vue";
import router from "@/router";
import { ref, watch } from "vue";
import DisplayContainer from "@/components/DisplayContainer.vue";

const input = ref("");
const loading = ref(false);
const error = ref("");
const user = Authentication.user;

if (user.value) {
  router.push({ name: "home" });
}

watch(input, (value) => {
  if (value == "") {
    error.value = "";
  }
});

function signIn() {
  if (input.value.length == 0) {
    return;
  }

  WaniKaniClient.setKey(input.value);
  Authentication.login().then((success) => {
    loading.value = false;
    if (success) {
      setTimeout(() => router.push({ name: "home" }), 5000);
    } else {
      error.value = "Failed to login. Make sure that API key is correct";
    }
  });
  loading.value = true;
}
</script>

<template>
  <DisplayContainer center short class="text-center">
    <div v-if="!user" class="d-flex flex-column">
      <h4>Sign in</h4>
      <p :class="{ error: error, 'text-muted': !error }">
        <i v-if="error" class="bi bi-exclamation-circle"></i>
        {{ error ? error : "Sign in through your WaniKani account" }}
      </p>
      <input
        v-model="input"
        class="form-control font-monospace kz-input"
        placeholder="WaniKani API token"
      />
      <ActionButton
        v-if="!loading"
        @click="signIn"
        icon="box-arrow-in-right"
        class="w-100 sign-button kz-success"
        >Sign in</ActionButton
      >
      <PageLink
        icon="question-circle"
        :to="{ name: 'api-guide' }"
        plain
        class="signin-guide-link text-muted mt-3"
        >How to get WaniKani API token?</PageLink
      >
      <!--<div id="appleid-signin" class="signin-button mt-3" data-color="black" data-width="100%" data-border="true" data-type="sign-in"></div>-->
      <div
        v-if="loading"
        class="mt-3 p-2 d-flex flex-row justify-content-center align-items-center"
      >
        <LoadingCircle class="me-1"></LoadingCircle>
        <div>Signing up...</div>
      </div>
    </div>

    <div v-if="user">
      <h4>Hello, {{ user.username }}!</h4>
      <p>初めまして</p>
    </div>

    <div
      v-if="user"
      class="redirect-progress w-100 d-flex flex-row justify-content-start mt-3"
    >
      <div class="redirect-progress-line"></div>
    </div>
  </DisplayContainer>
</template>

<style scoped>
.error {
  color: var(--text-error-color);
}
.redirect-progress {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: var(--button-border-radius);
}

.sign-button {
  margin-top: var(--default-grid-gap);
}

.redirect-progress-line {
  min-height: 0.25em;
  background-color: rgba(0, 0, 0, 0.25);
  animation-duration: 5s;
  animation-name: progress;
  border-radius: var(--button-border-radius);
}
.signin-button {
  width: 100%;
  height: 2.5em;
}
.signin-guide-link {
  text-decoration: none;
}
@keyframes progress {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}
</style>
