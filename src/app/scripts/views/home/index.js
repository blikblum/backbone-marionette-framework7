var Marionnette = require('marionette');
var MainItemView = require('../mainItemView');
var Popup = require('./popup');

module.exports = MainItemView.extend({
    template: require('../../templates/home/index.hbs'),
    attributes: function() {
        return {
            id: "home",
            class: "page",
            "data-page": "home"
        }
    },

    additionalEvents: {
        "click .open-popup": "openPopup"
    },

    openPopup: function(e) {
        new Popup;

        e.preventDefault();
        return false;
    }
});