### **Var、Let、Const 的区别**

在 JavaScript 中，`var`、`let`、`const` 是三种声明变量的方式。它们之间的区别主要体现在以下几个方面：

1. **变量提升**
   - `var` 声明的变量存在变量提升，即变量可以在声明之前调用，值为 `undefined`。
   - `let` 和 `const` 不存在变量提升，即它们所声明的变量必须在声明后使用，否则会报错。

   ```js
   // var
   console.log(a);  // undefined
   var a = 10;

   // let
   console.log(b);  // Cannot access 'b' before initialization
   let b = 10;

   // const
   console.log(c);  // Cannot access 'c' before initialization
   const c = 10;
   ```

2. **暂时性死区**
   - `var` 不存在暂时性死区。
   - `let` 和 `const` 存在暂时性死区，只有在声明变量的那一行代码执行后，才可以获取和使用该变量。

   ```js
   // var
   console.log(a);  // undefined
   var a = 10;

   // let
   console.log(b);  // Cannot access 'b' before initialization
   let b = 10;

   // const
   console.log(c);  // Cannot access 'c' before initialization
   const c = 10;
   ```

3. **块级作用域**
   - `var` 不存在块级作用域，声明的变量会提升到所在函数或全局作用域中。
   - `let` 和 `const` 存在块级作用域，声明的变量仅在块级作用域内有效。

   ```js
   // var
   {
       var a = 20;
   }
   console.log(a);  // 20

   // let
   {
       let b = 20;
   }
   console.log(b);  // Uncaught ReferenceError: b is not defined

   // const
   {
       const c = 20;
   }
   console.log(c);  // Uncaught ReferenceError: c is not defined
   ```

4. **重复声明**
   - `var` 允许在同一作用域内重复声明变量。
   - `let` 和 `const` 在同一作用域内不允许重复声明变量。

   ```js
   // var
   var a = 10;
   var a = 20; // 20

   // let
   let b = 10;
   let b = 20; // Identifier 'b' has already been declared

   // const
   const c = 10;
   const c = 20; // Identifier 'c' has already been declared
   ```

5. **修改声明的变量**
   - `var` 和 `let` 声明的变量可以修改。
   - `const` 声明的是一个只读的常量，一旦声明，其值就不能改变。

   ```js
   // var
   var a = 10;
   a = 20;
   console.log(a);  // 20

   // let
   let b = 10;
   b = 20;
   console.log(b);  // 20

   // const
   const c = 10;
   c = 20;
   console.log(c); // Uncaught TypeError: Assignment to constant variable
   ```

### **Var**
- 在 ES5 中，顶层对象的属性和全局变量是等价的，用 `var` 声明的变量既是全局的也是顶层的。在浏览器环境中，顶层对象指的是 `window` 对象，在 Node 环境中指的是 `global` 对象。

   ```js
   var a = 10;
   console.log(window.a); // 10
   ```

- **变量提升**：使用 `var` 声明的变量存在变量提升。

   ```js
   console.log(a); // undefined
   var a = 20;

   // 编译阶段，编译器会将其变成以下执行：
   var a;
   console.log(a);
   a = 20;
   ```

- **重复声明**：使用 `var`，我们能对一个变量多次声明，后面声明的变量会覆盖前面的变量声明。

   ```js
   var a = 20;
   var a = 30;
   console.log(a); // 30
   ```

- **函数作用域**：在函数中使用 `var` 声明变量时，该变量是局部的。

   ```js
   var a = 20;
   function change(){
     var a = 30;
   }
   change();
   console.log(a); // 20
   ```

- **全局污染**：如果在函数中不使用 `var`，该变量是全局的。

   ```js
   var a = 20;
   function change(){
       a = 30;
   }
   change();
   console.log(a); // 30
   ```

### **Let**
- `let` 是 ES6 新增的，所声明的变量只在 `let` 命令所在的代码块有效。

   ```js
   {
       let a = 20;
   }
   console.log(a); // ReferenceError: a is not defined
   ```

- **不存在变量提升**：使用 `let` 声明的变量不会提升，声明前使用会抛出 `ReferenceError`。

   ```js
   console.log(a); // ReferenceError
   let a = 2;
   ```

- **暂时性死区**：使用 `let` 声明变量之前，该变量都不可用。

   ```js
   var a = 123;
   if(true){
       a = 'abc'; // ReferenceError
       let a;
   }
   ```

- **不允许重复声明**：`let` 不允许在相同作用域中重复声明。

   ```js
   let a = 20;
   let a = 30; // Uncaught SyntaxError: Identifier 'a' has already been declared
   ```

### **Const**
- `const` 声明一个只读的常量，一旦声明，常量的值就不能改变。

   ```js
   const a = 1;
   a = 3; // TypeError: Assignment to constant variable.
   ```

- **立即初始化**：`const` 一旦声明变量，就必须立即初始化，不能留到以后赋值。

   ```js
   const a; // SyntaxError: Missing initializer in const declaration
   ```

- **不允许重复声明**：如果之前用 `var` 或 `let` 声明过变量，再用 `const` 声明同样会报错。

   ```js
   var a = 20;
   let b = 20;
   const a = 30; // 报错
   const b = 30; // 报错
   ```

- **指针不可变**：`const` 实际上保证的并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于复杂类型的数据，`const` 只能保证这个指针是固定的，并不能确保变量的结构不变。

   ```js
   const foo = {};
   foo.prop = 123; // 为 foo 添加一个属性，可以成功
   foo = {}; // TypeError: "foo" is read-only
   ```

### **总结**
- 能用 `const` 的情况尽量使用 `const`，其他情况下大多数使用 `let`，避免使用 `var`。