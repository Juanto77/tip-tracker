/* Global Core Configuration */
import { createResolver } from '@nuxt/kit';
const { resolve } = createResolver(import.meta.url);

/* Nuxt Security */
/* Node environment variable */
const appEnv = process.env.NODE_ENV || 'development'



export default defineNuxtConfig({
  app: {
    head: {
      title: 'Tip Tracker',
      meta: [
        // TODO Fill in Meta Info here (https://nuxt.com/docs/api/nuxt-config#app)
      ],
    },
  },
  // modules: ['nuxt-security'],
  modules: [],

  // extends: [ '../../packages/ui', '../../packages/server', '../../modules/dashboard', '../../modules/charts', '../../modules/calendar' ],
  // extends: ['../../packages/ui', '../../packages/server', '../../modules/dashboard'],
  extends: ['../../modules/dashboard'],

  alias: { '~TT': resolve('./') },

  ///////////////////////////////////////////////////////////////////////////////////////////
  /* Debugger & Development */
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  // debug: true,

  ///////////////////////////////////////////////////////////////////////////////////////////
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