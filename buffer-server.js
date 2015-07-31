var OAuth = Package.oauth.OAuth

OAuth.registerService('buffer', 2, null, function(query){
  var response = app.getResponseData(query),
    user = app.getUserData(response.access_token),
    profiles = app.getProfileData(response.access_token),
    serviceData = {
      id: user.id,
      accessToken: response.access_token,
      expiresAt: new Date(new Date().getTime() + (response.expires_in * 1000)),
      services: {}
    },
    whitelist = [
      '_id',
      'avatar',
      'avatar_https',
      'service_id',
      'service_username',
      'formatted_username'
    ]

  profiles.map(function(profile){
    if( !serviceData.services[profile.service] ){
      serviceData.services[profile.service] = []
    }
    serviceData.services[profile.service].push(_.pick(profile, whitelist))
  })

  return {
    serviceData: serviceData,
    options: {
      profile: {
        name: user.name
      }
    }
  }
})

var app = {
  getResponseData: function(query){
    var config = ServiceConfiguration.configurations.findOne({service: 'buffer'})
    if( !config ){
      throw new ServiceConfiguration.ConfigError('Buffer not configured')
    }

    try {
      var data = HTTP.call('POST', 'https://api.bufferapp.com/1/oauth2/token.json', {params:{
        grant_type: 'authorization_code',
        client_id: config.clientId,
        client_secret: config.clientSecret,
        redirect_uri: OAuth._redirectUri('buffer', config),
        code: query.code
      }}).data
    } catch(err){
      throw new Error('Failed to complete OAuth handshake with Buffer. '+err.message)
    }

    if( !data ){
      throw new Error('Failed to complete OAuth handshake with Buffer. '+err.message)
    }

    if( !data.access_token ){
      throw new Error('Failed to complete OAuth handshake with Buffer -- can\'t find access token in HTTP response '+response.content)
    }

    return data
  },

  getUserData: function(access_token){
    var data = HTTP.call('GET','https://api.bufferapp.com/1/user.json',{params:{
      access_token: access_token
    }}).data

    return (data) ? data : {}
  },

  getProfileData: function(access_token){
    var data = HTTP.call('GET', 'https://api.bufferapp.com/1/profiles.json', {params:{
        access_token: access_token
    }}).data

    return (data) ? data: []
  }
}

Buffer.retrieveCredential = function(credentialToken, credentialSecret){
  return OAuth.retrieveCredential(credentialToken, credentialSecret)
}