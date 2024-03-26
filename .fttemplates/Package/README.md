Add to ~/package.json
`"{COMMAND}" : "pnpm --filter @tip-tracker/<FTName> dev"`

Add Dependencies to app/core
`pnpm add -D @tip-tracker/<FTName>`

Extend in nuxt.config.ts
`'../../package/<FTName>'`