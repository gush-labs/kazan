<script setup lang="ts">
import ActionButton from "@/components/ActionButton.vue";
import PageLink from "@/components/PageLink.vue";
import { Authentication } from "@/core/Authentication";

const user = Authentication.user;
</script>

<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <div class="control-container">
      <div class="mb-3">
        <div class="d-flex flex-row justify-content-center">
          <h4>Your Profile</h4>
        </div>
        <div class="d-flex flex-row justify-content-center" v-if="user">
          <div>
            <i class="bi bi-person-circle"></i> {{ user.username }}
            <span class="badge rounded-pill text-bg-secondary ms-2" v-if="user"
              >Level {{ user.level }}</span
            >
          </div>
        </div>
      </div>

      <div class="control-buttons-container">
        <PageLink :to="{ name: 'login' }" v-if="!user" icon="box-arrow-right"
          >Sign in</PageLink
        >
        <ActionButton icon="gear" disabled>Settings</ActionButton>
        <ActionButton
          @click="() => Authentication.logout()"
          v-if="user"
          icon="box-arrow-left"
          >Logout</ActionButton
        >
      </div>

      <ActionButton icon="info-circle" class="mt-4 w-100" disabled
        >About the app</ActionButton
      >
    </div>
  </div>
</template>

<style scoped>
.control-buttons-container {
  display: grid;
  gap: var(--default-grid-gap);
}

@media screen and (max-width: 650px) {
  .control-container {
    width: 100%;
  }
}
@media screen and (min-width: 650px) {
  .control-container {
    width: 75%;
  }
}
</style>
