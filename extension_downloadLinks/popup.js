var allLinks = [];
var visibleLinks = [];

function showLinks() {
  var linksTable = document.getElementById('links');
  while (linksTable.children.length > 1) {
    linksTable.removeChild(linksTable.children[linksTable.children.length - 1])
  }
  for (var i = 0; i < visibleLinks.length; ++i) {
    var row = document.createElement('tr');
    var col = document.createElement('td');
    col.innerText = visibleLinks[i];
    col.style.whiteSpace = 'nowrap';
    row.appendChild(col);
    linksTable.appendChild(row);
  }
}

function downloadCheckedLinks() {
  for (var i = 0; i < visibleLinks.length; ++i) {
    chrome.downloads.download({url: visibleLinks[i]},
                                            function(id) {
    });
  }
  window.close();
}

chrome.extension.onRequest.addListener(function(links) {
  for (var index in links) {
    allLinks.push(links[index]);
  }
  console.log(allLinks)
  visibleLinks = allLinks;
  const length = document.getElementById('imgNums');
  length.innerText = visibleLinks.length;
  showLinks();
});

window.onload = function() {
  document.getElementById('download').onclick = downloadCheckedLinks;

  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({active: true, windowId: currentWindow.id},
                      function(activeTabs) {
      chrome.tabs.executeScript(
        activeTabs[0].id, {file: 'send_links.js', allFrames: true});
    });
  });

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.name == "id")
        document.getElementById('user_id').innerText = request.value;
      if (request.name == "like")
        document.getElementById('likes').innerText = request.value;
      if (request.name == "content")
        document.getElementById('content').innerText = request.value;
      if (request.name == "date")
        document.getElementById('date').innerText = request.value;  
    }
  );
};

