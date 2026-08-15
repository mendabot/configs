# @mendabot/eslint-config

Shared ESLint config used across Mendabot projects. Flat config, ESM only.

Bundles `@eslint/js`, `typescript-eslint` (type-checked), `@eslint/json`, `@stylistic`,
`perfectionist`, `unicorn`, and `eslint-plugin-prettier`.

## Install

```bash
pnpm add -D @mendabot/eslint-config eslint prettier
```

`eslint` and `prettier` are peer dependencies.

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
