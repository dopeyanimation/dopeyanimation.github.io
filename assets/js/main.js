var phantomjs = (typeof __PHANTOMJS__ !== 'undefined') ? true : false;

if (!phantomjs) {
	$(document).ready(function () {
		$('#static').remove();
		$('html').removeClass('phantom');
	});
}

var DP = Em.Application.create({
	ready: function() {
		this.register('phantomjs:ispresent', DP.PhantomJS, {singleton: true});
		this.inject('controller', 'phantomjs', 'phantomjs:ispresent');
	},
	rootElement: (phantomjs) ? '#static' : '#dynamic'
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
} else {
	// redirect urls to main url
	Em.Route.reopen({
		activate: function() {
			var loc = window.location;
			if (loc.pathname !== '/') {
				loc.href = loc.origin + '/#' + loc.pathname;
			}
		}
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
