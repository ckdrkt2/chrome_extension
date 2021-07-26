var list = document.getElementsByTagName('img');
var links = [].slice.apply(list);
links = links.map(function(element) {
  
  return element.src;
});

var filterValue = "jpg s1080";
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
    }
  }
  return true;
});

// id 가져오기
var user_id = document.getElementsByTagName("header")[0].textContent;

// 좋아요 수 가져오기
var likes = "";
var sections = document.getElementsByTagName("section");
for (let i = 1; i < sections.length; i++) {
  if (-1 !== sections[i].textContent.indexOf("좋아요")) {
    likes = sections[i].textContent;
    likes = likes.split(" ")[1];
    break;
  }
}

// 게시글, 게시날짜 가져오기
var content = "";
var date = "";
var li_tag = document.getElementsByTagName("li");
for (let li of li_tag) {
  if (-1 !== li.textContent.indexOf(user_id)) {
    content = li.textContent.split(user_id)[1];
    date = li.getElementsByTagName("time")[0].title;
    break;
  }
}

chrome.extension.sendRequest(links);
chrome.runtime.sendMessage({name: "id", value: user_id});
chrome.runtime.sendMessage({name: "like", value: likes});
chrome.runtime.sendMessage({name: "content", value: content});
chrome.runtime.sendMessage({name: "date", value: date});
