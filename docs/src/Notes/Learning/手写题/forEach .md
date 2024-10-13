### 手写实现 `forEach`
`forEach` 的实现原理就是一个 `for` 循环，用于遍历数组的每一个元素.

```javascript
Array.prototype.myForEach = function(callback, thisArg) {
  // 确保 callback 是函数
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  // 遍历数组元素
  for (let i = 0; i < this.length; i++) {
    if (this.hasOwnProperty(i)) {
      callback.call(thisArg, this[i], i, this);
    }
  }
};

// 测试
const arr = [1, 2, 3, 4, 5];
arr.myForEach((element) => {
  console.log(element);
});
// 输出: 1 2 3 4 5
```
# `forEach` 方法的功能
`forEach` 方法会对数组的每个元素按顺序执行提供的函数一次。这个方法不会改变原数组，且它没有返回值（即返回 `undefined`）。

## `forEach` 的使用示例

1. **遍历数组并打印每个元素**:
   ```javascript
   const arr = [1, 2, 3, 4, 5];
   arr.forEach((element) => {
     console.log(element);
   });
   // 输出: 1 2 3 4 5
   ```

2. **计算数组元素的总和**:
   ```javascript
   const arr = [1, 2, 3, 4, 5];
   let sum = 0;
   arr.forEach((element) => {
     sum += element;
   });
   console.log(sum); // 输出: 15
   ```

3. **使用索引**:
   ```javascript
   const arr = ['a', 'b', 'c'];
   arr.forEach((element, index) => {
     console.log(`Element at index ${index} is ${element}`);
   });
   // 输出:
   // Element at index 0 is a
   // Element at index 1 is b
   // Element at index 2 is c
   ```

### `forEach` 的特点

- **不改变原数组**: `forEach` 只会执行函数，对数组元素进行操作，但不会改变原数组。
- **没有返回值**: 它不会返回任何东西，只是执行 `callback` 函数。
- **无法中途停止**: `forEach` 不能像 `for` 循环那样使用 `break` 语句跳出循环。如果你需要中途停止遍历，应该使用 `some`、`every` 或 `for` 循环。

### `forEach` 与其他遍历方法的对比

- **`map`**: `map` 与 `forEach` 类似，但 `map` 会创建并返回一个新的数组，而 `forEach` 不会返回任何值。
- **`for` 循环**: `for` 循环可以通过 `break` 语句中断循环，而 `forEach` 不行。