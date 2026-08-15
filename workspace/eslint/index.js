import js from '@eslint/js'
import json from '@eslint/json'
import stylistic from '@stylistic/eslint-plugin'
import perfectionist from 'eslint-plugin-perfectionist'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import unicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
	eslintPluginPrettierRecommended,

	{
		files: ['**/*.{ts,tsx,mts,cts,js,jsx,mjs,cjs}'],
		...js.configs.recommended,
	},

	...tseslint.configs.recommendedTypeChecked.map((config) => ({
		...config,
		files: ['**/*.{ts,tsx,mts,cts,js,jsx,mjs,cjs}'],
	})),

	{
		files: ['**/*.{ts,tsx,mts,cts,js,jsx,mjs,cjs}'],
		languageOptions: {
			globals: {
				...globals.browser,
			},
			parser: tseslint.parser,
			parserOptions: {
				ecmaVersion: 2020,
				jsx: true,
				projectService: true,
			},
		},
		plugins: {
			'@stylistic': stylistic,
			'@typescript-eslint': tseslint.plugin,
			perfectionist,
			unicorn,
		},
		rules: {
			'@stylistic/lines-between-class-members': ['error', 'always'],
			'@stylistic/member-delimiter-style': [
				'error',
				{
					multiline: { delimiter: 'none', requireLast: true },
					singleline: { delimiter: 'semi', requireLast: false },
				},
			],

			'@stylistic/space-before-blocks': 'error',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/interface-name-prefix': 'off',
			'@typescript-eslint/member-ordering': [
				'error',
				{
					default: {
						memberTypes: [
							// Index signature
							'signature',

							// Fields
							'public-static-field',
							'protected-static-field',
							'private-static-field',

							'public-decorated-field',
							'protected-decorated-field',
							'private-decorated-field',

							'public-instance-field',
							'protected-instance-field',
							'private-instance-field',

							'public-abstract-field',
							'protected-abstract-field',

							'public-field',
							'protected-field',
							'private-field',

							'static-field',
							'instance-field',
							'abstract-field',

							'decorated-field',

							'field',

							// Constructors
							'public-constructor',
							'protected-constructor',
							'private-constructor',

							'constructor',

							// Methods
							'public-decorated-method',
							'public-static-method',
							'public-instance-method',
							'protected-decorated-method',
							'protected-static-method',
							'protected-instance-method',
							'private-decorated-method',
							'private-static-method',
							'private-instance-method',

							'public-abstract-method',
							'protected-abstract-method',

							'public-method',
							'protected-method',
							'private-method',

							'static-method',
							'instance-method',
							'abstract-method',

							'decorated-method',

							'method',
						],
						order: 'alphabetically',
					},
				},
			],
			'@typescript-eslint/naming-convention': ['error', { format: ['UPPER_CASE'], selector: ['enumMember'] }],
			'@typescript-eslint/no-base-to-string': 'off',
			'@typescript-eslint/no-empty-interface': 'off',
			'@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
			'@typescript-eslint/no-require-imports': 'off',
			'@typescript-eslint/no-shadow': ['error', { allow: ['resolve', 'reject'], builtinGlobals: false, hoist: 'all' }],
			'@typescript-eslint/no-this-alias': ['error'],
			'@typescript-eslint/no-unsafe-argument': 'error',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-unsafe-enum-comparison': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
			'@typescript-eslint/restrict-plus-operands': 'warn',
			'@typescript-eslint/restrict-template-expressions': 'off',
			'@typescript-eslint/unbound-method': 'off',

			'arrow-body-style': ['error', 'as-needed'],
			'curly': 'error',
			'no-console': 'off',
			'no-duplicate-imports': 'error',
			'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],

			'padding-line-between-statements': ['error', { blankLine: 'always', next: '*', prev: 'if' }],
			'perfectionist/sort-exports': ['error', { order: 'asc', type: 'natural' }],
			'perfectionist/sort-imports': [
				'error',
				{
					groups: [
						'builtin',
						['external', 'type-external'],
						'type-internal',
						'internal',
						['type-parent', 'type-sibling', 'type-index'],
						['parent', 'sibling', 'index'],
						'side-effect',
						'style',
						'unknown',
					],
					internalPattern: ['^~/.*', '^@/.*'],
					newlinesBetween: 1,
					order: 'asc',
					type: 'alphabetical',
				},
			],
			'perfectionist/sort-named-exports': ['error', { order: 'asc', type: 'alphabetical' }],
			'perfectionist/sort-named-imports': ['error', { order: 'asc', type: 'alphabetical' }],
			'perfectionist/sort-objects': [
				'error',
				{
					order: 'asc',
					type: 'alphabetical',
				},
			],
			'prettier/prettier': 'error',
			'space-before-blocks': 'off',

			...unicorn.configs.recommended.rules,
			'unicorn/custom-error-definition': 'off',
			'unicorn/expiring-todo-comments': 'off',
			'unicorn/name-replacements': [
				'error',
				{
					allowList: {
						db: true,
						elTranslation: true,
						i18InitPromise: true,
						ProcessEnv: true,
					},
					ignore: [/^(env|utils)/, /(?:^|-)utils(?:-|$)/],
					replacements: {
						args: false,
						idx: false,
						len: false,
						param: false,
						params: false,
						prev: false,
						prop: false,
						props: false,
						ref: false,
						refs: false,
					},
				},
			],
			'unicorn/no-abusive-eslint-disable': 'off',
			'unicorn/no-array-callback-reference': 'off',
			'unicorn/no-array-for-each': 'off',
			'unicorn/no-array-reduce': 'off',
			'unicorn/no-await-expression-member': 'off',
			'unicorn/no-document-cookie': 'off',
			'unicorn/no-keyword-prefix': 'off',
			'unicorn/no-lonely-if': 'off',
			'unicorn/no-nested-ternary': 'off',
			'unicorn/no-null': 'off',
			'unicorn/no-static-only-class': 'off',
			'unicorn/no-this-assignment': 'off',
			'unicorn/no-unnecessary-polyfills': 'off',
			'unicorn/prefer-dom-node-remove': 'off',
			'unicorn/prefer-dom-node-text-content': 'off',
			'unicorn/prefer-global-this': 'off',
			'unicorn/prefer-module': 'off',
			'unicorn/prefer-spread': 'off',
			'unicorn/prefer-structured-clone': 'off',
			'unicorn/prevent-abbreviations': 'off',
		},
	},

	{
		files: ['**/*.{js,mjs,cjs}'],
		...tseslint.configs.disableTypeChecked,
	},

	{
		files: ['**/*.json'],
		ignores: ['**/package.json', '**/eas.json', '**/tsconfig.json', '**/package-lock.json', '**/turbo.json'],
		language: 'json/json',
		plugins: {
			json,
		},
		rules: {
			...json.configs.recommended.rules,
			'json/sort-keys': [
				'error',
				'asc',
				{
					allowLineSeparatedGroups: false,
					caseSensitive: true,
					minKeys: 2,
					natural: false,
				},
			],
		},
	},

	{
		ignores: [
			'**/dist/',
			'**/node_modules/',
			'**/.next',
			'**/.venv',
			'**/.vercel',
			'**/.turbo',
			'.git/',
			'.idea',
			'.vscode/',
			'ios',
			'android/',
			'expo-env.d.ts',
			'**/build/',
		],
	},
]
