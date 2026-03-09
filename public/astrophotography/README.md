# Astrophotography images

Drop your ultra-high resolution images here (`.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`). They will appear automatically on the [Astrophotography](/astrophotography) page.

## manifest.json

Metadata (title, object, description, date, blogPost) comes from `manifest.json` in this folder. Keys are image filenames; add or edit entries to match your files. The manifest is pre-filled with common deep-sky objects—use those filenames for your images or copy an entry and change the key.

| Field         | Description                                              |
|---------------|----------------------------------------------------------|
| `title`       | Override the auto-generated title                        |
| `object`      | Catalog designation (e.g. M42, NGC 1976)                 |
| `description` | Override the auto-generated description                  |
| `date`        | Date taken or processed                                  |
| `blogPost`    | Path to a blog post about this image (e.g. `/blog/m42`)  |

Example:

```json
{
  "orion-nebula.jpg": {
    "title": "Orion Nebula (M42)",
    "object": "M42",
    "description": "Stack of 30×120s with 200mm. Processed in Siril.",
    "date": "2024-03-15",
    "blogPost": "/blog/m42"
  }
}
```
