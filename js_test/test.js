var Crawler = require("crawler");

var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$ ;

            console.log(res.request);

            // console.log($("title").text());
            
            // const $bodyList = $("a").attr('href');

            // $.each(function(i, element) {
            //     if ($(this).find('a').attr('herf') == "#REVIEW")
            //         console.log($(this).find('a').attr('herf'));
            // })
            // let newsList = [];
            // $bodyList.each(function(i, elem) {
            //     newsList[i] = $(this).find('a.thumb img').attr('alt');
            //   });

            // console.log(newsList);
        }
        done();
    }
});
 
// Queue just one URL, with default callback
c.queue('https://smartstore.naver.com/lilydress/products/709465134');