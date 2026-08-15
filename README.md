# @mendabot/configs

[![CI](https://img.shields.io/github/actions/workflow/status/mendabot/configs/build.yml?branch=main&logo=github&label=CI)](https://github.com/mendabot/configs/actions/workflows/build.yml)
[![license](https://img.shields.io/github/license/mendabot/configs)](./LICENSE)

Shared ESLint, Prettier and release configuration for Mendabot projects.

pnpm workspace. Packages live in `workspace/*`

| Package | Source | Version |
| --- | --- | --- |
| [`@mendabot/eslint-config`](https://www.npmjs.com/package/@mendabot/eslint-config) | `workspace/eslint/` | [![npm](https://img.shields.io/npm/v/@mendabot/eslint-config?label=)](https://www.npmjs.com/package/@mendabot/eslint-config) |
| [`@mendabot/prettier-config`](https://www.npmjs.com/package/@mendabot/prettier-config) | `workspace/prettier/` | [![npm](https://img.shields.io/npm/v/@mendabot/prettier-config?label=)](https://www.npmjs.com/package/@mendabot/prettier-config) |
| [`@mendabot/release-scripts`](https://www.npmjs.com/package/@mendabot/release-scripts) | `workspace/release/` | [![npm](https://img.shields.io/npm/v/@mendabot/release-scripts?label=)](https://www.npmjs.com/package/@mendabot/release-scripts) |

Packages are published publicly to [npmjs.org](https://www.npmjs.com) on release, with provenance.
Everything here is MIT licensed — see [LICENSE](./LICENSE).

## Publishing

`release.yml` (manual dispatch) runs semantic-release, which bumps every workspace `package.json`,
writes the changelog, tags, and creates a GitHub Release. That release event triggers `publish.yml`,
which packs each package with pnpm and uploads it with npm.

Publishing authenticates via **trusted publishing**

## Commands

Use pnpm — never npm or yarn.

```bash
pnpm install        # install all workspace deps
pnpm run build      # build every package
pnpm run lint       # prettier + eslint, root and packages
pnpm run lint:fix   # same, autofixing
pnpm run release    # semantic-release (CI only)
```

## Consuming

ESLint — `eslint.config.js`:

```js
import eslintConfigDefault from '@mendabot/eslint-config'

export default [...eslintConfigDefault]
```

Prettier — `prettier.config.js`:

```js
export { default } from '@mendabot/prettier-config'
```

Release — `release.config.js`:

```js
import path from 'node:path'

import { createSemanticReleaseConfig } from '@mendabot/release-scripts'

export default createSemanticReleaseConfig({
	repositoryUrl: 'https://github.com/mendabot/<repo>',
	workspaceRoot: path.join(import.meta.dirname),
})
```

`createSemanticReleaseConfig` bumps the version in every workspace `package.json`, refreshes
`pnpm-lock.yaml`, writes `CHANGELOG.md`, and tags as `v<version>`. It expects the consuming repo to
be a pnpm workspace releasing from `main`.
