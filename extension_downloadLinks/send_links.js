// 이미지 url 가져오기
for (let script of document.scripts) {
  if (-1 !== script.textContent.indexOf("additionalDataLoaded(")) {
    var s = script;
    break
  }
}
var urls = s.textContent.split(',');
var links = [];
for (let url of urls) {
  if (-1 !== url.indexOf("display_url")) {
    url = url.slice(url.indexOf("http"),);
    url = url.replace(/\\u0026|"/g,'&');
    links.push(url);
  }
}
links = links.slice(1,);

// id 가져오기
var user_id = ""
var header = document.getElementsByTagName("header")[0].getElementsByTagName("span");
for (let span of header) {
  if (span.textContent !== "") {
    user_id = span.textContent;
    break
  }
}

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
  if (li.getElementsByTagName("h2").length > 0) {
    content = li.textContent.replace(user_id, "").replace("인증됨", "");
    date = li.getElementsByTagName("time")[0].title;
    break;
  }
}

chrome.extension.sendRequest(links);
chrome.runtime.sendMessage({name: "links", value: links});
chrome.runtime.sendMessage({name: "id", value: user_id});
chrome.runtime.sendMessage({name: "like", value: likes});
chrome.runtime.sendMessage({name: "content", value: content});
chrome.runtime.sendMessage({name: "date", value: date});