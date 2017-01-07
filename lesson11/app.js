
//say hello
function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        var item = 'item' + list[i];
        result.push( function() {console.log(item + ' ' + list[i])} );
    }
    return result;
}
 
function testList() {
    var fnlist = buildList([1,2,3]);
    // using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}

testList()

//闭包
var myObject = {value: 100};
myObject.getValue = function () {
  console.log(this.value);  // 输出 100

  // 输出 { value: 100, getValue: [Function] }，
  // 其实就是 myObject 对象本身
  console.log(this);

  return this.value;
};

console.log(myObject.getValue()); // => 100



var myObject1 = {value: 100};

var foo = function(){
  console.log(this);
};

foo(); // 全局变量 global
foo.apply(myObject1); // { value: 100 }
foo.call(myObject1); // { value: 100 }

var newFoo = foo.bind(myObject1);
newFoo(); // { value: 100 }
console.log(newFoo);


