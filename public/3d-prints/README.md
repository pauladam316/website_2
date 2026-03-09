# 3D Prints / Projects assets

Create **one folder per project** inside `3d-prints/`. Each folder is one card on the **Projects** page.

## Folder convention

| File        | Purpose |
|------------|---------|
| `model.obj` | 3D model (shown in the modal viewer). Required for 3D view. |
| `card.png`  | Image shown on the card in the gallery. If missing, a placeholder is used. |
| Any other `.png` / `.jpg` / `.jpeg` / `.gif` / `.webp` | Album photos in the modal (after the 3D slide). |
| `.mp4` / `.webm` / `.mov` / `.ogv` | Videos in the modal slideshow. |
| `info.json` | Optional: `name`, `description`, `cameraZoom`, **`featured`**, **`order`**. See below. |

## info.json options

| Field | Purpose |
|-------|---------|
| `name` | Display name for the project. |
| `description` | Shown in the modal (use `\n\n` for multiple paragraphs). |
| `cameraZoom` | 3D viewer zoom; `> 1` = zoom out, `< 1` = zoom in. |
| **`featured`** | `true` = show in **Featured projects**; otherwise in **Other projects**. |
| **`order`** | Sort order within that section. Lower number = earlier. Ties are broken by name. |
| **`blogPost`** | Optional. Blog post slug or path (e.g. `"observatory-build-8"` or `"/blog/observatory-build-8"`). Shows a “Read post →” link on the card and in the modal. |

## Example

```
public/3d-prints/
  all-sky-camera/
    model.obj      ← 3D model
    card.png       ← card image
    photo1.jpg     ← album
    demo.mp4       ← video in slideshow
    info.json      ← optional: { "name": "All-Sky Camera", "description": "...", "featured": true, "order": 1 }
```

Example `info.json` for a featured project that appears first: `{ "name": "All-Sky Camera", "description": "...", "featured": true, "order": 1 }`. Omit `featured` or set to `false` for **Other projects**. Use `order` in both sections to control order (e.g. `order: 0`, `order: 1`, …).
