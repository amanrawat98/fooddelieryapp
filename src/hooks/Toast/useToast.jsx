import { useToast } from "./ToastContext";



const useCustomToast = () => {
  const { showToast } = useToast();

  const success = (message) => showToast(message, 'success');
  const error = (message) => showToast(message, 'error');
  const warning = (message) => showToast(message, 'warning');

  return { success, error, warning };
};

export default useCustomToast;
