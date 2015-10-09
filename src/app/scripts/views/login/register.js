var ChildItemView = require('../childItemView');

module.exports = ChildItemView.extend({
    template: require('../../templates/login/register.hbs'),

    attributes: function() {
        return {
            'id': 'register',
            'class': 'page',
            'data-page': 'register'
        }
    }
});