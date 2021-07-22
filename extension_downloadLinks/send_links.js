var list = document.getElementsByTagName('img');
var links = [].slice.apply(list);
links = links.map(function(element) {
  
  return element.src;
});

var filterValue = "jpg e35";
var terms = filterValue.split(' ');
links = links.filter(function(link) {
  for (var termI = 0; termI < terms.length; ++termI) {
    var term = terms[termI];
    if (term.length != 0) {
      var expected = (term[0] != '-');
      if (!expected) {
        term = term.substr(1);
        if (term.length == 0) {
          continue;
        }
      }
      var found = (-1 !== link.indexOf(term));
      if (found != expected) {
        return false;
      }
      if (-1 !== link.indexOf("sh0")) {
        return false;
      }
    }
  }
  return true;
});

chrome.extension.sendRequest(links);


