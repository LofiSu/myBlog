### `map` 的实现原理

`map` 的实现是遍历数组中的每个元素，对每个元素执行回调函数，并将回调函数的结果存入一个新数组中
### 手写实现 `map`

```javascript
Array.prototype.myMap = function(callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const result = [];
  
  for (let i = 0; i < this.length; i++) {
    if (this.hasOwnProperty(i)) {
      result.push(callback.call(thisArg, this[i], i, this));
    }
  }
  
  return result;
};

// 测试
const numbers = [1, 2, 3, 4];
const squaredNumbers = numbers.myMap((number) => number * number);
console.log(squaredNumbers); // 输出: [1, 4, 9, 16]
```

### `map` 与其他数组方法的对比

- **`forEach`**: `forEach` 用于遍历数组，它不返回新数组。`map` 则返回一个新数组。
- **`filter`**: `filter` 用于筛选数组元素，返回一个新数组。`map` 是对数组元素进行处理，返回一个新数组。
- **`reduce`**: `reduce` 用于将数组元素归约为单个值，而 `map` 是将数组元素映射为一个新数组。

## `map` 的使用示例

1. **将数字数组中的每个元素平方**:
   ```javascript
   const numbers = [1, 2, 3, 4];
   const squaredNumbers = numbers.map((number) => number * number);
   console.log(squaredNumbers); // 输出: [1, 4, 9, 16]
   ```

2. **将字符串数组中的每个元素转换为大写**:
   ```javascript
   const words = ['hello', 'world'];
   const upperCaseWords = words.map((word) => word.toUpperCase());
   console.log(upperCaseWords); // 输出: ['HELLO', 'WORLD']
   ```

3. **将对象数组中的每个人的名字提取出来**:
   ```javascript
   const people = [
     { name: 'John', age: 25 },
     { name: 'Jane', age: 20 },
     { name: 'Jim', age: 30 },
   ];
   const names = people.map((person) => person.name);
   console.log(names); 
   // 输出: ['John', 'Jane', 'Jim']
   ```

### `map` 的特点

- **不改变原数组**: `map` 不会修改原数组，而是返回一个新的数组。
- **返回值**: 返回一个新的数组，数组中的每个元素是原数组元素经 `callback` 处理后的结果。
- **回调函数必须有返回值**: 如果 `callback` 没有返回值，`map` 返回的新数组中对应的位置将会是 `undefined`。

