import { defineConfig } from 'astro/config';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  output: 'static',
  site: 'https://yttyu.github.io',
  base: process.env.GITHUB_ACTIONS === 'true' ? '/JaggerAstro' : '/',
  vite: {
    css: { postcss: { plugins: [tailwindcss()] } },
  },
});
