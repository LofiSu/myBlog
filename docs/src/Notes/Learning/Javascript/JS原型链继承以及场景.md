JavaScript 是基于原型的语言，Prototype 和 Prototype Chain 是实现继承的一种机制。每个 JavaScript 对象在创建时均关联原型对象，它们均有一个内置属性，通过 ES5 `__proto__` 或 ES6 `Object.getPrototypeOf` 获得。原型链是对象通过其原型与其他对象相关联的链，当你访问一个对象的属性或方法时，若在对象本身没有找到，则继续在该对象的原型上查找，若原型上也没有，则继续在原型的原型上查找，直到找到该属性或方法或到达原型链的末端，原型链的末端是 `Object.prototype`，若在原型链的任何地方找不到指定的属性或方法，则返回 `undefined`。


## 什么是原型和原型链
在 JavaScript 中，每个对象都有一个原型对象，原型对象也是一个普通的对象，它有一个 constructor 属性指向创建它的构造函数，它也有一个原型对象，这样就构成了一个原型链。在 `JS` 中，面向对象的实现是基于原型的，而不是基于类的。就算 ES6 中引入了 `class` 关键字，但是它只是语法糖，本质上还是基于原型的。


题目：
https://juejin.cn/post/6959043611161952269#heading-59

```javascript
//这是一个构造函数
function Animals(name){
    this.name=name;
    
}
//在构造函数的原型上添加属性和方法
Animals.prototype.sleep=function(){
 console.log(`${this.name} is sleeping`);
}
//创建对象
const dog=new Animals(Bob);

//定义子类构造函数
function Cat(name,age){
 Animals.call(this.name);
 this.age=age;
}
//设置子类的原型为父类的实例，实现继承
Cat.prototype=Object.create(Animals.prototype);
Cat.prototype.constructor=Cat;

//在子类上面添加方法
Cat.prototype.miao=function(){
console.log(`${this.name}miaomiao`)

//创建子类实例
const huahua=new Cat(`huahua`,1);
const kitty=new Cat(`kitty`,2);

//调用继承的方法和子类自己的方法
huahua.miao();
kitty.sleep();
}
```

>这是一个构造函数，在构造函数的原型上添加属性和方法，然后创建对象,这里的prototype属性就是对象的原型。


>他们的关系是这样的:构造函数通过new关键字创建对象，对象通过 _ _ proto _ _ 属性或者`Object.getPrototypeOf`方法指向它的的原型。


>原型中有所有对象公用的属性和方法。原型只能通过构造函数来创建对象。构造函数也可以通过prototype属性指向原型。他们共同定义了class类。

>在js中,原型可以看做对象的本体，他通过构造函数这个模版工具来创建对象。**每个对象都有原型,每个原型都有与之对应的构造函数**。


>原型也有自己的proto属性，它指向object原型，他的proto指向为空null，到此为止一个基础的原型链就形成了，如果一个类继承另一个类，子类的原型会指向父类的原型。原型链长度增加，只有原型才可以继承，对象可以使用原型链上游的所有属性和方法


![[Pasted image 20240805175527.png]]
原型链继承的优势和不足：

1. 优势：
- 实现简单，只需要修改原型对象就行
- 能实现基于原型的方法共享，提高内存利用率
- 符合js面向对象风格易于理解
2. 不足：
- 继承层次过多时，性能受到影响
- 原型链继承导致对象之间引用关系复杂，不利于调试


### ES6类继承
```Javascript
// 定义父类
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

// 定义子类并继承父类
class Dog extends Animal {
    constructor(name, breed) {
        super(name);  // 调用父类的构造函数
        this.breed = breed;
    }

    bark() {
        console.log(`${this.name} barks.`);
    }
}

// 创建子类实例
const dog1 = new Dog('Rex', 'Golden Retriever');
const dog2 = new Dog('Buddy', 'Beagle');

// 调用继承的方法和子类自己的方法
dog1.speak(); // Rex makes a noise.
dog1.bark();  // Rex barks.

dog2.speak(); // Buddy makes a noise.
dog2.bark();  // Buddy barks.
```

### 应用场景：
- 面向对象编程OOP，比如写一个宠物管理系统要定义不同类型的宠物
```javascript
function Pet(name, age) {
    this.name = name;
    this.age = age;
}

Pet.prototype.info = function() {
    return `${this.name} is ${this.age} years old.`;
};

function Dog(name, age, breed) {
    Pet.call(this, name, age);
    this.breed = breed;
}

Dog.prototype = Object.create(Pet.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
    return `${this.name} barks!`;
};

const myDog = new Dog('Buddy', 3, 'Beagle');
console.log(myDog.info()); // Buddy is 3 years old.
console.log(myDog.bark()); // Buddy barks!

```

- 代码复用，开发绘图应用，要定义不同类型的图形，可能有共同绘制方法
```javascript
function Shape() {}

Shape.prototype.draw = function() {
    console.log('Drawing a shape');
};

function Circle(radius) {
    this.radius = radius;
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.draw = function() {
    console.log('Drawing a circle with radius ' + this.radius);
};

const myCircle = new Circle(5);
myCircle.draw(); // Drawing a circle with radius 5
```
-  组件库开发，开发按钮组件库
```javascript
function Button(label) {
    this.label = label;
}

Button.prototype.click = function() {
    console.log(`${this.label} button clicked`);
};

function IconButton(label, icon) {
    Button.call(this, label);
    this.icon = icon;
}

IconButton.prototype = Object.create(Button.prototype);
IconButton.prototype.constructor = IconButton;

IconButton.prototype.click = function() {
    console.log(`${this.icon} icon button clicked`);
};

const myButton = new Button('Submit');
myButton.click(); // Submit button clicked

const myIconButton = new IconButton('Upload', '📁');
myIconButton.click(); // 📁 icon button clicked
```
-  数据模型
```javascript
function User(name, email) {
    this.name = name;
    this.email = email;
}

User.prototype.displayInfo = function() {
    return `User: ${this.name}, Email: ${this.email}`;
};

function Admin(name, email, role) {
    User.call(this, name, email);
    this.role = role;
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

Admin.prototype.displayInfo = function() {
    return `Admin: ${this.name}, Email: ${this.email}, Role: ${this.role}`;
};

const user = new User('Alice', 'alice@example.com');
console.log(user.displayInfo()); // User: Alice, Email: alice@example.com

const admin = new Admin('Bob', 'bob@example.com', 'SuperAdmin');
console.log(admin.displayInfo()); // Admin: Bob, Email: bob@example.com, Role: SuperAdmin

```
-  插件开发和库开发，比如开发一个属性库让他支持更多属性运算
```javascript
function MathLib() {}

MathLib.prototype.add = function(a, b) {
    return a + b;
};

function AdvancedMathLib() {
    MathLib.call(this);
}

AdvancedMathLib.prototype = Object.create(MathLib.prototype);
AdvancedMathLib.prototype.constructor = AdvancedMathLib;

AdvancedMathLib.prototype.multiply = function(a, b) {
    return a * b;
};

const math = new AdvancedMathLib();
console.log(math.add(2, 3)); // 5
console.log(math.multiply(2, 3)); // 6

```