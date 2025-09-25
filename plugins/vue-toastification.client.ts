import Toast, { POSITION, useToast } from "vue-toastification";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    position: POSITION.TOP_RIGHT,
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
  });

  // Provide toast instance to the Nuxt app
  return {
    provide: {
      toast: useToast()
    }
  };
});
