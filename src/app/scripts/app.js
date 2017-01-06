require('marionette');

var App = Marionette.Application.extend({
	region: '.app-container'
});

var app = new App({});

module.exports = app;