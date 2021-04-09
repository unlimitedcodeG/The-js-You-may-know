(function foo() {
    var a = 3;
    console.log(a);
})();


console.log(a)
// 3.31
setTimeout(function () {
    console.log("I waited 1 second!");
}, 1000);


setInterval(function timeoutHandler() {
    console.log("I waited 1 second!")
}, 1000);

var a = 2;
(function foo() {
    var a = 3;
    console.log(a);
})();
console.log(a)


// undefined covered
undefined = true;
(function IIFE(undefined) {
    var a;
    console.log(a)
    if (a === undefined) {
        console.log("Undefined is safe here!")
    }
})
// IIFE window global
var a = 2;
(function IIFE(def) {
    def(window)
})(function def(global) {
    var a = 3;
    console.log(a) // 3
    console.log(global.a) // 2
})