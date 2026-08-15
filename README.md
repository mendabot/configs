# @mendabot/configs

Shared ESLint, Prettier and release configuration for Mendabot projects.

pnpm workspace. Packages live in `workspace/*`

```
workspace/eslint/    @mendabot/eslint-config
workspace/prettier/  @mendabot/prettier-config
workspace/release/   @mendabot/release-scripts
```

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
