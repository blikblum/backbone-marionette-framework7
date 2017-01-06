var Marionette = require('marionette');
var F7Page = require('../f7page');

module.exports = Marionette.View.extend({
    template: require('../../templates/tab2/index.hbs'),

    behaviors: [
      {
        behaviorClass: F7Page,
        isRoot: true
      }
    ],

    attributes: function() {
        return {
            id: "tab2",
            class: "page",
            "data-page": "tab2-index"
        }
    }
});