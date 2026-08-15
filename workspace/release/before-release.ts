import { execSync } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'

import { glob } from 'glob'

interface BeforeReleaseOptions {
	version: string
	workspaceRoot: string
}

export async function beforeRelease({ version, workspaceRoot }: BeforeReleaseOptions): Promise<void> {
	console.log(`Bumping version to ${version} in workspace: ${workspaceRoot}`)

	try {
		const packageJsonFiles = await glob('**/package.json', {
			absolute: true,
			cwd: workspaceRoot,
			ignore: ['**/node_modules/**'],
		})

		console.log(`Found ${packageJsonFiles.length} package.json files`)

		// Update package.json files
		for (const filePath of packageJsonFiles) {
			await updatePackageJson(filePath, version)
		}

		// Update the lockfile only when the workspace root is managed by pnpm.
		await runPnpmInstallAtRoot(workspaceRoot)

		console.log(`Successfully updated version to ${version} in all files`)
	} catch (error) {
		console.error('Error during version bump:', error)
		throw error
	}
}

async function updatePackageJson(filePath: string, newVersion: string): Promise<void> {
	try {
		const content = await fs.readFile(filePath, 'utf8')
		const packageData = JSON.parse(content)

		if (packageData.version) {
			packageData.version = newVersion
			const updatedContent = JSON.stringify(packageData, null, '\t')
			await fs.writeFile(filePath, updatedContent + '\n', 'utf8')
			console.log(`Updated ${path.relative(process.cwd(), filePath)}`)
		}
	} catch (error) {
		console.error(`Error updating ${filePath}:`, error)
		throw error
	}
}

async function runPnpmInstallAtRoot(workspaceRoot: string): Promise<void> {
	const lockfilePath = path.join(workspaceRoot, 'pnpm-lock.yaml')

	try {
		await fs.access(lockfilePath)
	} catch {
		console.log('Skipping pnpm install at monorepo root because no root pnpm-lock.yaml was found')
		return
	}

	try {
		console.log('Running pnpm install at monorepo root to update pnpm-lock.yaml')
		execSync('pnpm install --lockfile-only', {
			cwd: workspaceRoot,
			encoding: 'utf8',
			stdio: 'inherit',
		})
		console.log('Successfully updated pnpm-lock.yaml via pnpm install')
	} catch (error) {
		console.error('Error running pnpm install at root:', error)
		throw error
	}
}
