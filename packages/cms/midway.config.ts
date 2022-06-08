import vue from '@vitejs/plugin-vue';
import jsx from "@vitejs/plugin-vue-jsx"
import { defineConfig } from '@midwayjs/hooks-kit';

export default defineConfig({
  vite: {
    plugins: [vue(),jsx()],
  },
});
