`Promise` 是 JavaScript 中用于处理异步操作的构造函数。`Promise` 原型链上的方法主要用于处理 Promise 对象的状态和结果。以下是 `Promise` 原型链上的主要方法及它们的详细描述：

### `Promise.prototype.then`
- **用途：** `then` 方法用于在 Promise 成功 (`fulfilled`) 时执行某个回调函数，并返回一个新的 Promise。
- **语法：**
  ```javascript
  promise.then(onFulfilled, onRejected)
  ```
- **参数：**
  - `onFulfilled`：当 Promise 变为成功状态时调用的函数。
  - `onRejected`：当 Promise 变为失败状态时调用的函数。
- **返回值：** 一个新的 Promise，可以用于链式调用。

### `Promise.prototype.catch`
- **用途：** `catch` 方法用于在 Promise 失败 (`rejected`) 时执行某个回调函数。
- **语法：**
  ```javascript
  promise.catch(onRejected)
  ```
- **参数：**
  - `onRejected`：当 Promise 被拒绝时调用的函数。
- **返回值：** 一个新的 Promise，可以用于链式调用。

### `Promise.prototype.finally`
- **用途：** `finally` 方法在 Promise 结束（无论是成功还是失败）时都会执行某个回调函数。与 `then` 和 `catch` 不同，它不会接收 Promise 的结果。
- **语法：**
  ```javascript
  promise.finally(onFinally)
  ```
- **参数：**
  - `onFinally`：当 Promise 结束时调用的函数。
- **返回值：** 一个新的 Promise，继续保持之前的状态和结果。

### `Promise.resolve`
- **用途：** `resolve` 方法返回一个已经成功的 Promise 对象，并将给定的值传递给 `then` 方法的成功回调函数。
- **语法：**
  ```javascript
  Promise.resolve(value)
  ```
- **参数：**
  - `value`：要作为成功值的值。如果这个值是一个 Promise，那么 `resolve` 会等待这个 Promise 完成并采用其状态。
- **返回值：** 一个成功状态的 Promise。

### `Promise.reject`
- **用途：** `reject` 方法返回一个已经失败的 Promise 对象，并将给定的原因传递给 `then` 或 `catch` 方法的失败回调函数。
- **语法：**
  ```javascript
  Promise.reject(reason)
  ```
- **参数：**
  - `reason`：Promise 失败的原因。
- **返回值：** 一个失败状态的 Promise。

### `Promise.all`
- **用途：** `all` 方法用于并行执行多个 Promise，并在所有 Promise 都成功时返回一个新的 Promise。这个新的 Promise 的值是一个包含所有输入 Promise 结果的数组。如果任意一个 Promise 失败，那么 `Promise.all` 返回的 Promise 也会失败，并且其失败原因是第一个失败的 Promise 的原因。
- **语法：**
  ```javascript
  Promise.all(iterable)
  ```
- **参数：**
  - `iterable`：一个可迭代对象，如数组，包含多个 Promise。
- **返回值：** 一个新的 Promise。这个 Promise 在所有输入的 Promise 成功时返回一个包含它们结果的数组；如果有任何一个 Promise 失败，则返回该失败原因。
- **示例：**
  ```javascript
  Promise.all([promise1, promise2, promise3])
    .then((values) => {
      console.log(values); // [result1, result2, result3]
    })
    .catch((error) => {
      console.error(error); // 任意一个 promise 失败时的错误
    });
  ```

### `Promise.race`
- **用途：** `race` 方法用于并行执行多个 Promise，并在第一个 Promise 完成（无论是成功还是失败）时返回一个新的 Promise。这个新的 Promise 的结果是第一个完成的 Promise 的结果或失败原因。
- **语法：**
  ```javascript
  Promise.race(iterable)
  ```
- **参数：**
  - `iterable`：一个可迭代对象，如数组，包含多个 Promise。
- **返回值：** 一个新的 Promise。这个 Promise 的结果是第一个完成的 Promise 的结果或失败原因。
- **示例：**
  ```javascript
  Promise.race([promise1, promise2, promise3])
    .then((value) => {
      console.log(value); // 第一个完成的 promise 的结果
    })
    .catch((error) => {
      console.error(error); // 第一个完成的 promise 的错误
    });
  ```

