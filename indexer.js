var basePath = 'http://dp.dev',
    subPaths = ['', '/download', '/features', '/about', '/help'],
    urls = [],
    resultingPages = [],
    page,
    fs = require('fs'),
    sourceFile = '_index.html',
    i;

for (i in subPaths) {
  urls.push(basePath + subPaths[i]);
  console.log(basePath + subPaths[i]);
  var path = '.' + subPaths[i] + '/index.html'
  fs.remove(path);
  fs.copy(sourceFile, path);
}

urls = urls.reverse();

function handleScrape(status) {
  if (status === 'success') {
    resultingPages.push(page.content);
  }

  window.setTimeout(function() {
    page.release(); // XXX phantomjs 1.7: use page.close(). ubuntu 13.04 uses 1.6.
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

    page.open(url, handleScrape);
  }
}

serializePages();
