var ChildItemView = require('../childItemView');

module.exports = ChildItemView.extend({
    template: require('../../templates/home/single.hbs'),

    attributes: function() {
        return {
            id: "single",
            class: "page",
            "data-page": "single"
        }
    },

    initialize: function() {
    	console.log(this.el);
    }
});