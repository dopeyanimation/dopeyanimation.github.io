DP = Em.Application.create();

DP.ApplicationController = Ember.Controller.extend({
	currentPathChanged: function() {
		var page;

		Ember.run.next(function() {
			if (!Ember.isNone(ga)) {
				page = window.location.hash.length > 0 ?
					   window.location.hash.substring(1) :
					   window.location.pathname;

				ga('send', 'pageview');
			}
		});
	}.observes('currentPath')
});

DP.Router.map(function() {
	this.route('download', { path: '/download'});
	this.route('features', { path: '/features'});
	this.route('about', { path: '/about'});
	this.route('help', { path: '/help'});
});
