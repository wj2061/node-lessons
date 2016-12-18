var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
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

  	  var ep = new eventproxy();
  	  // var epAll = new eventproxy();

  	  var  size = 3;

  	  var result = []

  	  var originalSize = topicUrls.length;

  	  ep.after('bunch',Math.ceil(topicUrls.length/size), function(topicAys){
  	  	  console.log('bunch');
  	  	  console.log(topicAys);
  	  });

  	  fetchCommentsForUrls(topicUrls, result);

  	//   while(topicUrls.length > 0){
  	//   	tempUrls = topicUrls.splice(0,size);

  	//     ep.after('topic_html',tempUrls.length, function(topics){
	  // 	   topics = topics.map(function(topicPair){
	  // 		var topicUrl =  topicPair[0];
	  // 		var topicHtml = topicPair[1];
	  // 		var $ = cheerio.load(topicHtml);
	  // 		return({
	  // 			title: $('.topic_full_title').text().trim(),
	  // 			href: topicUrl,
	  // 			comment1: $('.reply_content').eq(0).text().trim(),
	  // 		});
	  // 	});

	  // 	console.log('final:');
	  // 	console.log(topics);
	  //   result = result.concat(topics);
   //      ep.emit('bunch', topics);

	  // });

	  // tempUrls.forEach(function(topicUrl){
	  // 	superagent.get(topicUrl)
	  // 	  .end(function(err, res){
	  // 	  	console.log('fetch ' + topicUrl + ' successful');
	  // 	  	ep.emit('topic_html', [topicUrl, res.text]);
	  // 	  });
	  // });
  	 // }

  });

function fetchCommentsForUrls(topicUrls, result){
    if (topicUrls.length == 0) {
    	return ;
    }

    var size = 3;
    var ep = new eventproxy();

    var  tempUrls = topicUrls.splice(0,size);

    ep.after('topic_html',tempUrls.length, function(topics){
	  	   topics = topics.map(function(topicPair){
	  		var topicUrl =  topicPair[0];
	  		var topicHtml = topicPair[1];
	  		var $ = cheerio.load(topicHtml);
	  		return({
	  			title: $('.topic_full_title').text().trim(),
	  			href: topicUrl,
	  			comment1: $('.reply_content').eq(0).text().trim(),
	  		});
	  	});

	  	console.log('final:');
	  	console.log(topics);
        ep.emit('bunch', topics);

        result = result.concat(topics);


        if (topicUrls.length > 0) {
        	fetchCommentsForUrls(topicUrls, result);
        }else{
        	console.log('result');
        	console.log(result);
        }

	  });

	  tempUrls.forEach(function(topicUrl){
	  	superagent.get(topicUrl)
	  	  .end(function(err, res){
	  	  	console.log('fetch ' + topicUrl + ' successful');
	  	  	ep.emit('topic_html', [topicUrl, res.text]);
	  	  });
	  });
};




