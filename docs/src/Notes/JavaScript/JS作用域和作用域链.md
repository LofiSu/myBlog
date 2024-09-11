在 JavaScript 中，**作用域**和**作用域链**是理解变量访问和代码执行的重要概念。它们决定了在代码的不同部分，变量和函数的可见性和生命周期。

- **作用域**决定了变量和函数在代码中的可访问性。
  - 全局作用域：变量在整个程序中可见。
  - 函数作用域：变量仅在函数内部可见。
  - 块级作用域：变量仅在特定的代码块内部可见。
  
- **作用域链**则描述了在嵌套作用域中如何查找变量。它从当前作用域开始，逐级向外查找，直到找到目标变量或达到全局作用域。


### 1. 作用域（Scope）

**作用域**是指程序中定义变量的区域，作用域规定了哪些变量可以在代码的哪些部分被访问。

#### 分类：
- **全局作用域**：在代码的任何地方都能访问的变量。任何在函数或块外部声明的变量都属于全局作用域。它们在整个程序生命周期内存在。

- **函数作用域**：在函数内部声明的变量只能在函数内部访问，函数作用域也被称为局部作用域。这意味着函数内部声明的变量对函数外部是不可见的。

- **块级作用域**：使用 `let` 或 `const` 关键字在块（例如 `if` 语句、`for` 循环）内部声明的变量，只在该块内可见。这是 ES6 引入的新特性，弥补了 `var` 关键字没有块级作用域的问题。

#### 例子：
```javascript
var globalVar = "I am global"; // 全局作用域

function exampleFunction() {
    var functionVar = "I am local"; // 函数作用域
    console.log(globalVar); // 可以访问全局变量
    console.log(functionVar); // 可以访问局部变量
}

exampleFunction();

console.log(functionVar); // 报错：functionVar 在全局作用域中不可见
```

### 2. 作用域链（Scope Chain）

**作用域链**是指在嵌套的作用域中，变量的查找规则。作用域链确保了 JavaScript 引擎在执行代码时，能正确地找到变量的值。

#### 原理：
- 当访问一个变量时，JavaScript 引擎会首先在当前作用域中查找该变量。
- 如果在当前作用域中找不到该变量，JavaScript 引擎会沿着作用域链向上一级作用域查找，直到找到该变量或到达全局作用域。
- 如果在全局作用域中仍然找不到该变量，JavaScript 会抛出一个 `ReferenceError` 错误。

#### 例子：
```javascript
var globalVar = "Global";

function outerFunction() {
    var outerVar = "Outer";

    function innerFunction() {
        var innerVar = "Inner";
        console.log(innerVar); // 输出 "Inner"
        console.log(outerVar); // 输出 "Outer" - 从外层作用域查找
        console.log(globalVar); // 输出 "Global" - 从全局作用域查找
    }

    innerFunction();
}

outerFunction();
```

在这个例子中，当 `innerFunction` 被调用时，它首先在自己的作用域中查找 `innerVar`，然后沿着作用域链查找 `outerVar` 和 `globalVar`。

