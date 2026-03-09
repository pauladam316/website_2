# Astro Blog

A modern blog framework built with Astro.

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:4321`

### Build

Build the site for production:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   ├── Layout.astro
│   │   └── BlogLayout.astro
│   └── pages/
│       ├── index.astro
│       └── blog/
│           ├── index.astro
│           └── [slug].astro
└── package.json
```

## Features

- 🚀 Fast static site generation
- 📝 Blog post system with dynamic routing
- 🎨 Modern UI with Tailwind CSS
- 🌙 Dark mode support
- 📱 Responsive design

## Adding New Blog Posts

To add a new blog post, edit `src/pages/blog/[slug].astro` and add your post to the `posts` object, or set up a content collection for a more scalable approach.

