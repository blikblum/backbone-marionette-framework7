var Marionette = require('marionette');
var F7Popup = require('../f7popup');

module.exports = Marionette.View.extend({
    behaviors: [
      {
        behaviorClass: F7Popup,
        id: 'popup-home'
      }
    ],

    template: require('../../templates/home/popup.hbs')
});