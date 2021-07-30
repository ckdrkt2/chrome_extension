var allLinks = [];
var visibleLinks = [];

function showLinks() {
  var linksTable = document.getElementById('links');
  while (linksTable.children.length > 1) {
    linksTable.removeChild(linksTable.children[linksTable.children.length - 1])
  }
  // for (var i = 0; i < visibleLinks.length; ++i) {
  //   var row = document.createElement('tr');
  //   var col = document.createElement('td');
  //   col.innerText = visibleLinks[i];
  //   col.style.whiteSpace = 'nowrap';
  //   row.appendChild(col);
  //   linksTable.appendChild(row);
  // }
  for (var i = 0; i < visibleLinks.length; ++i) {
    var iframe = document.createElement('iframe');
    iframe.id = "img" + i;
    iframe.class = "frame";
    iframe.src = visibleLinks[i];
    iframe.scrolling = "no";
    iframe.style = "padding:2px; width: 100px; height: 100px; overflow:hidden;";
    document.getElementById('thumbnail').appendChild(iframe);
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
      if (request.name == "id")
        document.getElementById('user_id').innerText = request.value;
      if (request.name == "like")
        document.getElementById('likes').innerText = request.value;
      if (request.name == "content") {
        var content = request.value;
        if (content.length > 200)
          document.getElementById('content').innerText = content.slice(0,200) + '...';
        else
          document.getElementById('content').innerText = content;
      }
      if (request.name == "date")
        document.getElementById('date').innerText = request.value;  
    }
  );
};

