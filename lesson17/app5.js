var Q = require('q');
var defer = Q.defer();

function getInputPromise() {
	return defer.promise;
}

var outputPromise = getInputPromise().then(null,function(rejected){
	return 'rejected';
});

outputPromise.then(function(fulfilled){
    console.log('fulfilled: ' + fulfilled);
},function(rejected){
    console.log('rejected: ' + rejected);
});

// defer.reject('inoutpromise rejected');

defer.resolve('inputpromise fulfilled');