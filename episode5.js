// 闭包1
function foo() {
    var a = 2;
    function bar() {
        console.log(a);
    }
    bar();
}

foo();
// 闭包2
function foo() {
    var a = 2;
    function bar() {
        console.log(a);
    }
    return bar;
}

var baz = foo();
baz() // 2 __朋友 这就是闭包的效果
// foo() 被垃圾回收掉，但是一部分的作用于被bar()使用，并且一直存活下去，供bar()在之后的任何时间进行引用
//闭包3

function foo() {
    var a = 2;
    function baz() {
        console.log(a);
    }
    bar(baz)
}

function bar(fn) {
    fn()/// = baz() //Mom,快看这就是闭包! input= 2 
}


//闭包4

var fn;

function foo() {
    var a = 2;
    function baz() {
        console.log(a);
    }
    fn = baz;
}

function bar() {
    fn(); // 娘亲 这就是闭包耶，闭包好耶！
}

foo();
bar(); // 2

// 我逐渐理解了一切
function wait(message) {
    setTimeout(function timer() {
        console.log(message);
    }, 10000)
}

wait('Hello,closure!')

function setupBot(name, selector) {
    $(selector).click(function activator() {
        console.log('Activating: ' + name);
    })
}

setupBot("Closure Bot 1", "#bot_1");
setupBot("Closure Bot 2", "bot_2")

// 实践
var a = 2;
(function IIFE() {
    console.log(a);
})()

//for 循环与诗句  It's a tree falling in the forest with no one around to hear it
for (var i = 1; i <= 5; i++) {
    setTimeout(function timer() {
        console.log(i);
    }, i * 1000);
}

// for 2 
for (var i = 1; i <= 5; i++) {
    (function () {
        setTimeout(function timer() {
            console.log(i)
        }, 1000)
    })
}

// for 3
for (var i = 1; i <= 5; i++) {
    (function () {
        var j = i;
        setTimeout(function timer() {
            console.log(j);
        }, j * 1000);
    })()
}
// improve
for (var i = 1; i <= 5; i++) {
    (function (j) {
        setTimeout(function timer() {
            console.log(j);
        }, j * 1000);
    })(i)
}
// for 4
for (var i = 1; i <= 5; i++) {
    let j = i;
    setTimeout(function timer() {
        console.log(j);
    }, j * 1000);
}
//happy javascript coder
for (let i = 1; i <= 5; i++) {
    setTimeout(function timer() {
        console.log(i);
    }, i * 1000);
}