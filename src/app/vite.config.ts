import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [
    angular({
      inlineStylesExtension: 'scss', // Adjust based on your project (css/scss)
    }),
  ],
});
