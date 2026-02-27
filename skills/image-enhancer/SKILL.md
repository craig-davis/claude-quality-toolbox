---
name: image-enhancer
description: Improves image quality using ImageMagick. Handles sharpening, noise reduction, format conversion, resizing, and compression artifact reduction for screenshots and photos.
---
# Image Enhancer

Enhances images using ImageMagick (`magick` CLI). Requires ImageMagick installed via Homebrew (`brew install imagemagick`).

## Prerequisites

Before running any operations, verify ImageMagick is available:

```bash
which magick || which convert
```

If neither is found, stop and return this error to the user:

```
ImageMagick is not installed or not in PATH.
Install it with: brew install imagemagick
Then re-run your request.
```

Do not proceed or attempt fallbacks.

## When to Use This Skill

- Sharpening blurry screenshots for documentation or blog posts
- Reducing JPEG compression artifacts
- Resizing images for specific dimensions or targets
- Converting between formats (PNG, JPG, WebP, etc.)
- Adjusting brightness, contrast, or levels
- Batch processing a folder of images

## What This Skill Does

ImageMagick provides real, reliable operations via the `magick` (v7) or `convert` (v6) CLI. This skill covers:

- **Sharpening**: Unsharp mask to improve edge clarity
- **Noise reduction**: Gaussian blur at low radius to reduce grain
- **Resizing**: Exact pixel dimensions or percentage scaling using Lanczos filter (note: upscaling a low-res image will not recover lost detail)
- **Format conversion**: PNG, JPG, WebP, TIFF, GIF
- **Quality adjustment**: JPEG compression level control
- **Artifact reduction**: Slight despeckle or median filter for compressed images
- **Batch processing**: Shell glob patterns over a directory

## Implementation

### Check ImageMagick version

```bash
magick --version 2>/dev/null || convert --version 2>/dev/null
```

Use `magick` for v7 (Homebrew default). Fall back to `convert` only if `magick` is not found.

### Sharpen a screenshot

```bash
magick input.png -unsharp 0x1+1.5+0.05 output.png
```

### Reduce JPEG compression artifacts

```bash
magick input.jpg -despeckle -quality 92 output.jpg
```

### Resize to specific dimensions (Lanczos)

```bash
magick input.png -filter Lanczos -resize 1920x1080 output.png
```

### Resize by percentage

```bash
magick input.png -filter Lanczos -resize 200% output.png
```

### Convert format

```bash
magick input.png output.webp
```

### Adjust brightness and contrast

```bash
magick input.png -brightness-contrast 5x10 output.png
```

### Batch sharpen all PNGs in a directory

```bash
for f in *.png; do
  magick "$f" -unsharp 0x1+1.5+0.05 "${f%.png}-enhanced.png"
done
```

## Behavior Rules

- Always preserve the original file. Write output to a new filename (e.g., `filename-enhanced.ext`) unless the user explicitly asks to overwrite.
- If a requested operation is not supported by ImageMagick's CLI, say so rather than approximating it with an unrelated operation.
- Do not claim super-resolution or AI-based enhancement — ImageMagick resizing interpolates pixels; it does not recover detail that was never there.
- For batch operations, confirm the target directory and glob pattern with the user before executing if there is any ambiguity.

## Limitations

- Upscaling a low-resolution image produces a larger image, not a sharper one — set that expectation with the user.
- HEIC input requires a libheif-enabled build of ImageMagick. If it fails, report the limitation.
- Very large images or batch jobs may be slow; warn the user for files over ~50MB or batches over ~100 files.
- SVG is a vector format and should not be run through raster enhancement operations.

## Example Interaction

**User**: "Sharpen screenshot-2024.png and save it without overwriting the original"

**Steps**:
1. Check `magick` is available
2. Run: `magick screenshot-2024.png -unsharp 0x1+1.5+0.05 screenshot-2024-enhanced.png`
3. Confirm output file exists and report back

**Output to user**:
```
Enhanced: screenshot-2024-enhanced.png
Original preserved: screenshot-2024.png
Operation: unsharp mask (0x1+1.5+0.05)
```
