<script setup lang="ts">
import LoadingCircle from "./LoadingCircle.vue";
import { Application, type Process, type Error } from "@/core/Application";
import { ref, computed, watch } from "vue";
import {
  watchRemove,
  watchUpdate,
  watchRemoveDelay,
  watchUpdateDelay,
} from "@/core/Utilities";

const showInfo = computed(() => {
  return (
    Application.status.currentProcess.value == undefined &&
    Application.status.currentError.value == undefined
  );
});

const showProcess = computed(() => {
  return Application.status.currentError.value == undefined;
});

const process = ref<Process | undefined>(undefined);
const error = ref<Error | undefined>(undefined);
const info = ref<boolean>(true);

watch(info, (v) => {
  console.log(v);
});
// Hide instantly general app info
watchUpdate(Application.status.currentProcess, () => (info.value = false));
watchUpdate(Application.status.currentError, () => (info.value = false));
// Show general app info with delay to give other animations time to finish
watchRemoveDelay(
  Application.status.currentProcess,
  () => (info.value = showInfo.value),
  550
);
watchRemoveDelay(
  Application.status.currentError,
  () => {
    console.log("ERROR REMOVE");
    info.value = showInfo.value;
  },
  550
);

// We want to hide process view instantly in case if process is completed or there an error
watchRemove(
  Application.status.currentProcess,
  () => (process.value = undefined)
);
watchUpdate(Application.status.currentError, () => (process.value = undefined));
// And show the process with some delay to give other animations time to finish
watchUpdateDelay(
  Application.status.currentProcess,
  (p) => (process.value = showProcess.value ? p : undefined),
  550
);
watchRemoveDelay(
  Application.status.currentError,
  () => (process.value = Application.status.currentProcess.value),
  550
);

// Instantly hide the error
watchRemove(Application.status.currentError, () => (error.value = undefined));
// And show it with some delay
watchUpdateDelay(
  Application.status.currentError,
  (p) => (error.value = p),
  550
);
</script>

<template>
  <div
    class="footer d-flex flex-row justify-content-center text-muted align-items-end"
  >
    <div class="empty">-</div>

    <Transition name="info">
      <div v-if="info" class="bottom-text">
        <!--version 0.6
        <i class="bi bi-dot"></i>
        <a class="author-link text-muted" href="https://github.com/gush-labs"
          ><i class="bi bi-github"></i> gush-labs</a
        >-->
      </div>
    </Transition>
    <Transition name="process">
      <div
        v-if="process"
        class="process-view shadow d-flex flex-row ps-1 mb-3 pe-1 align-items-center"
      >
        <LoadingCircle class="loading-icon"></LoadingCircle>
        <div class="mx-2">{{ process.message }}...</div>
      </div>
    </Transition>
    <Transition name="info">
      <div class="error-view shadow ps-1 pe-3 mb-3" v-if="error">
        <i class="bi bi-exclamation-circle me-2"></i>
        {{ error.message }}
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.empty {
  opacity: 0;
}
.loading-icon {
  background-color: white !important;
  font-size: 120%;
}
.process-view {
  background-color: var(--button-active-color);
  color: var(--button-active-text-color);
  border-radius: 1rem;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
}
.error-view {
  background-color: var(--text-danger-color);
  color: var(--text-light-color);
  border-radius: 1rem;
}
.error {
  color: var(--text-error-color) !important;
}
.footer .author-link {
  text-decoration: none;
}
.footer {
  min-height: 4em;
}

.info-enter-active,
.info-leave-active {
  transition: all 500ms linear;
}
.info-enter-from,
.info-leave-to {
  opacity: 0;
}

.process-enter-active {
  transition: all 500ms cubic-bezier(0, 1.31, 0.525, 0.995);
}
.process-leave-active {
  transition: all 500ms cubic-bezier(0.79, 0.02, 0.885, 0.045);
}

.process-enter-from,
.process-leave-to {
  transform: translateY(2em) scale(20%);
  opacity: 0;
  color: rgba(0, 0, 0, 0);
}
@media screen and (max-width: 650px) {
  .bottom-text {
    display: none;
  }
}
</style>
