var MainItemView = require('../mainItemView.js');

module.exports = MainItemView.extend({
    template: require('../../templates/tab2/index.hbs'),
    attributes: function() {
        return {
            id: "tab2",
            class: "page",
            "data-page": "tab2-index"
        }
    }
});