### `Promise.allSettled`
- **用途：** `allSettled` 方法用于并行执行多个 Promise，并在所有 Promise 都已完成（无论是成功还是失败）时返回一个新的 Promise。这个新的 Promise 的值是一个数组，包含每个输入 Promise 的状态和结果（或失败原因）。
- **语法：**
  ```javascript
  Promise.allSettled(iterable)
  ```
- **参数：**
  - `iterable`：一个可迭代对象，如数组，包含多个 Promise。
- **返回值：** 一个新的 Promise。这个 Promise 在所有输入的 Promise 都已完成时返回一个包含每个 Promise 状态的数组。
- **示例：**
  ```javascript
  Promise.allSettled([promise1, promise2, promise3])
    .then((results) => {
      results.forEach((result) => console.log(result.status));
    });
  ```

### `Promise.any`
- **用途：** `any` 方法用于并行执行多个 Promise，并在任意一个 Promise 成功时返回一个新的 Promise。这个新的 Promise 的值是第一个成功的 Promise 的结果。如果所有 Promise 都失败，则返回一个包含所有失败原因的错误对象。
- **语法：**
  ```javascript
  Promise.any(iterable)
  ```
- **参数：**
  - `iterable`：一个可迭代对象，如数组，包含多个 Promise。
- **返回值：** 一个新的 Promise。这个 Promise 在任意一个输入的 Promise 成功时返回成功值；如果所有 Promise 都失败，则返回一个包含所有失败原因的错误。
- **示例：**
  ```javascript
  Promise.any([promise1, promise2, promise3])
    .then((value) => {
      console.log(value); // 第一个成功的 promise 的结果
    })
    .catch((error) => {
      console.error(error); // 所有 promise 都失败时的错误
    });
  ```

这些是 `Promise` 原型链上最常用的方法。`Promise.race` 和 `Promise.all` 特别有用，用于并行处理多个异步操作，并根据具体需求选择等待所有完成或只是第一个完成的结果。


### Promise 是什么？

`Promise` 是 JavaScript 中的一种用于处理异步操作的对象。它代表了一个尚未完成但即将完成的操作，并允许你在操作成功（resolved）或失败（rejected）时执行相应的回调函数。

**Promise 的三个状态**：

1. **pending**（进行中）：初始状态，尚未完成或失败。
2. **fulfilled**（已成功）：操作成功完成。
3. **rejected**（已失败）：操作失败。

`Promise` 的状态只能改变一次，并且一旦改变，就不会再改变。

### 为什么有 Promise？

在 JavaScript 早期，处理异步操作通常使用回调函数（callback），这会导致“回调地狱”问题，即嵌套过多的回调函数使代码难以阅读和维护。`Promise` 提供了一种更清晰、更直观的方式来处理异步操作，避免了回调地狱。

### Promise 解决了什么问题？

- **回调地狱**：通过链式调用 `then` 和 `catch` 方法，使代码更加线性和可读。
- **错误处理**：`Promise` 提供了统一的错误处理机制，通过 `catch` 方法捕获异步操作中的错误。
- **组合异步操作**：`Promise` 提供了一些方法来组合多个异步操作，如 `Promise.all` 和 `Promise.race`。

### Promise 怎么解决这些问题？

- **链式调用**：`Promise` 允许你将一系列异步操作链接起来，使得代码更加线性和可读。
- **统一的错误处理**：通过 `catch` 方法，你可以在一个地方处理所有的错误，而不是在每个回调中处理。
- **组合操作**：`Promise` 提供了方法来并行执行多个异步操作，并在所有操作完成后执行下一步。

### Promise 的 API

以下是 `Promise` 的一些主要 API：

1. **创建 Promise**:

   ```javascript
   let promise = new Promise((resolve, reject) => {
     // 异步操作
     if (成功) {
       resolve(value);
     } else {
       reject(error);
     }
   });
   ```

2. **then**:

   ```javascript
   promise.then(value => {
     // 成功的回调
   }).catch(error => {
     // 失败的回调
   });
   ```

3. **catch**:

   ```javascript
   promise.catch(error => {
     // 失败的回调
   });
   ```

4. **finally**:

   ```javascript
   promise.finally(() => {
     // 无论成功还是失败都会执行
   });
   ```

