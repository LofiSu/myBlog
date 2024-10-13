### 什么是原型？

在 JavaScript 中，每个对象都有一个原型对象，这个原型对象可以为其他对象提供属性和方法。原型对象类似于 Java 中的接口，所有对象都可以使用原型对象上的属性和方法。

```javascript
let cat = {
    name: "miaomiao"
};
cat.__proto__.eat = function() {
    console.log("吃鱼");
};
cat.eat(); // 输出：吃鱼
```

在 JavaScript 中，获取原型的方法有两种：

1. 通过对象的 `__proto__` 属性获取。
2. 通过构造函数的 `prototype` 属性获取。

### 原型的作用

原型的一个重要作用是扩展对象的属性和方法。例如，扩展 `Date` 对象的方法，使其能够输出自定义格式的日期。

```javascript
let date = new Date();
console.log(date); // 默认输出格式

Date.prototype.format = function() {
    let year = this.getFullYear();
    let month = this.getMonth() + 1;
    let date = this.getDate();
    return `${year}年${month}月${date}日`;
};
console.log(date.format()); // 输出：2024年5月15日
```

### 原型链与原型继承

原型链是一种对象属性和方法的继承机制。对象可以通过其原型找到父对象的方法和属性，并且这一过程可以一直追溯到顶层的 `Object` 对象。

```javascript
class Cat {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

Cat.prototype.eat = function() {
    console.log("吃鱼");
};

let cat2 = new Cat("miao", 2);
cat2.eat(); // 输出：吃鱼
```

通过原型链的继承，一个对象可以访问其父对象或更高级别原型链上的属性和方法：

```javascript
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    login() {
        console.log("登录");
    }
}

function Admin() {
    this.deletePerson = function() {
        console.log("删除");
    };
}

Admin.prototype = new User();
let admin = new Admin();
admin.login(); // 输出：登录
```

在这个例子中，`Admin` 对象没有 `login` 方法，但它通过原型链从 `User` 对象继承了这个方法。