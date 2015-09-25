require('marionette');

var F7Region = Marionette.Region.extend({
	oldViews: null,
	initialize: function() {
		this.oldViews = [];
	},
    addView: function(view, options) {
    	// If already view attached, append new one for transition
    	if (this.currentView) {
    		// Save old views for delete later only to reset view on region empty
    		if ($(this.el).parent().hasClass('view-login')) {
    			this.oldViews.push(this.currentView);
    		}

        	view.render();

        	this.currentView = view;

        	this.triggerMethod('show', view, this);
      		Marionette.triggerMethodOn(view, 'show', view, this, true, true);

      		return this;
      	}
      	else {
      		this.show(view);
      	}
    }
});

module.exports = Marionette.LayoutView.extend({
	template: require('../../templates/layouts/main.hbs'),
	attributes: function() {
		return {
			id: "mainLayout"
		}
	},

	events: {
		"click .toolbar .tab-link": "didSelectTab",
        "click #popup-login .close": "closeLoginPopup"
	},

  	regions: {
	   mainView: {
    		regionClass: F7Region,
    		selector: ".view-main .pages"
    	},
    	tab2: {
    		regionClass: F7Region,
    		selector: ".view-tab2 .pages"
    	},
        login: {
            regionClass: F7Region,
            selector: ".view-login .pages"
        }
  	},

  	navigate: function(e) {
  		var view = $(e.currentTarget).data('view');

  		// Switch between views
  		if (view) {
  			$('.view.active').removeClass('active');
  			$(view).addClass('active');
  		}

  		if ($(e.currentTarget).attr('href') != "") {
        	window.router.navigate($(e.currentTarget).attr('href'), { trigger: true });
        }

        e.preventDefault();
        return false;
    },

    didSelectTab: function(e) {
    	if (!$(e.currentTarget).hasClass('active')) {
	      	this.$el.find('.tab-link.active').removeClass('active');
    		$(e.currentTarget).addClass('active');

    		// Load tab content if not already loaded
            var view = $(e.currentTarget).data('view');
            if ($(view).find('.pages .page').length == 0) {
	      		this.navigate(e);
            }
            else {
            	if (view) {
		  			$('.view.active').removeClass('active');
		  			$(view).addClass('active');
		  		}
            }
    	}
    },

    closeLoginPopup: function(e) {
        window.f7.closeModal($('#popup-login'));

        e.preventDefault();
        return false;
    }
});