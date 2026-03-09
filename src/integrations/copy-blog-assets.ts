import type { AstroIntegration } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const CONTENT_BLOG = path.join(ROOT, 'src', 'content', 'blog');

/** Match /blog/<slug>/<filename> (e.g. /blog/observatory-build-4/roof-lower-sunset.gif) */
const BLOG_ASSET_RE = /^\/blog\/([^/]+)\/([^/]+)$/;

/**
 * Copies non-markdown assets from each src/content/blog/<slug>/ folder
 * into dist/blog/<slug>/ so that relative image/video refs in markdown work.
 * In dev, serves those assets via middleware so GIFs and other assets render.
 */
export function copyBlogAssets(): AstroIntegration {
	return {
		name: 'copy-blog-assets',
		hooks: {
			'astro:server:setup': ({ server }) => {
				server.middlewares.use((req, res, next) => {
					const match = req.url?.split('?')[0].match(BLOG_ASSET_RE);
					if (!match) {
						next();
						return;
					}
					const [, slug, filename] = match;
					if (filename.toLowerCase() === 'index.md') {
						next();
						return;
					}
					const filePath = path.join(CONTENT_BLOG, slug, filename);
					if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
						next();
						return;
					}
					const ext = path.extname(filename).toLowerCase();
					const mime: Record<string, string> = {
						'.gif': 'image/gif',
						'.png': 'image/png',
						'.jpg': 'image/jpeg',
						'.jpeg': 'image/jpeg',
						'.webp': 'image/webp',
						'.mp4': 'video/mp4',
						'.mov': 'video/quicktime',
						'.webm': 'video/webm',
					};
					res.setHeader('Content-Type', mime[ext] ?? 'application/octet-stream');
					const stream = fs.createReadStream(filePath);
					stream.on('error', () => {
						res.statusCode = 500;
						res.end();
					});
					stream.pipe(res);
				});
			},
			'astro:build:done': async ({ dir }) => {
				const outDir = fileURLToPath(dir);
				const blogOut = path.join(outDir, 'blog');

				if (!fs.existsSync(CONTENT_BLOG)) return;

				const entries = fs.readdirSync(CONTENT_BLOG, { withFileTypes: true });
				for (const ent of entries) {
					if (!ent.isDirectory()) continue;
					const slug = ent.name;
					const slugDir = path.join(CONTENT_BLOG, slug);
					const destDir = path.join(blogOut, slug);
					if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

					const files = fs.readdirSync(slugDir, { withFileTypes: true });
					for (const f of files) {
						if (f.isFile() && f.name.toLowerCase() !== 'index.md') {
							const src = path.join(slugDir, f.name);
							const dest = path.join(destDir, f.name);
							fs.copyFileSync(src, dest);
						}
					}
				}
			},
		},
	};
}
