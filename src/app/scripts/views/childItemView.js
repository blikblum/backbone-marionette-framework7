define([
    'jquery',
    'underscore',
    'marionette',
    'app'
], function ($, _, Marionnette, App) {
    'use strict';

    var ChildItemView = Marionnette.ItemView.extend({
        activeView: '.view.active',
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

        onShow: function(view, region, load, f7view) {
            if (load) {
                $(this.activeView)[0].f7View.router.load({
                    content: this.el,
                    animatePages: App.animatePages
                });

                this.setElement(this.template); // Reload events
            }
        }
    });

    return ChildItemView;
});