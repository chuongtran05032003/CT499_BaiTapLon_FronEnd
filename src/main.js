
import "@fortawesome/fontawesome-free/css/all.min.css";
import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import 'vue-select/dist/vue-select.css';
import vSelect from 'vue-select'; // Import Vue Select
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import store from './store';
import './assets/tailwind.css'
createApp(App).use(router).use(store).use(Toast, {
    position: POSITION.TOP_RIGHT,
    timeout: 1500,
    closeOnClick: true,
    pauseOnHover: true,
  }).component('v-select', vSelect).mount("#app");
