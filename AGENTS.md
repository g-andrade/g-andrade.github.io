# g-andrade.github.io — Agent Guide

## What this is

Personal website / web CV for Guilherme Andrade. A **plain static site** —
hand-written HTML/CSS/JS, no framework and no build step. The Jekyll entries in
`.gitignore` are stale leftovers; nothing here is built. GitHub Pages serves the
repo root verbatim, so what you see locally is what ships.

- Repo: `g-andrade/g-andrade.github.io`
- Live at: **www.gandrade.net** (custom domain, see `CNAME`)
- Deploy: push to `main` — GitHub Pages publishes it. No CI, no preview step.

## Layout

| Path | What it is |
|------|------------|
| `index.html` | The entire profile page — markup, CSS, and the WebGL background script, all in one file. |
| `test.frag` | The animated background shader, **fetched at runtime** by `index.html` so the `.frag` file stays the single source of truth. |
| `CNAME` | Custom domain. Leave it unless the domain changes. |
| `circles/`, `coalescence/`, `curvature_blindness/`, `shepard/`, `teardrop/`, `webgl-plot/` | **Git submodules** — standalone projects (see `.gitmodules`). |
| `moog/`, `talks/` | In-repo standalone toys / content, served at their own URLs (e.g. `/moog/`). Not linked from `index.html`. |

**Submodules are separate repos.** Don't edit their contents from here — make
changes in the upstream repo. Run `git submodule update --init --recursive` to
populate them (they're empty on a fresh clone).

## Page content mirrors the GitHub profile README

The bio, open-source list, upstream contributions and technologies in
`index.html` mirror the GitHub **profile README** at
[github.com/g-andrade/g-andrade](https://github.com/g-andrade/g-andrade)
(local clone: `../other/g-andrade/README.md`). Treat that README as the source
of truth for wording, the project list and star counts. When updating the page
copy, keep the two in sync.

## Conventions

- **Indentation: tabs** — in `index.html` and in shaders. Shaders also carry a
  vim/emacs **modeline on line 1**; respect it and don't reformat.
- **Palette** lives in CSS `:root` custom properties — `--ink`, `--muted`,
  `--bloodred`, `--orange`, `--bg`. Reuse them rather than hard-coding colours.
- The shader background must **degrade gracefully**. Preserve all of this when
  editing `index.html`:
  - CSS gradient fallback shows when WebGL is unavailable or the context is lost
    (the script calls `fail()`, which hides `#bg`).
  - `prefers-reduced-motion` skips the animation entirely.
  - `#bg` and the `#tint` vignette are `aria-hidden` and decorative.
- **Shader uniforms follow the glslsandbox convention**: `time` (seconds),
  `resolution` (pixels), `mouse` (normalised `[0,1]`, Y=0 at bottom).

## GLSL ES pitfall

`pow(x, y)` with `x < 0` is **undefined** in GLSL ES and shows up as bright
garbage pixels on desktop GPUs. Guard any `pow` whose base can go negative.
(`test.frag` only does `pow(dist, 30.0)` where `dist >= 0`, so it's safe.)

## Serving / testing

`index.html` `fetch()`es `test.frag`, and `fetch()` is blocked under `file://`.
Serve over HTTP:

```sh
python3 -m http.server   # then open http://localhost:8000/
```

GitHub Pages serves the files unchanged, so local HTTP matches production.
