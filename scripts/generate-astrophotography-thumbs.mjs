/**
 * Generates thumbnails for astrophotography gallery images.
 * Run before build so the gallery loads thumbnails; full-size loads in lightbox.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GALLERY_DIR = path.join(__dirname, '..', 'public', 'astrophotography');
const THUMBS_DIR = path.join(GALLERY_DIR, 'thumbs');
const MANIFEST_FILE = 'manifest.json';
const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const THUMB_MAX_WIDTH = 400;
const THUMB_QUALITY = 80;

if (!fs.existsSync(GALLERY_DIR)) {
	console.log('No astrophotography directory found, skipping thumbnails.');
	process.exit(0);
}

fs.mkdirSync(THUMBS_DIR, { recursive: true });

const files = fs.readdirSync(GALLERY_DIR).filter((f) => {
	const ext = path.extname(f).toLowerCase();
	return IMAGE_EXTS.includes(ext) && f !== MANIFEST_FILE;
});

let done = 0;
for (const filename of files) {
	const inputPath = path.join(GALLERY_DIR, filename);
	const base = filename.replace(/\.[^.]+$/, '');
	const thumbFilename = `${base}.jpg`;
	const outputPath = path.join(THUMBS_DIR, thumbFilename);
	try {
		await sharp(inputPath)
			.resize(THUMB_MAX_WIDTH, null, { withoutEnlargement: true })
			.jpeg({ quality: THUMB_QUALITY })
			.toFile(outputPath);
		done++;
	} catch (err) {
		console.warn(`Skipping ${filename}:`, err.message);
	}
}

console.log(`Generated ${done} thumbnails in ${THUMBS_DIR}`);
