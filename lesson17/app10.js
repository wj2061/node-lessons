var Q = require('q');
var fs = require('fs');

function printFileContent(fileName) {
	return function() {
	   var defer = Q.defer();
	   fs.readFile(fileName,'utf8', function(err,data){
	   	  if (!err && data) {
	   	  	console.log(data);
	   	  	defer.resolve();
	   	  }
	   })
	   return defer.promise;
	}
}

printFileContent('sample01.txt')()
  .then(printFileContent('sample02.txt'))
  .then(printFileContent('sample03.txt'))
  .then(printFileContent('sample04.txt'));

  