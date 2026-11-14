import { defineConfig } from 'astro/config';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  output: 'static',
  vite: {
    css: { postcss: { plugins: [tailwindcss()] } },
  },
});
