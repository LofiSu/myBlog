- `Promise.all` 接受一个可迭代对象（通常是一个数组）作为参数，里面包含多个 Promise。
- `Promise.all` 返回一个新的 Promise：
  - 如果所有的 Promise 都成功，它会返回一个包含所有成功结果的数组。
  - 如果其中任何一个 Promise 失败，`Promise.all` 会立即以该失败的原因失败。

### 手写 `Promise.all`

```javascript
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    // 用于存储所有 promise 的结果
    const results = [];
    let completedPromises = 0;

    // 遍历每一个 promise
    promises.forEach((promise, index) => {
      // 确保传入的值是一个 Promise
      Promise.resolve(promise)
        .then((result) => {
          // 把结果存入结果数组中
          results[index] = result;
          completedPromises++;

          // 如果所有的 promise 都已经完成
          if (completedPromises === promises.length) {
            resolve(results); // 成功，返回所有的结果
          }
        })
        .catch((error) => {
          reject(error); // 任何一个 promise 失败，立即失败
        });
    });

    // 处理空数组的情况
    if (promises.length === 0) {
      resolve(results);
    }
  });
}
```

### 代码解释

1. **返回一个新的 Promise**：我们需要创建并返回一个新的 Promise。

2. **存储结果**：我们定义一个 `results` 数组来存储每个 Promise 的结果，并且用 `completedPromises` 计数器来跟踪已经成功完成的 Promise 数量。

3. **遍历输入的 promises**：我们遍历传入的 `promises` 数组，对每个 promise 使用 `Promise.resolve` 确保其是一个真正的 Promise。

4. **处理成功**：
   - 如果 Promise 成功，结果会被存储在 `results` 数组中，`completedPromises` 计数器增加。
   - 如果所有的 Promise 都成功执行完毕，调用 `resolve(results)`，将结果数组作为参数传递。

5. **处理失败**：
   - 如果任何一个 Promise 失败，直接调用 `reject(error)` 并终止后续操作。

6. **处理空数组**：
   - 如果传入的 `promises` 是一个空数组，直接调用 `resolve(results)`，返回一个空数组。

### 测试

```javascript
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve) => setTimeout(resolve, 100, 'foo'));

myPromiseAll([promise1, promise2, promise3]).then((values) => {
  console.log(values); // [3, 42, "foo"]
}).catch((error) => {
  console.error(error);
});
```

### 注意

- `Promise.all` 保证结果数组中每个元素的顺序与传入的 promises 顺序相同，即使某些 promises 可能较晚才完成。
- 如果传入 `Promise.all` 的数组为空，则直接返回一个 resolved 的 Promise，并返回空数组。

这个手写的 `myPromiseAll` 函数就实现了 `Promise.all` 的基本功能。

手写 `Promise.all` 的目的是模拟 `Promise.all` 的行为，它会接受一个包含多个 Promise 的数组，并返回一个新的 Promise，这个新的 Promise 在所有传入的 Promise 都成功时才会成功，并且它的结果是一个包含所有成功 Promise 结果的数组。如果有任何一个 Promise 失败，新的 Promise 就会失败，并返回第一个失败的错误。

下面是一个简单的 `Promise.all` 实现示例：

```javascript
function myPromiseAll(promises) {
    // 返回一个新的 Promise
    return new Promise((resolve, reject) => {
        // 用于存储每个 Promise 的结果
        const results = [];
        let completed = 0;

        // 如果传入的是空数组，直接返回一个 resolved 状态的 Promise
        if (promises.length === 0) {
            return resolve(results);
        }

        // 遍历所有 Promise
        promises.forEach((promise, index) => {
            // 确保传入的值是一个 Promise
            Promise.resolve(promise)
                .then(value => {
                    // 存储结果
                    results[index] = value;
                    completed++;

                    // 判断是否所有 Promise 都已经完成
                    if (completed === promises.length) {
                        resolve(results);
                    }
                })
                .catch(error => {
                    // 只要有一个 Promise 失败，就返回失败的 Promise
                    reject(error);
                });
        });
    });
}

// 使用示例
const p1 = Promise.resolve(1);
const p2 = new Promise((resolve, reject) => setTimeout(() => resolve(2), 1000));
const p3 = Promise.resolve(3);

myPromiseAll([p1, p2, p3]).then(results => {
    console.log(results); // [1, 2, 3]
}).catch(error => {
    console.error(error);
});
```

### 解释

1. **返回新 Promise**: `myPromiseAll` 返回一个新的 Promise，这个 Promise 用于跟踪所有传入的 Promises 的状态。

2. **处理空数组**: 如果传入的是空数组，直接用 `resolve([])` 返回一个已经 resolved 的 Promise。

3. **结果存储**: 创建一个 `results` 数组用于存储每个 Promise 的结果，并用 `completed` 变量跟踪已经完成的 Promise 数量。

4. **遍历 Promises**: 遍历传入的 Promises，将每个 Promise 转换为一个 resolved Promise，以确保它们都是 Promise 实例。

5. **处理每个 Promise**: 对于每个 Promise，记录其结果，并检查是否所有 Promises 都已经完成。如果是，调用 `resolve` 返回结果数组；否则，调用 `reject` 返回错误信息。

6. **错误处理**: 如果任何一个 Promise 失败，就立即 `reject` 整个 Promise，并返回失败的原因。

这个实现是 `Promise.all` 的基本版本，适用于大部分常见的情况。