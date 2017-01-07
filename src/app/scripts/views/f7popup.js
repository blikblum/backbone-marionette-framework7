var Marionette = require('marionette');

module.exports = Marionette.Behavior.extend({
  initialize: function (options) {
    this.id = this.view.options.id || options.id
  },

  events: {
    'click .close': 'onCloseClick',
    'click .finish': 'onCloseClick'
  },

  onCloseClick: function(e) {
    window.f7.closeModal('#' + this.id);

    e.preventDefault();
    return false;
  },

  onRender: function() {
    var popupEl = window.f7.popup(this.view.template());
    this.view.setElement(popupEl); // Reload events

    $('#' + this.id).on('closed', _.bind(this.onClosed, this));
  },

  onClosed: function() {
    this.view.destroy();
  }

});
