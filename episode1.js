// 作用域对接

function foo(a) {
    var b = 2;
    // some code
    function bar() {
        // ..
    }
    // more code
    var c = 3;
}

bar()

console.log(a, b, c);