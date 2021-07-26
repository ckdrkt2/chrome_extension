var Crawler = require("crawler");

var title = "";
var reviews = "";
var img = "";

var c = new Crawler({
    maxConnections : 10,
    
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$ ;

            title = $("title").text();
            reviews = $("a strong","#content").text();
            img = $("img", "#content").attr('src');
            // console.log($("img", "#content").attr('src'))
            
            
        }
        done();
    }
});

c.queue('https://smartstore.naver.com/lilydress/products/709465134');

export {title, reviews, img};