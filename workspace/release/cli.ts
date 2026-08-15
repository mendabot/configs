#!/usr/bin/env node

import { createRequire } from 'node:module'

import { Command } from 'commander'

import { beforeRelease } from './before-release.js'

// Read from package.json so `--version` tracks the version semantic-release bumps.
const { version: packageVersion } = createRequire(import.meta.url)('../package.json') as { version: string }

const program = new Command()

program.name('@mendabot/release-scripts').description('Release scripts for Mendabot packages').version(packageVersion)

program
	.command('before-release <version>')
	.description('Run before release tasks')
	.action(async (version) => {
		try {
			await beforeRelease({ version, workspaceRoot: process.cwd() })
		} catch (error) {
			console.error('Error in before-release:', error)
			process.exit(1)
		}
	})

program.parse()
