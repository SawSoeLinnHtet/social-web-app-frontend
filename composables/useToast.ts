export const useToast = () => {
  const { $toast } = useNuxtApp();

  return {
    success: (msg: string) => $toast.success(msg),
    error: (msg: string) => $toast.error(msg),
    info: (msg: string) => $toast.info(msg),
    warning: (msg: string) => $toast.warning(msg),
    default: (msg: string) => $toast(msg),
  };
};
