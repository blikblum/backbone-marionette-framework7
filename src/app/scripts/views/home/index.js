var Marionnette = require('marionette');
var MainItemView = require('../mainItemView.js');
var Popup = require('./popup.js');

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
        "click .open-popup": "openPopup",
        "click .open-popup-login": "openPopupLogin"
    },

    openPopup: function(e) {
        new Popup;

        e.preventDefault();
        return false;
    },

    openPopupLogin: function(e) {
        e.preventDefault();
        return false;
    }
});