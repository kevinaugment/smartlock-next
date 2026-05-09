import { defineCloudflareConfig } from '@opennextjs/cloudflare/config'

const config = defineCloudflareConfig()

config.buildCommand = 'npm run next:build'

export default config
