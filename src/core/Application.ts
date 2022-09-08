/**
 * Module contains all high-level information about
 * current state of the application like list of different
 * outgoing processes or global app configuration.
 */
import { computed, reactive } from "vue";
import { Storage } from "./Storage";

export type Process = {
  key: string;
  message: string;
};

export type Error = {
  key: string;
  message: string;
};

class StatusState {
  processes: Process[] = [];
  errors: Error[] = [];

  pushProcess(key: string, message: string) {
    const duplicate = this.processes.find((p) => p.key == key);
    if (!duplicate) {
      this.processes.push({ key, message });
    }
  }

  updateProcess(key: string, message: string) {
    this.processes
      .filter((p) => p.key == key)
      .forEach((p) => (p.message = message));
  }

  setProcess<T>(key: string, message: string, process: Promise<T>) {
    this.pushProcess(key, message);
    process
      .then(() => this.completeProcess(key))
      .catch(() => this.completeProcess(key));
  }

  completeProcess(key: string) {
    const processId = this.processes.findIndex((p) => p.key == key);
    this.processes.splice(processId, 1);
  }

  pushError(key: string, message: string) {
    const duplicate = this.errors.find((p) => p.key == key);
    if (!duplicate) {
      this.errors.push({ key, message });
    }
  }

  clearError(key: string) {
    const processId = this.errors.findIndex((p) => p.key == key);
    this.errors.splice(processId, 1);
  }
}

class Status {
  private state = reactive(new StatusState());

  processStart = (key: string, message: string) =>
    this.state.pushProcess(key, message);

  processUpdate = (key: string, message: string) =>
    this.state.updateProcess(key, message);

  processSubmit<T>(key: string, message: string, process: Promise<T>) {
    this.state.setProcess(key, message, process);
  }

  processComplete = (key: string) => this.state.completeProcess(key);

  errorSet = (key: string, message: string) =>
    this.state.pushError(key, message);

  errorClear = (key: string) => this.state.clearError(key);

  currentError = computed(() =>
    this.state.errors.length > 0 ? this.state.errors[0] : undefined
  );

  currentProcess = computed(() =>
    this.state.processes.length > 0 ? this.state.processes[0] : undefined
  );
}

class Configuration {
  japaneseFont = "";
  enableKanaInput = true;
}

export class Application {
  static status = new Status();

  static get configuration(): Configuration {
    return Storage.getObject<Configuration>(
      "configuration",
      new Configuration()
    );
  }
}