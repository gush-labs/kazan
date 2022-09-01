<script setup lang="ts">
import LoadingCircle from "@/components/LoadingCircle.vue";
import Authentication from "@/core/Authentication";
import ActionButton from "@/components/ActionButton.vue";
import WaniKani from "@/core/WaniKani";
import { User } from "@/core/Database";
import router from "@/router";
import { ref } from "vue";

const input = ref("");
const loading = ref(false);
const error = ref("");
const user = User.ref;

function signIn() {
  if (input.value.length == 0) {
    return;
  }

  WaniKani.ref.value = new WaniKani(input.value);
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
  <div class="d-flex flex-column justify-content-center text-center mb-3">
    <div class="d-flex flex-row justify-content-center">
      <div v-if="!user" class="profile-container">
        <h4>Sign in</h4>
        <p :class="{ error: error, 'text-muted': !error }">
          <i v-if="error" class="bi bi-exclamation-circle"></i>
          {{ error ? error : "Sign in through your WaniKani account" }}
        </p>
        <input
          v-model="input"
          class="form-control font-monospace"
          placeholder="WaniKani API key"
        />
        <ActionButton
          v-if="!loading"
          @click="signIn"
          icon="box-arrow-in-right"
          class="w-100 mt-3"
          >Sign in</ActionButton
        >
        <div v-if="loading" class="mt-3 p-2">
          <LoadingCircle />
          Signing up...
        </div>
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
  </div>
</template>

<style scoped>
.error {
  color: var(--text-error-color);
}
.redirect-progress {
  background-color: rgba(0, 0, 0, 0.1);
}

.redirect-progress-line {
  min-height: 0.25em;
  background-color: rgba(0, 0, 0, 0.25);
  animation-duration: 5s;
  animation-name: progress;
}

@keyframes progress {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

.form-control {
  border-radius: 0px;
}

@media screen and (max-width: 650px) {
  .profile-container {
    width: 100%;
  }
}
@media screen and (min-width: 650px) {
  .profile-container {
    width: 75%;
  }
}
</style>
