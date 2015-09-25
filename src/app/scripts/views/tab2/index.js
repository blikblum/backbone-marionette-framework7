var Marionnette = require('marionette');

module.exports = Marionnette.ItemView.extend({
    template: require('../../templates/tab2/index.hbs'),
    attributes: function() {
        return {
            id: "tab2",
            class: "page",
            "data-page": "tab2-index"
        }
    }
});