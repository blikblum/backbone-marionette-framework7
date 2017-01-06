var Marionette = require('marionette');

module.exports = Marionette.Behavior.extend({
  initialize: function (options) {
    this.activeView = this.view.options.activeView || options.activeView || '.view.active';
    this.isRoot = options.isRoot;
  },

  events: {
    'click .navigate': 'onNavigateClick',
    'click .back': 'onBackClick'
  },

  onNavigateClick: function (e) {
    window.router.navigate($(e.currentTarget).attr('href'), { trigger: true });

    e.preventDefault();
    return false;
  },

  onBackClick: function (e) {
    $(this.activeView)[0].f7View.router.back();

    e.preventDefault();
    return false;
  },

  onAttach: function(view) {
    var viewEl;
    if (!this.isRoot) {
      viewEl = $(this.activeView)[0];
      viewEl.f7View.router.load({
        pageElement: view.el,
        animatePages: true,
        query: {mnView: view}
      });
    }
  }

});
