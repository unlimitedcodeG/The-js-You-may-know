class CoolGuy {
    specialTrick = nothing
    CoolGuy(trick) {
        specialTrick = trick
    }
    showOff() {
        output("Here's my trick: ", specialTrick)
    }
}
/* 我们可以调用类构造函数来生成一个 CoolGuy 实例： */
Joe = new CoolGuy("jumping rope")
Joe.showOff() // 这是我的绝技：跳绳


function mixin(sourceObj, targetObj) {
    for (var key in sourceObj) {
        if (!(key in targetObj)) {
            targetObj[key] = sourceObj[key];
        }
    }
    return targetObj;
}

var Vehicle = {
    engines: 1,
    ignition: function () {
        console.log('Turning on my engine.');
    },
    driver: function () {
        this.ignition();
        console.log("Steering and moving forward!")
    }
};

var Car = mixin(Vehicle, {
    wheels: 4,

    drive: function () {
        Vehicle.drive.call(this);
        console.log(
            "Rolling on all" + this.wheels + "wheels!"
        );
    }
})



function mixin(sourceObj, targetObj) {
    for (var key in sourceObj) {
        // 只会在不存在的情况下复制
        if (!(key in targetObj)) {
            targetObj[key] = sourceObj[key];
        }
    }
    return targetObj;
}



// 另一种混入函数，可能有重写风险
function mixin(sourceObj, targetObj) {
    for (var key in sourceObj) {
        targetObj[key] = sourceObj[key];
    }
    return targetObj;
}
var Vehicle = {
    ////
}

var Car = mixin(Vehicle, {});
// 然后把新内容复制到 Car 中
mixin({
    wheels: 4,
    drive: function () {
        //
    }
}, Car);


// “传统的 JavaScript 类”Vehicle
function Vehicle() {
    this.engines = 1;
}
Vehicle.prototype.ignition = function () {
    console.log("Turning on my engine.");
}
Vehicle.prototype.drive = function () {
    this.ignition();
    console.log('Steering and moving forward!')
}
// "寄生类" Car 
function Car() {
    //首先，car 是一个Vehicle
    var car = new Vehicle();
    // 接着我们对car进行定制
    car.wheels = 4;
    // 保存到Vehicle::drive()的特殊引用
    var vehDrive = car.drive;
    // 重写Vehicle::drive
    car.drive = function () {
        vehDrive.call(this);
        console.log(
            "Rolling on all" + this.wheels + "wheels!"
        );
    }
    return car;
}

var myCar = new Car();
myCar.drive();
/* 下面这段代码使用的就是典型的“原型风格”： */
function Foo(name) {
    this.name = name;
}
Foo.prototype.myName = function () {
    return this.name;
};
function Bar(name, label) {
    Foo.call(this, name);
    this.label = label;
}
// 我们创建了一个新的 Bar.prototype 对象并关联到 Foo.prototype 
Bar.prototype = Object.create(Foo.prototype);
// 注意！现在没有 Bar.prototype.constructor 了
// 如果你需要这个属性的话可能需要手动修复一下它
Bar.prototype.myLabel = function () {
    return this.label;
};
var a = new Bar("a", "obj a");
a.myName(); // "a" 
a.myLabel(); // "obj a"

// ES6之前 需要抛弃默认的Bar.prototype
Bar.prototype = Object.create(Foo.prototype);
// ES6 开始可以直接修改现有的 Bar.prototype
Object.setPrototypeOf(Bar.prototype, Foo.prototype);
/* Object.create(..) 方法带来的轻微性能损失（抛弃的对象需要进行垃圾回
收） */
function isRelatedTo(o1, o2)


if (!Object.create) {
    Object.create = function (o) {
        function F() { }
        F.prototype = o;
        return new F()
    }
}
/* [[Prototype]]。这一系列对象的链接被称为“原型链”。
换句话说，JavaScript 中这个机制的本质就是对象之间的关联关系。 */
// 父类
function Widget(width, height) {
    this.width = width || 50;
    this.height = height || 50;
    this.$elem = null;
}
Widget.prototype.render = function ($where) {
    if (this.$elem) {
        this.$elem.css({
            width: this.width + "px",
            height: this.height + "px"
        }).appendTo($where);
    }
};

