import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'ui_kits/ops_dashboard',
  publicDir: '../../public',
  server: {
    port: 3000,
    open: true,
  },
  css: {
    // resolve ../../styles.css imports from component files
  },
});
