import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import rehypeFigure from '@microflash/rehype-figure';
import { copyBlogAssets } from './src/integrations/copy-blog-assets.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://adampaul.space',
  integrations: [tailwind(), copyBlogAssets()],
  markdown: {
    rehypePlugins: [rehypeFigure],
  },
});

