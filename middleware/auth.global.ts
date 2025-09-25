export default defineNuxtRouteMiddleware((to, from) => {
    const { isAuth } = useAuthStore();
  
    if (!isAuth && !['/'].includes(to.path)) {
       return navigateTo('/', { replace: true });
    } 
    
    if (isAuth && to.path === '/') {
        return navigateTo('/home', { replace: true });
    }
})
  