var Marionette = require('marionette');
var F7Page = require('../f7page');

module.exports = Marionette.View.extend({
    template: require('../../templates/home/single.hbs'),

    behaviors: [F7Page],

    attributes: function() {
        return {
            id: "single",
            class: "page",
            "data-page": "single"
        }
    },

    initialize: function() {
    	console.log(this.el);
    }
});