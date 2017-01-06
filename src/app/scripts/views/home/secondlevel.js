var Marionette = require('marionette');
var F7Page = require('../f7page');

module.exports = Marionette.View.extend({
  template: require('../../templates/home/secondlevel.hbs'),

  behaviors: [F7Page],

  attributes: function() {
    return {
      id: "secondlevel",
      class: "page",
      "data-page": "secondlevel"
    }
  },

  initialize: function() {
    console.log(this.el);
  }
});
