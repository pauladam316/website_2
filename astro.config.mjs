import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import rehypeFigure from '@microflash/rehype-figure';
import { copyBlogAssets } from './src/integrations/copy-blog-assets.ts';

// https://astro.build/config
// If the site is served from a subpath (e.g. GitHub Pages project: username.github.io/website_2/),
// set base to that path (e.g. base: '/website_2/') so asset and nav links resolve correctly.
export default defineConfig({
  site: 'https://adampaul.space',
  // base: '/website_2/',  // uncomment and set for subpath deployment
  integrations: [tailwind(), copyBlogAssets()],
  markdown: {
    rehypePlugins: [rehypeFigure],
  },
});

