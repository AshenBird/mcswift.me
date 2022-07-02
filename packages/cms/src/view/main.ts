import { createApp } from 'vue';
import { router } from "./router"
import App from './App.vue';
import { editor } from "./plugins/editor"
createApp(App).use(router).use(editor).mount('#app');
