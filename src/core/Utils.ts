import { watch, type Ref } from "vue";

export function watchRemove<T>(ref: Ref<T>, action: () => void) {
  watch(ref, (v) => { if (v == undefined) { action(); }});
}

export function watchUpdate<T>(ref: Ref<T | undefined>, action: (value: T) => void) {
  watch(ref, (v) => { if (v) { action(v!) }});
}
