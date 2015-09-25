require('marionette');

var App = Marionette.Application.extend({
	initialize: function(options) {
  	}
});

var app = new App({
	container: '.app-container'
});

// Add main region
app.addRegions({
	mainContainer: app.container
});

module.exports = app;