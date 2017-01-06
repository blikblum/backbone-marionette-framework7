var ChildItemView = require('../childItemView');

module.exports = ChildItemView.extend({
  template: require('../../templates/home/secondlevel.hbs'),

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
