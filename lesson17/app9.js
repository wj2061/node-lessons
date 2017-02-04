var Q = require('q');
var defer = Q.defer();

function foo(result){
	console.log(result);
	return result+result;
}

Q('hello').then(foo).then(foo).then(foo);

var funcs = [foo, foo, foo];
var result = Q('hello');
funcs.forEach(function(func){
	result = result.then(func);
});

funcs.reduce(function(prev, current){
	return prev.then(current);
}, Q('hello'));