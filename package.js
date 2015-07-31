Package.describe({
  name: 'rkstar:buffer',
  //version: '1.1.0',
  version: '1.0.2',
  // Brief, one-line summary of the package.
  summary: 'An OAuth2 wrapper for the Buffer API',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/rkstar/buffer',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
})

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2')

  api.use('oauth2')
  api.use('oauth')
  api.use('http', 'server')
  api.use('underscore', 'server')
  api.use('random', 'client')
  api.use('service-configuration')

  api.export('BufferService')

  api.addFiles('buffer-common.js')
  api.addFiles('buffer-client.js', 'client')
  api.addFiles('buffer-server.js', 'server')
})