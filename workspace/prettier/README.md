# @mendabot/prettier-config

[![npm](https://img.shields.io/npm/v/@mendabot/prettier-config?logo=npm&logoColor=white&label=npm)](https://www.npmjs.com/package/@mendabot/prettier-config)
[![downloads](https://img.shields.io/npm/dm/@mendabot/prettier-config)](https://www.npmjs.com/package/@mendabot/prettier-config)
[![CI](https://img.shields.io/github/actions/workflow/status/mendabot/configs/build.yml?branch=main&logo=github&label=CI)](https://github.com/mendabot/configs/actions/workflows/build.yml)
[![license](https://img.shields.io/npm/l/@mendabot/prettier-config)](https://github.com/mendabot/configs/blob/main/LICENSE)

Shared Prettier config used across Mendabot projects.

Tabs, single quotes, no semicolons, trailing commas, 120-column print width.

## Install

`prettier` is a peer dependency, so install it alongside.

**pnpm**

```sh
pnpm add -D @mendabot/prettier-config prettier
```

**npm**

```sh
npm install -D @mendabot/prettier-config prettier
```

**yarn**

```sh
yarn add -D @mendabot/prettier-config prettier
```

**bun**

```sh
bun add -d @mendabot/prettier-config prettier
```

## Usage

`prettier.config.js`:

```js
export { default } from '@mendabot/prettier-config'
```

To override individual options, import and spread it:

```js
import config from '@mendabot/prettier-config'

export default { ...config, printWidth: 100 }
```

## License

[MIT](./LICENSE)
