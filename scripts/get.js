var get = require('get-saucelabs-browsers');

get([{name:'safari','version':'latest'}],function(err,configs){
    console.log(configs);
})
