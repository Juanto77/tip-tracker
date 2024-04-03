// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from '@nuxt/kit';
// const { resolve } = createResolver(import.meta.url);
export default defineNuxtConfig({

  // alias: { '~Dashboard': resolve('./') },

  devtools: { enabled: true },
  // debug: true,

  /* Configure Dashboard options */
  // extends: ['../auth'],

  modules: [
    '@myturborepo/ui',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    'dayjs-nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-primevue',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/device',
    '@nuxtjs/color-mode',
    'dayjs-nuxt',
    'nuxt-icon',
    'nuxt-headlessui'
  ],

  /* Nitro Config for Turbo */
  nitro: {
    preset: 'netlify',
  },


  tailwindcss: {
    configPath: '/tailwind.config.ts',
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  primevue: { // Treeshaking to lower bundle size
    // usePrimeVue: true,
    options: {
      unstyled: true,
    },
    importPT: { as: 'base', from: '~/assets/presets/tw-lara' }
    // importPT: { as: 'Tailwind', from: 'primevue/passthrough/tailwind' },
  },

  // /*
  supabase: {
    /*
    clientOptions: {
      auth: {
        persistSession: true,
      },
    },
    */
    cookieOptions: {
      secure: false,
    },
    redirect: true,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      // exclude: ['/form', '/sandbox', '/signup', '/magiclink', '/dashboard/monthview', '/Dashboard/*', '/UISandbox'],
      exclude: ['/sandbox', '/signup', '/magiclink', '/'],
      cookieRedirect: true,
    },

  },



  /* Security Module */
  /*
    security: {
  
      headers: {
        crossOriginResourcePolicy: 'same-origin',
        crossOriginOpenerPolicy: 'same-origin',
        // crossOriginEmbedderPolicy: 'require-corp',
        crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
        contentSecurityPolicy: {
          'base-uri': ["'none'"],
          'font-src': ["'self'", 'https:', 'data:'],
          'form-action': ["'self'"],
          'frame-ancestors': ["'self'"],
          'img-src': ["'self'", 'data:'],
          'object-src': ["'none'"],
          'script-src-attr': ["'none'"],
          'style-src': ["'self'", 'https:', "'unsafe-inline'"],
          'script-src': ["'self'", 'https:', "'unsafe-inline'", "'strict-dynamic'", "'nonce-{{nonce}}'"],
          'upgrade-insecure-requests': false
        },
  
        originAgentCluster: '?1',
        referrerPolicy: 'no-referrer',
        strictTransportSecurity: {
          maxAge: 15552000,
          includeSubdomains: true
        },
  
        xContentTypeOptions: 'nosniff',
        xDNSPrefetchControl: 'off',
        xDownloadOptions: 'noopen',
        xFrameOptions: 'SAMEORIGIN',
        xPermittedCrossDomainPolicies: 'none',
        xXSSProtection: '0',
        permissionsPolicy: {
          camera: [],
          'display-capture': [],
          fullscreen: [],
          geolocation: [],
          microphone: []
        }
      },
      requestSizeLimiter: {
        maxRequestSizeInBytes: 2000000,
        maxUploadFileRequestInBytes: 8000000,
        throwError: true
      },
      rateLimiter: {
        tokensPerInterval: 150,
        interval: 300000,
        headers: false,
        driver: {
          name: 'lruCache'
        },
        throwError: true
      },
      xssValidator: {
        throwError: true
      },
      corsHandler: {
        origin: '*',
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        preflight: {
          statusCode: 204
        },
      },
      allowedMethodsRestricter: {
        methods: '*',
        throwError: true
      },
      hidePoweredBy: true,
      basicAuth: false,
      enabled: true,
      csrf: false,
      nonce: true,
      removeLoggers: {
        external: [],
        consoleType: ['log', 'debug'],
        include: [/\.[jt]sx?$/, /\.vue\??/],
        exclude: [/node_modules/, /\.git/]
      },
      ssg: {
        meta: true,
        hashScripts: true,
        hashStyles: false
      },
      sri: true
    }
  */

});