// 子类
function Button(width, height, label) {
    // 调用“super”构造函数 
    Widget.call(this, width, height);
    this.label = label || "Default";
    this.$elem = $("<button>").text(this.label);
}
// 让 Button“继承”Widget 
Button.prototype = Object.create(Widget.prototype);
// 重写 render(..) 
Button.prototype.render = function ($where) {
    // “super”调用
    Widget.prototype.render.call(this, $where);
    this.$elem.click(this.onClick.bind(this));
};
Button.prototype.onClick = function (evt) {
    console.log("Button '" + this.label + "' clicked!");
};
$(document).ready(function () {
    var $body = $(document.body);
    var btn1 = new Button(125, 30, "Hello");
    var btn2 = new Button(150, 40, "World");
    btn1.render($body);
    btn2.render($body);
});
//class sugar grammer
class Widget {
    constructor(width, height) {
        this.width = width || 50;
        this.height = height || 50;
        this.$elem = null;
    }
    redener($where) {
        if (this.$elem) {
            this.$elem.css({
                width: this.width + 'px',
                height: this.height + 'px'
            }).appendTo($where);
        }
    }
}

class Button extends Widget {
    constructor(width, height, label) {
        super(width, height);
        this.label = label || "Default";
        this.$elem = $("<button></button>").text(this.label);
    }
    render($where) {
        super.render($where);
        this.$elem.click(this.onClick.bind(this));
    }
    onClick(evt) {
        console.log("Button " + this.label + " ' clicked !");
    }
}

$(document).ready(function () {
    var $body = $(document.body);
    var btn1 = new Button(125, 30, 'Hello');
    var btn2 = new Button(150, 40, 'World');

    btn1.render($body);
    btn2.render($body)
})
// 委托行为
var Widget = {
    init: function (width, height) {
        this.width = width || 50;
        this.height = height || 50;
        this.$elem = null;
    },
    insert: function ($where) {
        if (this.$elem) {
            this.$elem.css({
                width: this.width + "px",
                height: this.height + "px"
            }).appendTo($where);
        }
    }
};
var Button = Object.create(Widget);
Button.setup = function (width, height, label) {
    // 委托调用
    this.init(width, height);
    this.label = label || "Default";
    this.$elem = $("<button>").text(this.label);
};
Button.build = function ($where) {// 委托调用
    this.insert($where);
    this.$elem.click(this.onClick.bind(this));
};
Button.onClick = function (evt) {
    console.log("Button '" + this.label + "' clicked!");
};
$(document).ready(function () {
    var $body = $(document.body);
    var btn1 = Object.create(Button);
    btn1.setup(125, 30, "Hello");
    var btn2 = Object.create(Button);
    btn2.setup(150, 40, "World");
    btn1.build($body);
    btn2.build($body);
})

/* Controller 写法 */
// 父类
function Controller() {
    this.errors = [];
}
Controller.prototype.showDialog = function (title, msg) {
    // 给用户显示标题和消息
};
Controller.prototype.success = function (msg) {
    this.showDialog("Success", msg);
};
Controller.prototype.failure = function (err) {
    this.errors.push(err);
    this.showDialog("Error", err);
};
//子类
function LoginController() {
    Controller.call(this);
}
// 把子类关联到父类
LoginController.prototype =
    Object.create(Controller.prototype);
LoginController.prototype.getUser = function () {
    return document.getElementById('login_username').value;
}
LoginController.prototype.validateEntry = function (user, pw) {
    user = user || this.getUser();
    pw = pw || this.getPassword();

    if (!(user && pw)) {
        return this.failure(
            "Please enter a username&password"
        );
    }
    else if (pw.length < 5) {
        return this.failure(
            "Password must be 5+ character!"
        );
    }
    return true;
}
// 重写基础的failure()
LoginController.prototype.failure = function (err) {
    "super"
    Controller.prototype.failure.call(
        this,
        "Login invalid." + err
    );
}

//子类
function AuthController(login) {
    Controller.call(this);
    // 合成
    this.login = login;
}

