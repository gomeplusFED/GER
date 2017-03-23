var get = require('get-saucelabs-browsers');

get([{name:'iphone','version':'latest'}],function(err,configs){
    console.log(configs);
})
