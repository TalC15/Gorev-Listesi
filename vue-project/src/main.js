import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import router from './routes'
import { createPinia } from 'pinia';
//import 'ant-design-vue/dist/reset.css';
library.add(fas);
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(Antd);
app.use(router);
app.use(createPinia())
app.mount('#app');


