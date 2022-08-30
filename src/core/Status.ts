import { computed, reactive, type Ref } from "vue";

class StatusState {
  processes = new Map<string, string>();
  processQueue: string[] = [];

  error: string | undefined = undefined;

  pushProcess(key: string, message: string) {
    this.processes.set(key, message);
    this.processQueue.push(key);
  }

  updateProcess(key: string, message: string) {
    this.processes.set(key, message);
  }

  completeProcess(key: string) {
    this.processes.delete(key);
    const id = this.processQueue.findIndex((v) => v === key);
    if (id >= 0) { this.processQueue.splice(id, 1); }
  }
}

const status = reactive(new StatusState());

export class Status {

  static processStart(key: string, message: string) {
    status.pushProcess(key, message);
  }

  static processUpdate(key: string, message: string) {
    status.updateProcess(key, message);
  }

  static processComplete(key: string) {
    status.completeProcess(key);
  }

  static setError(message: string) {
    status.error = message;
  }

  static currentError = computed(() => status.error);

  static currentProcess = computed(() => {
    const queue = status.processQueue;
    const length = queue.length;
    return length > 0 ? status.processes.get(queue[length - 1]) : undefined;
  });

}

