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