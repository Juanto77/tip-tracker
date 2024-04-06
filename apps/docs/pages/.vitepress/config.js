export default {
  title: 'Tip Tracker',
  description: 'Tip Tracker Documentation',
  themeConfig: {
    siteTitle: 'Tip Tracker Documentation',
    nav: [
      { text: 'Index', link: '/index' },
      { text: 'Getting started', link: '/getting-started' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Index', link: '/index' },
          { text: 'Getting started', link: '/getting-started' },
        ],
      },{
        text: 'Configuration',
        items: [
          { text: 'Nuxt Turbo Repo Starter', link: '/config/00-turbo-repo'},
          { text: 'Nuxt Security', link: '/config/10-nuxt-security' }

        ]
      },{
      text: 'Data Handling',
      items: [
        { text: 'UUIDs', link: '/data-handling/00-uuid'}
      ]
      }
    ],
  },

}
