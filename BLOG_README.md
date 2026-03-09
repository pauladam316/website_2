# Blog posts (folder per post)

Each post is a **folder** under `src/content/blog/` with:

- **`index.md`** — The post content (required). Frontmatter: `title`, `description`, `pubDate`, `category` (`observatory-build` or `astrophotography-projects`).
- **Images and videos** — Any other files in the same folder (e.g. `photo.png`, `demo.mp4`). Reference them in the markdown with relative paths:

  ```markdown
  ![Completed observatory](completed-observatory.png)
  [Watch the build](timelapse.mp4)
  ```

The folder name is the post URL slug (e.g. `observatory-build-1` → `/blog/observatory-build-1`).

**New post:** Create a new folder, add `index.md` with valid frontmatter, and any assets. The post will show up on the blog index automatically.
