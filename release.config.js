import path from 'node:path'

import { createSemanticReleaseConfig } from '@mendabot/release-scripts'

const workspaceRoot = path.join(import.meta.dirname)

export default createSemanticReleaseConfig({
	repositoryUrl: 'https://github.com/mendabot/configs',
	workspaceRoot,
})
