Add to ~/package.json
`"{COMMAND}" : "pnpm --filter @tip-tracker/{PACKAGE} dev"`

Add Dependencies to app/core
`pnpm add -D @tip-tracker/{PACKAGE}`

Extend in nuxt.config.ts
`'../../package/{PACKAGE}'`