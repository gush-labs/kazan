import { computed, reactive } from "vue";

type Process = {
  key: string;
  message: string;
};

type Error = {
  key: string;
  message: string;
};

class ApplicationStatusState {
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

const status = reactive(new ApplicationStatusState());

/**
 * Represents a global status of web-application.
 * In particular any background processes in action or
 * global errors which impact web-app functionality.
 */
class AppStatus {
  static processStart = (key: string, message: string) =>
    status.pushProcess(key, message);
  static processUpdate = (key: string, message: string) =>
    status.updateProcess(key, message);
  static processComplete = (key: string) => status.completeProcess(key);
  static errorSet = (key: string, message: string) =>
    status.pushError(key, message);
  static errorClear = (key: string) => status.clearError(key);

  static currentError = computed(() =>
    status.errors.length > 0 ? status.errors[0] : undefined
  );
  static currentProcess = computed(() =>
    status.processes.length > 0 ? status.processes[0] : undefined
  );
}

export default AppStatus;
