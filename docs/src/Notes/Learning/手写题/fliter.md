---
updateTime: "2024-10-13 13:30"
desc: "filter"
tags: "Array"
outline: deep
---

# `filter` 的实现原理

`filter` 的实现实际上是一个遍历数组的过程，在遍历时根据条件判断是否将元素加入到新的数组中。

### 手写实现 `filter`

```javascript
Array.prototype.myFilter = function(callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const result = [];
  
  for (let i = 0; i < this.length; i++) {
    if (this.hasOwnProperty(i)) {
      if (callback.call(thisArg, this[i], i, this)) {
        result.push(this[i]);
      }
    }
  }
  
  return result;
};

// 测试
const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = numbers.myFilter((number) => number % 2 === 0);
console.log(evenNumbers); // 输出: [2, 4, 6]
```

### `filter` 的使用示例
`filter` 方法用于筛选元素。
会遍历数组中的每个元素，并对每个元素应用一个回调函数。回调函数返回 `true` 的元素会被保留在新数组中，而返回 `false` 的元素则会被过滤掉。
与 `forEach` 不同的是，`filter` 会返回一个新的数组，而不是对原数组进行修改。

1. **筛选出数组中的偶数**:
   ```javascript
   const numbers = [1, 2, 3, 4, 5, 6];
   const evenNumbers = numbers.filter((number) => number % 2 === 0);
   console.log(evenNumbers); // 输出: [2, 4, 6]
   ```

2. **筛选出字符串数组中长度大于3的字符串**:
   ```javascript
   const words = ['cat', 'dog', 'elephant', 'rat', 'bat'];
   const longWords = words.filter((word) => word.length > 3);
   console.log(longWords); // 输出: ['elephant']
   ```

3. **从对象数组中筛选符合条件的对象**:
   ```javascript
   const people = [
     { name: 'John', age: 25 },
     { name: 'Jane', age: 20 },
     { name: 'Jim', age: 30 },
   ];
   const adults = people.filter((person) => person.age >= 21);
   console.log(adults); 
   // 输出: [{ name: 'John', age: 25 }, { name: 'Jim', age: 30 }]
   ```

### `filter` 的特点

- **不改变原数组**: `filter` 不会修改原数组，而是返回一个新的数组。
- **返回值**: 返回一个新的数组，包含所有通过测试的元素。如果没有任何元素通过测试，则返回一个空数组。
- **不会跳过空位**: `filter` 不会跳过数组中的空位。对于每个空位，`callback` 会返回 `undefined`，因此空位不会出现在结果数组中。

### `filter` 与其他数组方法的对比

- **`map`**: `map` 返回一个新数组，包含对原数组每个元素应用回调函数后的结果，而 `filter` 只返回通过回调函数测试的元素。
- **`forEach`**: `forEach` 只是遍历数组，不返回新数组，不可用于筛选操作。
