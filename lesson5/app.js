var superagent = require('superagent');
var cheerio = require('cheerio');
var async = require('async');
var url = require('url');

var cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl)
  .end(function(err, res){
  	if (err) {
  		return console.error(err);
  	}

  	var topicUrls = [];
  	var $ = cheerio.load(res.text);

  	$('#topic_list .topic_title').each(function(idx, element){
  		var $element = $(element);

  		var href = url.resolve(cnodeUrl, $element.attr('href'));
  		topicUrls.push(href);
  	});

  	console.log(topicUrls);

  	async.mapLimit(topicUrls, 3 ,function(topicUrl, callback){
  		superagent.get(topicUrl)
  		  .end(function(err, res){
  		  	if (err) {
  		  		callback(err, null);
  		  	}else{
  		  		var $ = cheerio.load(res.text);

  		  		callback(null,{
  		  			           title: $('.topic_full_title').text().trim(),
  		  			           href: topicUrl,
  		  			           comment1: $('.reply_content').eq(0).text().trim(),
  		  			           score1: Number($('.big').text().replace('积分: ','')),
  		  			           })
  		  	}

  		  })

  	},function(err, result){
  		console.log('final:');
  		console.log(result);
  	})
  })



// var concurrencyCount = 0;
// var fetchUrl = function(url, callback){
// 	var delay = parseInt((Math.random()*10000000) % 2000, 10);
// 	concurrencyCount ++;

// 	console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
// 	setTimeout(function(){
// 		concurrencyCount--;
// 		callback(null,url + ' html content');

// 	},delay);
// };

// var urls = [];
// for (var i = 0	; i < 30 ; i++) {
// 	urls.push('http://datasource_' + i);
// }

// async.mapLimit(urls, 5 , function(url, callback){
// 	fetchUrl(url, callback);
// },function(err, result){
// 	console.log('final:');
// 	console.log(result);
// })
