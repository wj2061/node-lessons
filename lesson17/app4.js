var Q = require('q');
var fs = require('fs');
var defer = Q.defer();

function getInputPromise() {
	return defer.promise;
}

var outputPromise = getInputPromise().then(function(fulfiled){
	return 'fulfiled';
});

outputPromise.then(function(fulfiled){
	console.log('fulfiled: ' + fulfiled);
},function(rejected){
	console.log('rejected: ' + rejected);
});

defer.reject('inputpromise rejected');

// defer.resolve();