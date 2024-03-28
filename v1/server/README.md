Add to ~/package.json
`"{COMMAND}" : "pnpm --filter @tip-tracker/server dev"`

Add Dependencies to app/core
`pnpm add -D @tip-tracker/server`

Extend in nuxt.config.ts
`'../../package/server'`