5. **Promise.all**:

   ```javascript
   Promise.all([promise1, promise2, promise3]).then(values => {
     // 所有 Promise 都成功
   }).catch(error => {
     // 任一 Promise 失败
   });
   ```

6. **Promise.race**:

   ```javascript
   Promise.race([promise1, promise2, promise3]).then(value => {
     // 最快的 Promise 成功
   }).catch(error => {
     // 最快的 Promise 失败
   });
   ```

### Async/Await 是什么？

`async` 和 `await` 是 JavaScript 中基于 `Promise` 的语法糖，用于简化异步操作的编写和处理，使异步代码看起来更像同步代码。

- **`async`**：声明一个异步函数，该函数返回一个 `Promise` 对象。
- **`await`**：暂停异步函数的执行，等待 `Promise` 返回结果，然后继续执行函数。

### 为什么使用 Async/Await？

`async/await` 提供了一种更简单、直观的方式来处理异步操作，避免了回调地狱和复杂的 `Promise` 链式调用。

- **更简洁的代码**：使异步代码更加直观，类似于同步代码的写法。
- **更好的错误处理**：可以使用 `try/catch` 块来处理异步操作中的错误，使错误处理更加统一和集中。
- **提高可读性和可维护性**：避免嵌套过深的回调函数和复杂的 `Promise` 链式调用，使代码更易读和维护。

### Async/Await 怎么用？

1. **声明异步函数**：

   ```javascript
   async function fetchData() {
     // 函数体
   }
   ```

2. **使用 await**：

   ```javascript
   async function fetchData() {
     const response = await fetch('https://api.example.com/data');
     const data = await response.json();
     console.log(data);
   }
   ```

3. **错误处理**：

   ```javascript
   async function fetchData() {
     try {
       const response = await fetch('https://api.example.com/data');
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
       const data = await response.json();
       console.log(data);
     } catch (error) {
       console.error('Fetch error:', error);
     }
   }
   ```

### Async/Await 的陷阱

1. **顺序执行导致性能问题**：

   ```javascript
   async function fetchData() {
     const a = await fetch('https://api.example.com/data1');
     const b = await fetch('https://api.example.com/data2');
     // 这里 a 和 b 是顺序执行的
   }
   fetchData();
   ```

   解决方案：并行执行 `Promise.all`。

   ```javascript
   async function fetchData() {
     const promiseA = fetch('https://api.example.com/data1');
     const promiseB = fetch('https://api.example.com/data2');
     const [a, b] = await Promise.all([promiseA, promiseB]);
   }
   fetchData();
   ```

2. **循环中的 await**：

   ```javascript
   async function processItems(items) {
     items.forEach(async (item) => {
       await processItem(item);
     });
   }
   // 这里的 processItem 并不会按顺序执行
   processItems([1, 2, 3]);
   ```

   解决方案：使用 `for...of` 循环。

   ```javascript
   async function processItems(items) {
     for (const item of items) {
       await processItem(item);
     }
   }
   processItems([1, 2, 3]);
   ```

3. **忽略错误处理**：

   ```javascript
   async function fetchData() {
     const response = await fetch('https://api.example.com/data');
     const data = await response.json();
     console.log(data);
   }
   fetchData();
   // 如果 fetch 或 json() 失败，错误不会被捕获
   ```

   解决方案：使用 `try/catch` 块。

   ```javascript
   async function fetchData() {
     try {
       const response = await fetch('https://api.example.com/data');
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
       const data = await response.json();
       console.log(data);
     } catch (error) {
       console.error('Fetch error:', error);
     }
   }
   fetchData();
   ```

### 总结

`Promise` 和 `async/await` 是 JavaScript 中处理异步操作的重要工具。`Promise` 通过链式调用、统一的错误处理和组合操作等机制，解决了回调地狱和异步操作复杂性的问题。`async/await` 进一步简化了异步操作的编写，使代码更加直观、易读和可维护。通过了解和使用这些工具，你可以更高效地处理 JavaScript 中的异步操作。

可以看一下这个：【20分钟学会ES6之异步处理 Promise&Async 前端新手最头疼的技能之一】 <https://www.bilibili.com/video/BV1cX4y1b7vc/?share_source=copy_web&vd_source=c5bef71b25a059b9bd7e915280d9f6fc>
