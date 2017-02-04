var Q = require('q');
var fs = require('fs');

function printFileContent(fileName){
	var defer = Q.defer();
	fs.readFile(fileName, 'utf8', function(err, data){
		if (!err && data) {
			console.log(data);
			defer.resolve(fileName + ' success ');
		}else {
			defer.reject(fileName + ' fail ');
		}
	})
	return defer.promise;
}

Q.all([printFileContent('sample01.txt'),printFileContent('sample02.txt'),printFileContent('sample03.txt'),printFileContent('sample04.txt')])
  .then(function(success){
  	console.log(success);
  });


Q.allSettled([printFileContent('sample01.txt'),printFileContent('sample02.txt'),printFileContent('sample03.txt'),printFileContent('sample04.txt')])
  .then(function(results){
  	results.forEach(
       function(result){
       	  console.log(result.state);
       }
     );
  });
