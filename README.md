<p align="center"><br><img src="https://user-images.githubusercontent.com/236501/85893648-1c92e880-b7a8-11ea-926d-95355b8175c7.png" width="128" height="128" /></p>
<h3 align="center">Screenshot</h3>
<p align="center"><strong><code>capacitor-screenshot</code></strong></p>
<p align="center">
  Ionic Capacitor plugin for take screenshot
</p>

<p align="center">
  <img src="https://img.shields.io/maintenance/yes/2025?style=flat-square" />
  <a href="https://www.npmjs.com/package/capacitor-screenshot"><img src="https://img.shields.io/npm/l/capacitor-screenshot?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/capacitor-screenshot"><img src="https://img.shields.io/npm/dw/capacitor-screenshot?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/capacitor-screenshot"><img src="https://img.shields.io/npm/v/capacitor-screenshot?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<a href="#contributors-"><img src="https://img.shields.io/badge/all%20contributors-0-orange?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
</p>

## Maintainers

| Maintainer             | GitHub                                | Social                            | LinkedIn                                                           |
| ---------------------- | ------------------------------------- | --------------------------------- | ------------------------------------------------------------------ |
| Luan Freitas (ludufre) | [ludufre](https://github.com/ludufre) | [@ludufre](https://x.com/ludufre) | [Luan Freitas](https://www.linkedin.com/in/luan-freitas-14341687/) |

## Installation

```terminal
npm install capacitor-screenshot
ionic cap sync
```

```terminal
yarn install capacitor-screenshot
ionic cap sync
```

```terminal
pnpm add capacitor-screenshot
ionic cap sync
```

## Configuration

Not needed.

## Usage

```typescript
import { Screenshot } from 'capacitor-screenshot';

...

Screenshot.take().then((ret: { base64: string }) => {
    console.log(ret.base64); // or `data:image/png;base64,${ret.base64}`
});

// Or save to disk and get file path and web path
Screenshot.take({saveToDisk: true}).then((ret: { base64: string; path: string; webPath: string }) => {
    console.log(ret);
});
```
