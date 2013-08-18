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
	DP.Router.reopen({
		location: 'history'
	});

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

DP.Router.map(function() {
	this.route('download', { path: '/download'});
	this.route('features', { path: '/features'});
	this.route('about', { path: '/about'});
	this.route('help', { path: '/help'});
});
