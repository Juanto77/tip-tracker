Add to ~/package.json
`"{COMMAND}" : "pnpm --filter @tip-tracker/Dashboard dev"`

Add Dependencies to app/core
`pnpm add -D @tip-tracker/Dashboard`

Extend in nuxt.config.ts
`'../../package/Dashboard'`

# Todo

- Create User pref store
- create layout for dashboard
    - include props


# Dayjs
- [Advanced Format](https://day.js.org/docs/en/plugin/advanced-format)