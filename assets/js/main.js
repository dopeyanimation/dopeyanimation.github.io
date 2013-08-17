DP = Em.Application.create();

if (typeof __PHANTOMJS__ !== 'undefined') {
	DP.Router.reopen({
		location: 'history',
		rootURL: '/dps/'
	});
}

DP.ApplicationController = Em.Controller.extend({
	currentPathChanged: function() {
		var page;

		Em.run.next(function() {
			if (!Em.isNone(ga)) {
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
