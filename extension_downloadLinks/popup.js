var allLinks = [];
var visibleLinks = [];

function showLinks() {
  var linksTable = document.getElementById('links');
  while (linksTable.children.length > 1) {
    linksTable.removeChild(linksTable.children[linksTable.children.length - 1])
  }
  for (var i = 0; i < visibleLinks.length; ++i) {
    var row = document.createElement('tr');
    var col0 = document.createElement('td');
    var col1 = document.createElement('td');

    col1.innerText = visibleLinks[i];
    col1.style.whiteSpace = 'nowrap';
    row.appendChild(col0);
    row.appendChild(col1);
    linksTable.appendChild(row);
  }
}

function downloadLinks() {
  for (var i = 0; i < visibleLinks.length; ++i) {
    if (true) {
      chrome.downloads.download({url: visibleLinks[i]},
                                             function(id) {
      });
    }
  }
  window.close();
}

chrome.extension.onRequest.addListener(function(links) {
  for (var index in links) {
    allLinks.push(links[index]);
  }
  allLinks.sort();
  visibleLinks = allLinks;
  const length = document.getElementById('imgNums');
  length.innerText = visibleLinks.length;
  showLinks();
});


window.onload = function() {
  document.getElementById('download').onclick = downloadLinks;

  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({active: true, windowId: currentWindow.id},
                      function(activeTabs) {
      chrome.tabs.executeScript(
        activeTabs[0].id, {file: 'send_links.js', allFrames: true});
    });
  });

  chrome.tabs.executeScript(tabs, {
    code: 'document.getElementsByTagName("section")'
  }, function (a) {
    // var a = article[0].split("\n");
    console.log(a);
    document.getElementById('user_id').innerText = a[0];
    document.getElementById('likes').innerText = a[1];
  });
};