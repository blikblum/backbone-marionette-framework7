var Marionette = require('marionette');
var F7Page = require('../f7page');
var Popup = require('./popup');

module.exports = Marionette.View.extend({
    template: require('../../templates/home/index.hbs'),

    behaviors: [
      {
        behaviorClass: F7Page,
        isRoot: true
      }
    ],

    attributes: function() {
        return {
            id: "home",
            class: "page",
            "data-page": "home"
        }
    },

    events: {
        "click .open-popup": "openPopup"
    },

    openPopup: function(e) {
        var popup = new Popup;
        popup.render();

        e.preventDefault();
        return false;
    }
});