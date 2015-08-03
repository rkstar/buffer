## Change Log

### 1.1.0
#### This update contains breaking changes
* changed exported variable name from _Buffer_ to _BufferService_ to avoid namespace collisions (detected when using with `request` package)
* updated to handle multiple accounts from the same service
    * (ie. 2x twitter accounts, 5x facebook accounts)
* changed `user.services.buffer.services.<service_name>` from `Object` to `Array`
    * (ie. `user.services.buffer.services.twitter[0]._id = <buffer_id_string>`)