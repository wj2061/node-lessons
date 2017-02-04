var Q = require('q');

function getPromise(msg, timeout, opt){
	var defer = Q.defer();
	setTimeout(function(){
		console.log(msg);
		if (opt) {
			defer.reject(msg);
		}else{
			defer.resolve(msg);
		}
	}, timeout );
	return defer.promise;
}

getPromise('1', 3000)
  .then(function(){return getPromise('2', 2000, 'opt')})
  .then(function(){return getPromise('3', 1000)});

getPromise('1', 3000)
  .then(function(){return getPromise('2', 2000, 'opt')})
  .then(function(){return getPromise('3', 1000)})
  .done();
