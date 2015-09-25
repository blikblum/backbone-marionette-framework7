// This is ENV based conf
var conf = {
    dev: {
        api_host: ""
    },
    prod: {
        api_host: ""
    }
};

// This is Common conf
var common = {
    gcm: {
        senderID: ""
    }
};

var mergeConf = function() {
    var app = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
    var config;

    if (!app) {
        config = conf.dev;
    }
    else {
        config = conf.prod;
    }

    // Merge common config with env config
    config = $.extend({}, config, common);

    return config;
};

module.exports = mergeConf();