<script setup lang="ts">
import ActionButton from "@/components/ActionButton.vue";
import PageLink from "@/components/PageLink.vue";
import DisplayContainer from "@/components/DisplayContainer.vue";
import { Authentication } from "@/core/Authentication";

const user = Authentication.user;
</script>

<template>
  <DisplayContainer center short>
    <div class="d-flex flex-row justify-content-center mb-3">
      <h4 class="mb-0">Your Profile</h4>
    </div>

    <div v-if="user" class="kz-container px-3 py-2 d-flex flex-row profile-container">
      <div class="d-flex flex-column justify-content-center profile-icon">
        <i class="bi bi-person-circle"></i>
      </div>
      <div class="d-flex flex-column ms-3 justify-content-center w-100">
        <div class="">{{ user.username }}</div>
        <div class="text-muted">Level {{ user.level }}</div>
      </div>
      <div class="d-flex flex-column justify-content-center">
      <ActionButton
        @click="() => Authentication.logout()"
        v-if="user"
        icon="arrow-left-square"
        class="kz-danger"
        ></ActionButton
      >
        
      </div>
    </div>

    <div class="control-buttons-container gap-top">
      <PageLink
        class="kz-success"
        :to="{ name: 'login' }"
        v-if="!user"
        icon="box-arrow-right"
        >Sign in</PageLink
      >
      <PageLink :to="{ name: 'settings' }" icon="gear">Settings</PageLink>
      <PageLink :to="{ name: 'about' }" icon="info-circle"
        >About the app</PageLink
      >
    </div>
  </DisplayContainer>
</template>

<style scoped>
.profile-icon {
  font-size: 2.5em;
}
.profile-container {
}
.control-buttons-container {
  display: grid;
  gap: var(--default-grid-gap);
}
</style>
