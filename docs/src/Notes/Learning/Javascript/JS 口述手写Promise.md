### Promise 的作用是避免回调地狱

Promise 提供了一种将异步操作的结果（无论是成功还是失败）传递给代码中其他部分的方式。

### Promise 的三个状态

1. **Pending（等待中）**: 初始状态，操作尚未完成。
2. **Fulfilled（已完成）**: 操作成功完成，并返回了一个结果。
3. **Rejected（已拒绝）**: 操作失败，并返回了一个原因（错误）。

### 手写一个简单的 Promise

下面是如何手写一个简单的 Promise：

```javascript
const myPromise = new Promise((resolve, reject) => {
  // 这里写异步操作
  let success = true; // 这是一个模拟结果的变量
  
  if (success) {
    resolve("操作成功"); // 如果操作成功，调用 resolve
  } else {
    reject("操作失败"); // 如果操作失败，调用 reject
  }
});

// 使用这个 Promise
myPromise
  .then((result) => {
    console.log(result); // 打印成功结果
  })
  .catch((error) => {
    console.error(error); // 打印错误信息
  });
```

### 解释代码

- `new Promise((resolve, reject) => { ... })`：Promise 构造函数接受一个执行函数作为参数，该函数有两个参数 `resolve` 和 `reject`，用于分别处理操作的成功和失败。
  
- `resolve("操作成功")`：如果异步操作成功，调用 `resolve`，并传递成功结果。

- `reject("操作失败")`：如果异步操作失败，调用 `reject`，并传递错误信息。

- `.then(result => { ... })`：当 Promise 状态变为 `fulfilled` 时，`.then()` 方法会被调用，`result` 参数会接收 `resolve` 传递的值。

- `.catch(error => { ... })`：当 Promise 状态变为 `rejected` 时，`.catch()` 方法会被调用，`error` 参数会接收 `reject` 传递的值。

