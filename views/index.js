import axios from 'axios';
import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from './routes';

globalThis.__VUE_OPTIONS_API__ = true;
globalThis.__VUE_PROD_DEVTOOLS__ = true;

const app = createApp({})

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

axios.interceptors.request.use((config) =>  {
    const token = localStorage.getItem('token')
    if(token !== null) {
        config.headers = {'Authorization': `Bearer ${token}`}
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

axios.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    if(error.response.status===403 || error.response.status===401) {
        localStorage.removeItem('token')
        localStorage.removeItem('full_name')
        router.push({path: '/login'})
    }
    return Promise.reject(error);
  });

app.use(router)

app.mount('#app')
