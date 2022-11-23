<script setup lang="ts">
import ActionButton from "@/components/ActionButton.vue";
import PageLink from "@/components/PageLink.vue";
import router from "@/router";

const props = defineProps<{
  to?: any;
}>();
</script>

<template>
  <div class="w-100 d-flex flex-row justify-content-center">
    <ActionButton
      v-if="!props.to"
      plain
      @click="() => router.back()"
      class="text-muted pe-2"
      icon="arrow-left-short"
      >Go back</ActionButton
    >
    <PageLink
      plain
      v-if="props.to"
      :to="props.to"
      class="text-muted pe-2 link"
      icon="arrow-left-short"
      >Go back</PageLink
    >
  </div>
</template>

<style scoped>
.link {
  text-decoration: none;
}
</style>
