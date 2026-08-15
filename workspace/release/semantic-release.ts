import path from 'node:path'

import { globSync } from 'glob'
import type { GlobalConfig } from 'semantic-release'

interface SemanticReleaseOptions {
	additionalAssets?: string[]
	repositoryUrl: string
	workspaceRoot: string
}

export function createSemanticReleaseConfig({
	additionalAssets = [],
	repositoryUrl,
	workspaceRoot,
}: SemanticReleaseOptions): GlobalConfig {
	const workspacePackages = globSync(`${workspaceRoot}/**/package.json`, {
		ignore: ['**/node_modules/**'],
	}).map((package_) => path.relative(workspaceRoot, package_))

	const baseAssets = ['CHANGELOG.md', 'package.json', 'pnpm-lock.yaml', ...workspacePackages]

	return {
		branches: ['main'],
		plugins: [
			[
				'@semantic-release/exec',
				{
					prepareCmd: 'pnpm exec release-scripts before-release ${nextRelease.version}',
				},
			],
			[
				'@semantic-release/commit-analyzer',
				{
					preset: 'conventionalcommits',
					releaseRules: [{ release: 'patch', type: 'chore' }],
				},
			],
			[
				'@semantic-release/release-notes-generator',
				{
					preset: 'conventionalcommits',
					presetConfig: {
						types: [
							{ section: 'Features', type: 'feat' },
							{ section: 'Bug Fixes', type: 'fix' },
							{ hidden: false, section: 'Chores', type: 'chore' },
						],
					},
				},
			],
			[
				'@semantic-release/changelog',
				{
					changelogFile: 'CHANGELOG.md',
				},
			],
			[
				'@semantic-release/git',
				{
					assets: [...baseAssets, ...additionalAssets],
					message: 'chore(release): ${nextRelease.version}\n\n${nextRelease.notes}',
				},
			],
			'@semantic-release/github',
		],
		repositoryUrl,
		tagFormat: 'v${version}',
	}
}
