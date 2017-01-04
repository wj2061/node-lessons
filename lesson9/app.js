console.log(/a/.test('A'));
console.log(/a/i.test('A'));

console.log('hello hell hoo'.match(/h.*?\b/));
console.log('hello hell hoo'.match(/h.*?\b/g));

console.log('aaa\nbbb\nccc'.match(/^[\s\S]*?$/g));
console.log('aaa\nbbb\nccc'.match(/^[\s\S]*?$/gm));

var exp = /\b((p(?!h)|[a-o,q-z]))*(p(?!h))+((p(?!h)|[a-o,q-z]))*\b/g

console.log('python php ruby javascript jsonp perhapsphpisoutdated'.match(exp))