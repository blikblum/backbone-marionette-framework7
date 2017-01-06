var Marionette = require('marionette');
var F7Page = require('../f7page');

module.exports = Marionette.View.extend({
    template: require('../../templates/login/register.hbs'),

    behaviors: [F7Page],

    attributes: function() {
        return {
            'id': 'register',
            'class': 'page',
            'data-page': 'register'
        }
    }
});