var Marionnette = require('marionette');

module.exports = Marionnette.View.extend({
    activeView: '.view.active', // Default to current active view, this is need to be set for popup's navigation
    originalEvents: {
        "click .navigate": "navigate",
        "click .back": "back"
    },

    additionalEvents: {
    },

    initialize: function(options) {
        if (options.activeView) {
            this.activeView = options.activeView;
        }
    },

    events : function() {
        return _.extend({},this.originalEvents,this.additionalEvents);
    },

    navigate: function(e) {
        window.router.navigate($(e.currentTarget).attr('href'), { trigger: true });

        e.preventDefault();
        return false;
    },

    back: function(e) {     
        $(this.activeView)[0].f7View.router.back();

        e.preventDefault();
        return false;
    },

    onDestroy: function() {
        this.undelegateEvents();
    },

    onAttach: function(view) {
        $(this.activeView)[0].f7View.router.load({
            pageElement: this.el,
            animatePages: true,
            query: {mnView: view}
        });
    }
});