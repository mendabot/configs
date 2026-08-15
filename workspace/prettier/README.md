# @mendabot/prettier-config

Shared Prettier config used across Mendabot projects.

Tabs, single quotes, no semicolons, trailing commas, 120-column print width.

## Install

```bash
pnpm add -D @mendabot/prettier-config prettier
```

`prettier` is a peer dependency.

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
