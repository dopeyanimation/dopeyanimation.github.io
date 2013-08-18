var phantomjs = (typeof __PHANTOMJS__ !== 'undefined') ? true : false;

var DP = Em.Application.create({
	ready: function() {
		this.register('phantomjs:ispresent', DP.PhantomJS, {singleton: true});
		this.inject('controller', 'phantomjs', 'phantomjs:ispresent');
	}
});

DP.PhantomJS = Em.Object.extend({
	isPresent: phantomjs
});

// for use when running the indexer script
if (phantomjs) {
	// don't use hash URLs
	DP.Router.reopen({
		location: 'history'
	});

	// add a class to the html element so that we know we're viewing an
	// indexed version of the page
	$('html').addClass('phantom');
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

Em.Route.reopen({
	redirect: function() {
		var loc = window.location;
		console.log(this.get('routeName'));
		console.log(loc.pathname);

		if (loc.pathname !== '/') {
			loc.href = loc.origin + '/#' + loc.pathname;
		}
	}
});

DP.Router.map(function() {
	this.route('download', { path: '/download'});
	this.route('features', { path: '/features'});
	this.route('about', { path: '/about'});
	this.route('help', { path: '/help'});
});
