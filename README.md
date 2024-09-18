<div alt style="text-align: center; transform: scale(.5);">
	<picture>
		<source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/tldraw/tldraw/main/assets/github-hero-dark-draw.png" />
		<img alt="tldraw" src="https://raw.githubusercontent.com/tldraw/tldraw/main/assets/github-hero-light-draw.png" />
	</picture>
</div>

# tldraw

Welcome to BigBlueButton's fork of [tldraw](https://tldraw.com), a collaborative digital whiteboard.

## Installation & Usage

```tsx
import { Tldraw } from '@bigbluebutton/tldraw'
import '@bigbluebutton/tldraw/tldraw.css'

export default function () {
	return (
		<div style={{ position: 'fixed', inset: 0 }}>
			<Tldraw />
		</div>
	)
}
```

## Local development

To run the local development server, first clone this repo.

Install dependencies:

```bash
yarn
```

Start the local development server:

```bash
yarn dev
```

Open the example project at `localhost:5420`.

## About this repository

### Top-level layout

This repository's contents is divided across four primary sections:

- `/apps` contains the source for our applications
- `/packages` contains the source for our public packages
- `/scripts` contains scripts used for building and publishing
- `/assets` contains icons and translations relied on by the app
- `/docs` contains the content for the docs site at [tldraw.dev](https://tldraw.dev)

### Packages

- `assets`: a library for working with tldraw's fonts and translations
- `editor`: the tldraw editor
- `state`: a signals library, also known as signia
- `store`: an in-memory reactive database
- `tldraw`: the main tldraw package containing both the editor and the UI
- `tlschema`: shape definitions and migrations
- `utils`: low-level data utilities shared by other libraries
- `validate`: a validation library used for run-time validation

## License

Previous versions of Tldraw's SDK were released under the permissive Apache-2.0 license.

On December 20th, 2023, Tldraw announced a new license in which only non-commercial uses of Tldraw are permitted without purchasing a commercial license.

As a result, we decided to ship BigBlueButton with the last 2.x pre-release version that remains licensed under Apache-2.0, i.e., [v2.0.0-alpha.19](https://github.com/tldraw/tldraw/releases/tag/v2.0.0-alpha.19).

The blog post announcing the change can be found [here](https://tldraw.substack.com/p/license-updates-for-the-tldraw-sdk).
