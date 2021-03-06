var Marionnette = require('marionette');

module.exports = Marionnette.ItemView.extend({
    template: require('../../templates/login/login.hbs'),
    attributes: function() {
        return {
            'id': 'login',
            'class': 'page',
            'data-page': 'login'
        }
    },

    events: {
        "click .navigate": "navigate"
    },

    onShow: function() {
        // Open popup
        window.f7.popup('#popup-login');

        $('#popup-login').on('closed', _.bind(this.onClosed, this));
    },

    onClosed: function() {
        this.destroy();

        // Clear view
        $('#popup-login .pages').empty();
        $('#popup-login .navbar-inner:gt(0)').remove();
        $('#popup-login .navbar-inner').removeClass().addClass('navbar-inner');
    },

    onDestroy: function() {
        this.undelegateEvents();
    },

    navigate: function(e) {
        window.router.navigate($(e.currentTarget).attr('href'), { trigger: true });

        e.preventDefault();
        return false;
    }
});