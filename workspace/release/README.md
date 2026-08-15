# @mendabot/release-scripts

[![npm](https://img.shields.io/npm/v/@mendabot/release-scripts?logo=npm&logoColor=white&label=npm)](https://www.npmjs.com/package/@mendabot/release-scripts)
[![downloads](https://img.shields.io/npm/dm/@mendabot/release-scripts)](https://www.npmjs.com/package/@mendabot/release-scripts)
[![CI](https://img.shields.io/github/actions/workflow/status/mendabot/configs/build.yml?branch=main&logo=github&label=CI)](https://github.com/mendabot/configs/actions/workflows/build.yml)
[![license](https://img.shields.io/npm/l/@mendabot/release-scripts)](https://github.com/mendabot/configs/blob/main/LICENSE)

semantic-release configuration factory for Mendabot pnpm workspaces.

Produces a semantic-release config that bumps the version in every workspace `package.json`,
refreshes `pnpm-lock.yaml`, writes `CHANGELOG.md`, tags as `v<version>`, and creates a GitHub
Release. Commits are analysed with the conventionalcommits preset; `chore` commits produce a patch
release.

## Install

**pnpm**

```sh
pnpm add -D @mendabot/release-scripts semantic-release
```

**npm**

```sh
npm install -D @mendabot/release-scripts semantic-release
```

**yarn**

```sh
yarn add -D @mendabot/release-scripts semantic-release
```

**bun**

```sh
bun add -d @mendabot/release-scripts semantic-release
```

## Usage

`release.config.js` at the workspace root:

```js
import path from 'node:path'

import { createSemanticReleaseConfig } from '@mendabot/release-scripts'

export default createSemanticReleaseConfig({
	repositoryUrl: 'https://github.com/mendabot/<repo>',
	workspaceRoot: path.join(import.meta.dirname),
})
```

### Options

| Option | Required | Description |
| --- | --- | --- |
| `repositoryUrl` | yes | Repository the release is published to |
| `workspaceRoot` | yes | Absolute path to the workspace root, used to discover packages |
| `additionalAssets` | no | Extra files to include in the release commit |

Every `package.json` under `workspaceRoot` (excluding `node_modules`) is version-bumped and added to
the release commit automatically. Releases run from `main`.

### CLI

The version bump runs through a bundled CLI, invoked by the generated config — you do not normally
call it yourself:

```bash
release-scripts before-release <version>
```

## License

[MIT](./LICENSE)
