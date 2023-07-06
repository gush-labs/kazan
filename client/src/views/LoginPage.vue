<script setup lang="ts">
import { Authentication } from "@/core/Authentication";
import ActionButton from "@/components/ActionButton.vue";
import PageLink from "@/components/PageLink.vue";
import router from "@/router";
import { ref, watch } from "vue";
import DisplayContainer from "@/components/DisplayContainer.vue";

const errorText = ref("");
const apiKeyInput = ref("");
const showLoadingProcess = ref(false);

// Redirect user to the profile page if user is logged in
if (Authentication.user.value) {
  router.push({ name: "profile" });
}

watch(apiKeyInput, () => errorText.value = "");

async function signIn() {
  if (apiKeyInput.value.length == 0) {
    errorText.value = "API token can't be empty";
    return;
  }
  showLoadingProcess.value = true;

  const authenticated = await Authentication.login({ wanikaniApiKey: apiKeyInput.value });
  setTimeout(() => {
    showLoadingProcess.value = false;
    if (authenticated) {
      router.push({ name: "profile" });
    } else {
      errorText.value = "API token is incorrect";
    }
  }, 1000);
}
</script>

<template>
  <DisplayContainer center short class="text-center">
    <div class="d-flex flex-column">
      <h4>Sign in</h4>
      <p :class="{ error: errorText, 'text-muted': !errorText }">
        <Transition name="signin-text-transition" mode="out-in">
          <span v-if="errorText">{{ errorText }}</span>
          <span v-else>Sign in through your WaniKani account</span>
        </Transition>
      </p>
      <input
        v-model="apiKeyInput"
        class="form-control font-monospace kz-input"
        placeholder="WaniKani API token"
      />
      <ActionButton
        @click="signIn"
        class="w-100 gap-top"
        :type="showLoadingProcess ? 'active' : 'success'"
        >
        <Transition name="signin-text-transition" mode="out-in">
          <span v-if="!showLoadingProcess"><i class="bi bi-box-arrow-in-right"></i> Sign in</span>
          <span v-else><i class="bi bi-arrow-up-circle"></i> Authenticating...</span>
        </Transition>
      </ActionButton>
      <PageLink
        icon="question-circle"
        :to="{ name: 'api-guide' }"
        plain
        class="signin-guide-link text-muted mt-3"
        >How to get WaniKani API token?</PageLink
      >
    </div>
  </DisplayContainer>
</template>

<style scoped>
.error {
  color: var(--text-error-color);
}
.signin-guide-link {
  text-decoration: none;
}

.signin-text-transition-enter-active,
.signin-text-transition-leave-active {
  opacity: 1;
  transition: 0.2s;
}

.signin-text-transition-enter-from,
.signin-text-transition-leave-to {
  opacity: 0;
}

</style>
