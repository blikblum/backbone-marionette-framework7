var Marionette = require('marionette');

module.exports = Marionette.Behavior.extend({

  events: {
    'click .close': 'onCloseClick',
    'click .finish': 'onCloseClick',
    'closed': 'onClosed'
  },

  onCloseClick: function(e) {
    window.f7.closeModal(this.view.el);

    e.preventDefault();
    return false;
  },

  onRender: function() {
    this.$el.addClass('popup');
    window.f7.popup(this.view.el);
  },

  onClosed: function() {
    this.view.destroy();
  }

});
