<script setup lang="ts">
import ActionButton from "@/components/ActionButton.vue";
import router from "@/router";
</script>

<template>
  <div class="d-flex flex-column justify-content-center">
    <div class="d-flex flex-row justify-content-center mb-4">
      <ActionButton
        plain
        @click="() => router.back()"
        class="text-muted"
        icon="arrow-left-short"
        >Go back to Sign In</ActionButton
      >
    </div>
    <h4>How to get WaniKani API token?</h4>
    <p>
      In order to use WaniKani vocabulary you need to sign in using your
      WaniKani account. Currently it's only possible through API token.
    </p>
    <ol>
      <li>
        Go to the
        <a
          class="text-muted"
          href="https://www.wanikani.com/settings/personal_access_tokens"
          >API token page</a
        >
      </li>
      <li>Click on "Generate a new token"</li>
      <li>In the token description you can write "Kazan app"</li>
      <li>Click on "Generate token" on the bottom of the page</li>
      <li>You will see a new token appear</li>
    </ol>
    <p>Now you can copy your WaniKani API token and use it for sign in.</p>
  </div>
</template>
