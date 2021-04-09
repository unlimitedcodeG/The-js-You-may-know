var MyReallyCoolLibrary = {
    awesome: "stuff",
    doSomething: function () {

    },
    doAnotherThing: function () {

    }
}

console.log(MyReallyCoolLibrary.awesome)
console.log(MyReallyCoolLibrary.doSomething)
console.log(MyReallyCoolLibrary.doAnotherThing)


var a = 2;
function foo() {
    var a = 3;
    console.log(a);
}
console.log(foo());
console.log(a);
