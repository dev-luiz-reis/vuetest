import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import App from './App.vue';
import store from './store';

const app = createApp(App);

app.use(store);
app.mount('#app');
