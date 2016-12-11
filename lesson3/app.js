var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();

app.get('/', function(req, res, next){
	superagent.get('https://cnodejs.org/')
	  .end(function(err, sres){
	  	if (err) {
	  		return next(err);
	  	}

	  	var $ = cheerio.load(sres.text);
	  	var items = [];
	  	$('#topic_list .cell').each(function(idx, element){
	  		var $element = $(element);

	  		items.push({
	  			title:  $element.find('.topic_title').attr('title'),
	  			href:   $element.find('.topic_title').attr('href'),
	  			author: $element.children('.user_avatar').children('img').attr('title')
	  		});
	  	});

	  	res.send(items);
	  });
});

app.listen(3000, function(){
	console.log('app is listening at port 3000');
});