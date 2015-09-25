var Marionnette = require('marionette');
var MainItemView = require('../mainItemView.js');

module.exports = MainItemView.extend({
    template: require('../../templates/home/index.hbs'),
    attributes: function() {
        return {
            id: "home",
            class: "page",
            "data-page": "home"
        }
    }
});