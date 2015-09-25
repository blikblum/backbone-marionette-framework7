var Marionnette = require('marionette');

module.exports = Marionnette.ItemView.extend({
    template: require('../../templates/home/index.hbs'),
    attributes: function() {
        return {
            id: "home",
            class: "page",
            "data-page": "home"
        }
    }
});