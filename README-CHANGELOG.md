## Change Log

### 1.1.0
* updated to handle multiple accounts from the same service
    * (ie. 2x twitter accounts, 5x facebook accounts)
* changed `user.services.buffer.services.twitter` from `Object` to `Array`
    * (ie. `user.services.buffer.services.twitter[0]._id = <buffer_id_string>`)