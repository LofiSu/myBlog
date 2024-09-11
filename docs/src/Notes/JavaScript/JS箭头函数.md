箭头函数提供了一种更简洁的语法，同时在 `this` 绑定上与传统函数不同。传统函数的 `this` 由调用者决定，而箭头函数的 `this` 由定义时的环境决定，这使得它在回调函数和内嵌函数中特别有用。

### 什么是箭头函数？

#### 传统函数的定义方式：

```javascript
function fun() {
    return 100;
}

const fun = function() {
    return 100;
};
```

#### 箭头函数的定义方式：

箭头函数使用 `=>` 来表示函数体。如果箭头函数只有一个参数，可以省略参数的括号；如果函数体只有一个返回值，可以省略 `return` 关键字和大括号 `{}`。

```javascript
const fun = () => 100;
console.log(fun()); // 输出：100
```

### 箭头函数与普通函数的区别

#### 1. `this` 指向不同

- **普通函数**：`this` 指向调用该函数的对象。谁调用函数，`this` 就指向谁。
- **箭头函数**：`this` 在定义时绑定，并且指向箭头函数定义时所在的作用域中的 `this`，不会随着调用的对象而改变。

```javascript
let obj = {
    name: "小明",
    age: 2,
    sayName() {
        let self = this;

        setTimeout(function() {
            console.log(this.name); // 输出：undefined，因为此时的 `this` 指向 `window` 对象
            console.log(self.name); // 输出：小明，因为我们使用了 `self` 变量保存了外部的 `this` 引用
        }, 500);

        setTimeout(() => {
            console.log("我是" + this.name); // 输出：我是小明，因为箭头函数内的 `this` 指向 `sayName` 方法的 `this`
        }, 500);
    }
};

obj.sayName();
```

在上面的例子中，`sayName` 方法内部有两个 `setTimeout`，一个是传统的函数表达式，一个是箭头函数。

- 在传统函数表达式中，由于 `this` 指向调用 `setTimeout` 的全局对象（浏览器环境中为 `window`），因此 `this.name` 是未定义的，输出 `undefined`。通过保存外部作用域的 `this` 到 `self` 变量，我们可以正确获取 `name` 属性。
- 在箭头函数中，由于箭头函数继承了 `sayName` 方法的 `this`，因此可以直接输出 `小明`。
