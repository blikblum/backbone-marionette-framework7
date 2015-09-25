require('marionette');

var F7Region = Marionette.Region.extend({
	oldViews: null,
	initialize: function() {
		this.oldViews = [];
	},
    addView: function(view, options) {
    	// If already view attached, append new one for transition
    	if (this.currentView) {
    		// Save old views for delete later only for estimation (deeper & deeper)
    		if ($(this.el).parent().hasClass('view-estimation') || $(this.el).parent().hasClass('view-login')) {
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
		"click .search": "navigate",
		"click .navigate": "navigate",
		"click .views": "closeMenu",
		"click .menu": "toggleMenu",
		"click .view-menu .navigate": "navigateFromMenu",
		"click #popup-login .close": "closeModal"
	},

  	regions: {
    	mainView: {
    		regionClass: F7Region,
    		selector: ".view-main .pages"
    	}
  	},

  	navigate: function(e) {
  		var view = $(e.currentTarget).data('view');

  		// Switch between views
  		if (view) {
  			$('.view.active').removeClass('active');
  			$(view).addClass('active');
  		}

        window.router.navigate($(e.currentTarget).attr('href'), { trigger: true });

        e.preventDefault();
        return false;
    },

    navigateFromMenu: function(e) {
    	// Stop pages animations temporarly
    	App.animatePages = false;

    	// Close menu
    	this.closeMenu(e);

    	// Navigation
    	this.navigate(e);

    	// Reinit pages animations
    	App.animatePages = true;

    	e.preventDefault();
        return false;
    },

    closeMenu: function(e) {
    	var mainView = $('.view-main').parent(),
    		menuView = $('.view-menu');

    	if (menuView.parent().hasClass('menu-reveal')) {
        	TweenMax.to(menuView, .3, {
        		scale: 2
        	});

        	TweenMax.to(mainView, .3, {
        		x: '0%',
        		scale: 1,
        		onComplete:function() {
        			menuView.parent().removeClass('menu-reveal');
        		}
        	});

        	e.stopPropagation();
        }
    },

    toggleMenu: function(e) {
    	var mainView = $('.view-main').parent(),
    		menuView = $('.view-menu');

    	if (menuView.parent().hasClass('menu-reveal')) {
    		this.closeMenu(e);
    	}
    	else {
        	TweenMax.to(menuView, .3, {
        		scale: 1
        	});

        	TweenMax.to(mainView, .3, {
        		x: '80%',
        		scale: 0.9,
        		onComplete:function() {
        			menuView.parent().addClass('menu-reveal');
        		}
        	});
        }

    	e.preventDefault();
    	return false;
    },

    closeModal: function(e) {
    	window.f7.closeModal($('#popup-login'));

    	e.preventDefault();
    	return false;
    }
});