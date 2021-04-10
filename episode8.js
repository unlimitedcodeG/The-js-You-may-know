var obj = {
    id: 'awesome',
    cool: function coolFn() {
        console.log(this.id);
    }
}

var id = 'not awesome';
obj.cool() // awesome
setTimeout(obj.coll, 100) // not awesome
//问题在于 cool() 函数丢失了同 this 之间的绑定。解决这个问题有好几种办法，但最常用的就是 
//     var self = this; 
var obj = {
    count: 0,
    cool: function coolFn() {
        var self = this;
        if (self.count < 0) {
            setTimeout(function timer() {
                self.count++;
                console.log("awesome?");
            }, 100)
        };
    }
}


obj.cool()// awesome?

// another way 
var obj = {
    count: 0,
    cool: function coolFn() {
        if (this.cont < 1) {
            setTimeout(function timer() {
                this.count++;
                console.log("more awesome");
            }.bind(this), 100)
        }
    }
}

obj.cool();

function identify() {
    return this.name.toUpperCase();
}

function speak() {
    var greeting = "Hello, I'm " + identify.call(this)
}

var me = {
    name: 'Kyle'
}

var you = {
    name: 'Reader'
}




// this显示传递上下文
function identify(context) {
    return context.name.toUpperCase();
}

function speack(context) {
    var greeting = 'Hello, I"m  ' + identify(context);
    console.log(greeting)
};

identify(you);
speack(me);
// 随着你的使用模式越来越复杂，显式传递上下文对象会让代码变得越来越混乱，使用 this,则不会这样。

// 硬绑定的典型应用场景就是创建一个包裹函数，负责接收参数并返回值
function foo(something) {
    console.log(this.a, something);
    return this.a + something
}

var obj = {
    a: 2
}

var bar = function () {
    return foo.apply(obj, arguments);
}

var b = bar(3);
console.log(b);
// 另一种使用方法是创建一个可以重复使用的辅助函数
function foo(something) {
    console.log(this.a, something);
    return this.a + something;
}

// 简单的辅助绑定函数
function bind(fn, obj) {
    return function () {
        return fn.apply(obj, arguments);
    }
}

var obj = {
    a: 2
}

var bar = bind(foo, obj);
var b = bar(3);
console.log(b);


function foo(something) {
    console.log(this.a, something);
    return this.a + something
}


/* 1.函数是否在new中调用(new 绑定) ？
如果是的话，this绑定的是新创建的对象
    var bar = new foo()
2. 函数是否通过call, apply(显示绑定)或者硬绑定调用？
如果是的话，this绑定的是指定的对象
3. 函数是否在某个上下文对象中调用(隐式绑定) ？
如果是的话，this绑定的是那个上下文对象
    var bar = obj1.foo()
4. 如果都不是，使用默认绑定。如果在严格模式下，就绑定到undefined，
否则绑定到全局对象。
    var bar = foo() */

/* 那么什么情况下你会传入 null 呢？
一种非常常见的做法是使用 apply(..) 来“展开”一个数组，并当作参数传入一个函数。
类似地，bind(..) 可以对参数进行柯里化（预先设置一些参数），这种方法有时非常有用： */
function foo(a, b) {
    console.log("a:" + a + ", b:" + b);
}

foo.apply(null, [2, 3]);
//把数据展开  a:2 b :3
var bar = foo.bind(null, 2);
bar(3);
// a:2 b:3 
//使用柯里化


//Demilitarized zone
function foo(a, b) {
    console.log("a: " + a + ", b:" + b)
}

var o = Object.create(null);
foo.apply(o, [2, 3]);
// a:2, b:3
var bar = foo.bind(o, 2)
bar(3);
// a:2, b:3
/* 决定 this 绑定对象的并不是调用位置是否处于严格模式，而是
函数体是否处于严格模式。如果函数体处于严格模式，this 会被绑定到 undefined，否则
this 会被绑定到全局对象。
 */

if (!Function.prototype.softBind) {
    Function.prototype.softBind = function (obj) {
        var fn = this
        // capture all curried args
        var curried = [].slice.call(arguments, 1);
        var bound = function () {
            return fn.apply(
                (!this || this == (window || global)) ?
                    obj : this,
                curried.concat.apply(curried, arguments)
            );
        };
        bound.prototype = Object.create(fn.prototype);
        return bound;
    }
}