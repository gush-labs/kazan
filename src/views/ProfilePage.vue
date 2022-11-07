<script setup lang="ts">
import ActionButton from "@/components/ActionButton.vue";
import PageLink from "@/components/PageLink.vue";
import { Authentication } from "@/core/Authentication";

const user = Authentication.user;
</script>

<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <div class="control-container">
      <div>
        <div class="d-flex flex-row justify-content-center">
          <h4 class="mb-0">Your Profile</h4>
        </div>
        <div class="d-flex flex-row justify-content-center" v-if="user">
          <div>
            <i class="bi bi-person-circle"></i> {{ user.username }}
            <i class="bi bi-dot"></i> Level {{ user.level }}
          </div>
        </div>
      </div>

      <div class="control-buttons-container mt-4">
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
        <ActionButton
          @click="() => Authentication.logout()"
          v-if="user"
          icon="box-arrow-left"
          class="kz-danger"
          >Logout</ActionButton
        >
      </div>
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
