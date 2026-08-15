# @mendabot/eslint-config

[![npm](https://img.shields.io/npm/v/@mendabot/eslint-config?logo=npm&logoColor=white&label=npm)](https://www.npmjs.com/package/@mendabot/eslint-config)
[![downloads](https://img.shields.io/npm/dm/@mendabot/eslint-config)](https://www.npmjs.com/package/@mendabot/eslint-config)
[![CI](https://img.shields.io/github/actions/workflow/status/mendabot/configs/build.yml?branch=main&logo=github&label=CI)](https://github.com/mendabot/configs/actions/workflows/build.yml)
[![license](https://img.shields.io/npm/l/@mendabot/eslint-config)](https://github.com/mendabot/configs/blob/main/LICENSE)

Shared ESLint config used across Mendabot projects. Flat config, ESM only.

Bundles `@eslint/js`, `typescript-eslint` (type-checked), `@eslint/json`, `@stylistic`,
`perfectionist`, `unicorn`, and `eslint-plugin-prettier`.

## Install

`eslint` and `prettier` are peer dependencies, so install them alongside.

**pnpm**

```sh
pnpm add -D @mendabot/eslint-config eslint prettier
```

**npm**

```sh
npm install -D @mendabot/eslint-config eslint prettier
```

**yarn**

```sh
yarn add -D @mendabot/eslint-config eslint prettier
```

**bun**

```sh
bun add -d @mendabot/eslint-config eslint prettier
```

## Usage

`eslint.config.js`:

```js
import eslintConfigDefault from '@mendabot/eslint-config'

export default [...eslintConfigDefault]
```

Extend or override by appending your own config objects:

```js
import eslintConfigDefault from '@mendabot/eslint-config'

export default [...eslintConfigDefault, { rules: { 'no-console': 'error' } }]
```

Type-aware rules are enabled via `projectService`, so TypeScript files must be covered by a
`tsconfig.json`. JSON files are linted and key-sorted, except `package.json`, `tsconfig.json`,
`eas.json`, `turbo.json`, and lockfiles.

## License

[MIT](./LICENSE)
