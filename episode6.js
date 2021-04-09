// Module

function foo() {
    var something = 'cool';
    var another = [1, 2, 3];

    function doSomething() {
        console.log(something);
    }

    function doAnother() {
        console.log(another.join(' ! '));
    }
}

// imporvement, make some cool module
function CoolModule() {
    var something = 'cool';
    var another = [1, 2, 3];

    function doSomething() {
        console.log(something);
    }
    function doAnother() {
        console.log(another.join(' ! '));
    }

    return {
        doSomething: doSomething,
        doAnother: doAnother
    };
}

var foo = CoolModule();// 返回一个对象字面量语法{key:value,...},返回一个函数API
//保持内部数据变量是隐藏且私有的状态
//可以将这个对象类型的返回值看作本质上是模块的公共 API。

foo.doSomething();// cool
foo.doAnother(); // 1 ! 2 ！3

// 必须有外部的函数，该函数必须至少被调用1次(每次调用都会创建一个新的模块实例)。
// 封闭函数必须返回至少一个内部函数，这样内部函数才能在私有作用域中形成闭包，并且可以访问或者修改私有的状态

// improvement for simgle link module
var foo = (function CoolModule() {
    var something = 'cool'
    var another = [1, 2, 3];

    function doSomething() {
        console.log(something);
    }
    function doAnother() {
        console.log(another.join(' ! '));
    }
    return {
        doSomething: doSomething,
        doAnother: doAnother
    };

})();
foo.doSomething()
foo.doAnother();
// 我们将模块函数转换成了 IIFE，立即调用这个函数并将返回值直接赋值给单例的模块实例标识符 foo。
function CoolModule(id) {
    function identify() {
        console.log(id);
    }

    return {
        identify: identify
    };
}

var foo1 = CoolModule("foo 1");
var foo2 = CoolModule("foo 2");
foo1.identify() // "foo 1"
foo2.identify() // "foo 2"

var foo = (function CoolModule(id) {
    function change() {
        // 修改公共API
        publicAPI.identify = identify2;
    }
    function identify1() {
        console.log(id);
    }
    function identify2() {
        console.log(id.toUpperCase())
    }

    var pubilicAPI = {
        change: change,
        identify: identify1
    };

    return pubilicAPI;
})('foo module');


foo.identify(); // foo module
foo.change();
foo.identify(); // FOO MODULE

// modern module mechanism 
var MyModules = (function Manager() {
    var modules = {};

    function define(name, deps, impl) {
        for (var i = 0; i < deps.length; i++) {
            deps[i] = modules[deps[i]];
        }
        modules[name] = impl.apply(impl, deps);
    }

    function get(name) {
        return modules[name]
    }

    return {
        define: define,
        get: get
    }
})

//为了模块的定义引入了包装函数（可以传入任何依赖），并且将返回值，也就是模块的 API，储存在一个根据名字来管理的模块列表中。
MyModules.define('bar', [], function () {
    function hello(who) {
        return "Let me introduce: " + who;
    }

    return {
        hello: hello
    };
});

MyModules.define("foo", ["bar"], function (bar) {
    var hungry = 'hippo';

    function awesome() {
        console.log(bar.hello(hungry).toUpperCase());
    }

    return {
        awesome: awesome
    };
})

var bar = MyModules.get('bar');
var foo = MyModules.get('foo');

console.log(
    bar.hello('hippo')
)// Let me introduce: hippo

foo.awesome();//LET ME INTRODUCE: HIPPO
// 特点：调用包装了函数定义的包装函数，并且将返回值作为该模块的 API。
