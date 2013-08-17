// note: this is not the kind of code I would usually write.
// believe me when I say that this is the LEAST ugly solution I could find.
// async craziness + weird API = what you see here

var basePath = 'http://localhost/dps/_index.html';
var subPaths = ['', '/download', '/features', '/about', '/help'];
var urls = [];
var resultingPages = [];
var page;
var fs = require('fs');
var i;

for (i in subPaths.reverse()) {
  urls.push(basePath + subPaths[i]);
}

function handleScrape(status) {
  if (status === 'success') {
    resultingPages.push(page.content);
  }

  window.setTimeout(function() {
    page.release();
    serializePages();
  }, 2000);
}

function serializePages() {
  if (urls.length == 0) {
    for (i in resultingPages) {
      var f = fs.open('.' + subPaths[i] + '/index.html', 'w');
      f.write(resultingPages[i]);
      f.close();
    }

    phantom.exit();
  } else {
    page = require('webpage').create();
    var url = urls.pop();
    console.log(url);

    page.onInitialized = function() {
      page.evaluate(function() {
        __PHANTOMJS__ = {};
      });
    };
    page.onError = function(msg, trace) {
      var msgStack = ['ERROR: ' + msg];
      if (trace && trace.length) {
        msgStack.push('TRACE:');
        trace.forEach(function(t) {
          msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''));
        });
      }
      console.error(msgStack.join('\n'));
    };

    page.open(url, handleScrape);
  }
}

serializePages();
