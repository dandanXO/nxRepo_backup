import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
    schemaFile: 'http://3.111.118.247:8080/v2/api-docs',
    apiFile: './src/store/emptyApi.ts',
    apiImport: 'emptySplitApi',
    outputFile: './src/store/petApi.ts',
    exportName: 'petApi',
    hooks: true,
}

export default config
