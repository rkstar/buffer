// request BufferApp creds for the user
BufferApp.requestCredential = function(options, credentialRequestCompleteCallback){
  // support both( options, callback) and (callback)
  if( !credentialRequestCompleteCallback && (typeof options === 'function') ){
    credentialRequestCompleteCallback = options
    options = {}
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'buffer'})
  if( !config ){
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError('BufferApp not configured'))
    return
  }

  var credentialToken = Random.secret()
  // We need to keep credentialToken across the next two 'steps' so we're adding
  // a credentialToken parameter to the url and the callback url that we'll be returned
  // to by oauth provider

  var loginStyle = OAuth._loginStyle('buffer', config, options)
  var loginUrl = 'https://bufferapp.com/oauth2/authorize'+
    '?response_type=code'+
    '&client_id='+config.clientId+
    '&redirect_uri='+OAuth._redirectUri('buffer', config)+
    '&state='+OAuth._stateParam(loginStyle, credentialToken)

  OAuth.launchLogin({
    loginService: 'buffer',
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken
  })
}