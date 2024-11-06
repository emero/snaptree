import { toast as toastify, Slide, ToastOptions } from "react-toastify";

const toastConfig = {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: false,
  progress: 0,
  theme: "dark",
  transition: Slide,
  closeButton: () => <></>,
} as ToastOptions;

class ToastService {
  readonly config: ToastOptions;

  constructor(config: ToastOptions) {
    this.config = config;
  }

  notify = (text: string) => {
    toastify(text, this.config);
  };

  error = (text: string) => {
    toastify.error(text, this.config);
  };

  success = (text: string) => {
    toastify.success(text, this.config);
  };
}

export const toast = new ToastService(toastConfig);
