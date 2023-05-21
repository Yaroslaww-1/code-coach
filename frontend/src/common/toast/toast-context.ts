export class Toast {
  static error?: string;

  static registerError(message: string) {
    Toast.error = message;
  }

  static close() {
    Toast.error = undefined;
  }
}

// export const ToastContext = createContext(toast);