AuthController.prototype = Object.create(Controller.prototype);
AuthController.prototype.server = function (url, data) {
    return $.ajax({
        url: url,
        data: data
    });
};
AuthController.prototype.checkAuth = function () {
    var user = this.login.getUser();
    var pw = this.login.getPassword();

    if (this.login.validateEntry(user, pw)) {
        this.server('/check-auth', {
            user: user,
            pw: pw
        })
            .then(this.success.bind(this))
            .fail(this.failure.bind(this));
    }
};
// 重写基础的success
AuthController.prototype.success = function () {
    Controller.prototype.success.call(this, "Authenticated!");
}
// 重写基础的failure
AuthController.prototype.failure = function (err) {
    Controller.prototype.failure.call(
        this,
        "Auth Failed: " + err
    );
}

var auth = new AuthController(
    //除了继承 我们还要合成
    new LoginController()
);

auth.checkAuth();

// 反类
var LoginController = {
    errors: [],
    getUser: function () {
        return document.getElementById(
            "login_username"
        ).value;
    },
    getPassword: function () {
        return document.getElementById(
            "login_userpasword"
        ).value;
    },
    validateEntry: function (user, pw) {
        user = user || this.getUser();
        pw = pw || this.getPassword();

        if (!(user && pw)) {
            return this.failure(
                "Please enter a username&password!"
            );
        }
        else if (pw < length < 5) {
            return this.failure(
                "Password must be 5+ characters!"
            );
        }
        // 如果执行到这里 说明验证通过
        return true;
    },
    showDialog: function (title, msg) {
        // 给用户显示标题和信息
    },
    failure: function (err) {
        this.errors.push(err);
        this.showDialog("Error", "Login invalid: " + err);
    }
};
// 让 AuthController 委托 LoginController
var AuthController = Object.create(LoginController);

AuthorController.errors = [];
AuthController.checkAuth = function () {
    var user = this.getUser();
    var pw = this.getPassword();

    if (this.validateEntry(user, pw)) {
        this.server('/check-auth', {
            user: user,
            pw: pw
        })
            .then(this.accepted.bind(this))
            .fail(this.rejected.bind(this));
    }
};
AuthController.server = function (url, data) {
    return $.ajax = ({
        url: url,
        data: data
    });
}

AuthController.accepted = function () {
    this.showDialog("Success", "Authenticated!")
};

AuthController.rejected = function (err) {
    this.failure("Auth Failed: " + err);
}

AuthController.checkAuth()

var controller1 = Object.create(AuthController)
var controller2 = Object.create(AuthController)
/* 总结：我们用一种（极其）简单的设计实现了同样的功能，这就是对象关联风格代码和行
为委托设计模式的力量 */

/* 匿名函数没有 name 标识符，这会导致：
1. 调试栈更难追踪；
2. 自我引用（递归、事件（解除）绑定，等等）更难；
3. 代码（稍微）更难理解。 */


var Foo = {
    bar() { },
    baz: function baz() { }
}

// 去掉语法糖

var Foo = {
    bar: function () { },
    baz: function baz() { }
}
/* 使用简洁方法时一定要小心这一点。如果你需要自我引用的话，那最好使用传统的具名函
数表达式来定义对应的函数（ · baz: function baz() {..} · ），不要使用简洁方法。 */
var Foo = {
    bar: function (x) {
        if (x < 10) {
            return Foo.bar(x * 2)
        }
        return x;
    },
    baz: function baz(x) {
        if (x < 10) {
            return baz(x * 2);
        }
        return x;
    }
}
/* 内省就是检查实例的类型。类实例的内省主要目的是通过创建方式来判断对象的结构
和功能。 */
var Foo = { /* .. */ };
var Bar = Object.create(Foo);
var b1 = Object.create(Bar);
/* 使用对象关联时，所有的对象都是通过[[Prototype]] 委托互相关联，下面是内省的方法，
非常简单： */
// 让 Foo 和 Bar 互相关联
Foo.isPrototypeOf(Bar); // true 
Object.getPrototypeOf(Bar) === Foo; // true 
// 让 b1 关联到 Foo 和 Bar 
Foo.isPrototypeOf(b1); // true 
Bar.isPrototypeOf(b1); // true 
Object.getPrototypeOf(b1) === Bar; // true

/* 当你只用对象来设计代码时，不仅可以让语法更加简洁，而且可以让代码结构更加清晰。
对象关联（对象之前互相关联）是一种编码风格，它倡导的是直接创建和关联对象，不把
它们抽象成类。对象关联可以用基于[[Prototype]] 的行为委托非常自然地实现。 */