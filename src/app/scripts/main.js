require('jquery');
require('backbone');
require('framework7');
var Handlebars = require('handlebars');

var App = require('App');
var Conf = require('Conf');
var Router = require('./routes.js');

// Init app
App.on('start', function() {
    // Cross domain
    $.support.cors = true;
    
    // Attach router
    window.router = new Router();

    // Force first hashtag to prevent bug on # links
    if (window.location.href.indexOf('#') == -1) {
        window.location.href = "#";
    }

    // Init Framework7
    var f7 = new Framework7({
        router: true,
        pushState: false,
        fastClicks: true,
        scrollTopOnStatusbarClick: true
    });
    window.f7 = f7; // global framework7 instance

    /**
     * Register views (similar as NavigationController in iOS)
     */
    // Main view
    f7.addView('.view-main', {
        dynamicNavbar: true,
        domCache: true // Use to get deep back button work
    });

    f7.addView('.view-tab2', {
        dynamicNavbar: true,
        domCache: true
    });

    f7.addView('.view-login', {
        dynamicNavbar: true,
        domCache: true
    });

    // Attache current Marionette view to Framework7 page for delete
    f7.onPageInit('*', function(page) {
        var viewSelector = page.view.selector;

        // Save BM's view for destroy later
        switch(viewSelector) {
            case '.view-main':
                page.context = window.router.layout.mainView.currentView;
                break;

            case '.view-tab2':
                page.context = window.router.layout.tab2.currentView;
                break;

            case '.view-login':
                page.context = window.router.layout.login.currentView;
                break;
        }
    });

    /**
     * Destroy Marionette view after back
     */
    f7.onPageBack('*', function(page) {
        page.context.destroy(); // On back, destroy the BM's view attach to the F7's Page
    });

    // Start Backbone history (not really used due to Framework7 router)
    if (Backbone.history){
        Backbone.history.start();
    }
});

// Start app
App.start();


/**
 * Register all your Handlebars helpers / partials
 */

// Each with limit
Handlebars.registerHelper('limit', function (arr, limit) {
    if (!_.isArray(arr)) { return []; } // remove this line if you don't want the lodash/underscore dependency
    return arr.slice(0, limit);
});