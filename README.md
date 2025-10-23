Password: Remembering Martha

A small scroll-based digital storytelling site.

How to preview

1. Open a terminal in this folder.
2. Run a simple static server, for example using Python 3:

```bash
python3 -m http.server 8000
```

3. Open http://localhost:8000 in your browser.

Notes

- The site expects the following asset paths relative to the project root:
  - assets/images/scene1.png (used for scene1 and scene5)
  - assets/images/scene2.png
  - assets/images/scene3.png
  - assets/images/scene4.png
  - assets/images/scene5.png (final scene image)
  - assets/audio/scene1.mp3 (optional)
  - assets/audio/scene2.mp3 (optional)
  - assets/audio/scene3.mp3 (optional)
  - assets/audio/scene4.mp3 (optional)
  - assets/audio/scene5.mp3 (optional)
  - assets/audio/scene6.mp3 (optional)

- Browsers may block audio autoplay until a user gesture occurs. If audio doesn't start automatically, interact with the page (click/tap/press a key) to allow playback.

- Note: Scene 5 re-uses the `scene1` image as requested. Scene 6 is the final scene and uses `assets/images/scene5.png` (previously your scene5 image).

- Design notes: Minimalist, serif fonts, soft white text on dark overlay, subtle parallax and fade transitions.

Customization

- Tweak variables in `styles.css` for colors, type sizes, and transitions.
- Change audio volume in `script.js` (default 0.12).
