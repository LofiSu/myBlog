---
updateTime: "2024-10-13 13:30"
desc: "every"
tags: "Array"
outline: deep
---

`every` 是 JavaScript 中数组的一个方法，用于测试数组中的所有元素是否都满足给定的条件。与 `some` 方法不同，`every` 需要数组中的每个元素都满足测试条件，才能返回 `true`；否则，返回 `false`。

### `every` 方法的功能

`every` 方法用于检查数组中的每一个元素是否都符合特定条件。它会遍历数组中的所有元素，只要有一个元素不满足条件，`every` 就会返回 `false`；如果所有元素都符合条件，`every` 返回 `true`。

### `every` 方法的语法

```javascript
array.every(callback(currentValue, index, array), thisArg);
```

- `callback`: 用于测试每个元素的函数。它接受四个参数：
  - `currentValue`: 当前正在处理的数组元素。
  - `index`（可选）: 当前元素的索引。
  - `array`（可选）: 调用 `every` 的数组本身。
- `thisArg`（可选）: 执行 `callback` 时用作 `this` 的值。

### `every` 的使用示例

1. **检查数组中是否所有元素都是正数**:
   ```javascript
   const numbers = [1, 5, 8, 12];
   const allPositive = numbers.every((number) => number > 0);
   console.log(allPositive); // 输出: true
   ```

2. **检查数组中所有字符串的长度是否大于 3**:
   ```javascript
   const words = ['apple', 'banana', 'cherry'];
   const allLongerThanThree = words.every((word) => word.length > 3);
   console.log(allLongerThanThree); // 输出: true
   ```

3. **检查数组中是否所有元素都是布尔值**:
   ```javascript
   const bools = [true, false, true];
   const allBooleans = bools.every((value) => typeof value === 'boolean');
   console.log(allBooleans); // 输出: true
   ```

4. **检查数组中是否所有元素都是非空字符串**:
   ```javascript
   const strings = ['hello', 'world', 'foo', 'bar'];
   const allNonEmpty = strings.every((str) => str.trim() !== '');
   console.log(allNonEmpty); // 输出: true
   ```

### `every` 的特点

- **返回布尔值**: `every` 返回一个布尔值 `true` 或 `false`，指示是否所有元素都满足条件。
- **短路行为**: 一旦找到第一个不满足条件的元素，`every` 会停止遍历剩余的元素并返回 `false`。
- **不修改原数组**: `every` 不会修改原始数组，它只对数组进行检查。

### `every` 与其他数组方法的对比

- **`some`**: `some` 方法测试数组中是否有至少一个元素满足条件，而 `every` 测试是否所有元素都满足条件。
- **`filter`**: `filter` 方法返回一个新数组，包含所有满足条件的元素，而 `every` 返回一个布尔值。
- **`map`**: `map` 方法用于对数组中的每个元素执行操作并返回新数组，而 `every` 用于验证条件是否对所有元素都成立。

### 手写实现 `every`

下面是 `every` 方法的一个简化版实现：

```javascript
Array.prototype.myEvery = function(callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  for (let i = 0; i < this.length; i++) {
    if (this.hasOwnProperty(i)) {
      if (!callback.call(thisArg, this[i], i, this)) {
        return false;
      }
    }
  }
  
  return true;
};

// 测试
const numbers = [1, 5, 8, 12];
const allPositive = numbers.myEvery((number) => number > 0);
console.log(allPositive); // 输出: true
```

### 总结

`every` 是一个非常实用的数组方法，适用于需要检查数组中所有元素是否都符合特定条件的场景。它可以用于验证数据的一致性和完整性，确保所有元素都满足特定标准。理解 `every` 的工作原理和实际应用可以帮助你在开发中处理数据时进行有效的条件验证。