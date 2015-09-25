require('backbone');
require('marionette');

var App = require('App');
var MainLayout = require('./views/layouts/main.js');

var HomeView = require('./views/home/index.js');
var HomeSingleView = require('./views/home/single.js');
var HomePopupView = require('./views/home/popup.js');
var Tab2IndexView = require('./views/tab2/index.js');

module.exports = Marionette.AppRouter.extend({
    layout: null,
    currentPage: null,

    initialize: function() {
        this.layout = new MainLayout();
        App.mainContainer.show(this.layout);

        // Delete old views when empty a region
        // ex : this.layout.REGIONNAME.on('empty', _.bind(this.clearOldViews, this));
    },

    clearOldViews: function(view, region, options) {
        if (this.oldViews) {
            _.each(this.oldViews, function(view) {
                view.destroy();
            });
            this.oldViews = [];
        }
    },

    navigate: function (url) {
        // Disable changing URL
        Backbone.history.loadUrl(url);
    },

    routes: {
        "": "getHome",
        "home/single": "getHomeSingle",
        "tab2": "getTab2"
    },

    /* Routes */
    getHome: function () {
        var page = new HomeView;
        this.layout.mainView.show(page);
    },

    getHomeSingle: function() {
        var page = new HomeSingleView;
        this.layout.mainView.addView(page); // Open a new page in the current view and perform animation
    },

    getTab2: function() {
        var page = new Tab2IndexView;
        this.layout.tab2.show(page);
    }
});