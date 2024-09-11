### 一、JS 的内存结构

JavaScript 中的内存分为栈内存（Stack）和堆内存（Heap）。

1. **栈内存**：主要用来存放简单数据类型（也称为原始类型）的值，如 `Number`、`String`、`Boolean`、`Undefined` 、`Symbol`和 `Null`。这些数据直接存储在栈内存中，访问速度非常快。

2. **堆内存**：用来存放复杂数据类型（如对象Obj、数组、函数等）。当我们创建一个对象时，它的引用（地址）保存在栈内存中，而实际的对象数据则存储在堆内存中。栈内存中的引用指向堆内存中的具体对象。

### 二、对象列表

JavaScript 中的对象是键值对的集合。对象的值可以是任意类型，包括原始类型或其他对象。

```javascript
let obj = {
  name: "John",
  age: 30,
  address: {
    city: "New York",
    zip: 10001,
  },
};
```

在上述例子中，`obj` 是一个对象，其中 `name` 和 `age` 是原始类型，而 `address` 则是另一个对象。

### 三、浅拷贝

浅拷贝只复制对象的引用,而不会复制整个对象,两个对象的某些属性仍然指向同一块内存区域。
#### 常见的浅拷贝方式：

1. **对象的赋值操作**
   - 直接将一个对象赋值给另一个对象，这样新对象和原对象会共享同一内存地址，对新对象的修改也会影响到原对象。
   ```javascript
   const obj1 = { a: 1 };
   const obj2 = obj1;
   obj2.a = 2;
   console.log(obj1.a); // 2
   ```

2. **`Object.assign()`**：可以将一个或多个源对象的属性拷贝到目标对象中。
3. **扩展运算符（`...`）**：可以用于数组或对象的浅拷贝。

```javascript
let obj1 = { a: 1, b: { c: 2 } };
let obj2 = Object.assign({}, obj1);
let obj3 = { ...obj1 };

obj1.b.c = 3;

console.log(obj2.b.c); // 3，浅拷贝导致引用相同
console.log(obj3.b.c); // 3，浅拷贝导致引用相同
```

4. **数组的 `push()` 方法**
   - `push()` 方法将一个元素添加到数组的末尾。如果该元素是引用类型（例如对象），则只是将引用添加到数组中，而不是创建该对象的副本。
   ```javascript
   const arr1 = [{ a: 1 }];
   const arr2 = [];
   arr2.push(...arr1);
   arr2[0].a = 2;
   console.log(arr1[0].a); // 2
   ```

5. **数组的 `concat()` 方法**
   - `concat()` 方法用于合并两个或多个数组。与 `push()` 类似，它将引用类型元素的引用复制到新数组中，而不是创建新对象。
   ```javascript
   const arr1 = [{ a: 1 }];
   const arr2 = arr1.concat();
   arr2[0].a = 2;
   console.log(arr1[0].a); // 2
   ```

6. **数组的 `slice()` 方法**
   - `slice()` 方法返回一个新的数组对象，是原数组的一部分浅拷贝。它不会修改原数组，但如果数组中的元素是引用类型，拷贝的仍然是引用地址。
   ```javascript
   const arr1 = [{ a: 1 }];
   const arr2 = arr1.slice();
   arr2[0].a = 2;
   console.log(arr1[0].a); // 2
   ```

7. **数组的 `map()` 方法**
   - `map()` 方法创建一个新数组，其结果是对原数组中的每个元素调用一个提供的函数后的返回值。如果返回的是引用类型，则复制的是引用地址。
   ```javascript
   const arr1 = [{ a: 1 }, { b: 2 }];
   const arr2 = arr1.map(item => item);
   arr2[0].a = 3;
   console.log(arr1[0].a); // 3
   ```

8. **数组的 `filter()` 方法**
   - `filter()` 方法创建一个新数组，其元素是通过原数组中符合条件的元素。如果数组中的元素是引用类型，拷贝的仍然是引用地址。
   ```javascript
   const arr1 = [{ a: 1 }, { a: 2 }];
   const arr2 = arr1.filter(item => item.a > 1);
   arr2[0].a = 3;
   console.log(arr1[1].a); // 3
   ```

### 四、递归方式深度拷贝

深拷贝会复制对象的所有层级，不仅仅是对象的引用。如果对象中包含另一个对象，深拷贝会递归地复制整个对象结构。

实现递归深拷贝的方法如下：

```javascript
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  let copy = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {//检查属性key是否是obj自身的属性而不是原型链继承的属性
      copy[key] = deepClone(obj[key]);
    }
  }
  return copy;
}

```

### 五、JSON 序列化深拷贝

使用 `JSON.stringify()` 和 `JSON.parse()` 进行深拷贝是一种简单的方法，但它有一些限制：

1. 无法拷贝function函数、`undefined`、`Symbol`。
2. 不能处理循环引用。
3. 日期对象会被转换为字符串。

```javascript
let obj1 = { a: 1, b: { c: 2 }, d: function() {}, e: undefined };
let obj2 = JSON.parse(JSON.stringify(obj1));

obj1.b.c = 3;

console.log(obj2.b.c); // 2，深拷贝
console.log(obj2.d); // undefined，无法拷贝函数
```

可以看看这个视频帮助理解：
【前端面试题：对象拷贝（四）通过JSON拷贝】 https://www.bilibili.com/video/BV1mh411h7yi/?share_source=copy_web&vd_source=c5bef71b25a059b9bd7e915280d9f6fc

其他方法深拷贝：
###  使用第三方库 `lodash`

`lodash` 是一个流行的 JavaScript 工具库，其中 `_.cloneDeep()` 方法可以轻松实现深拷贝。

```javascript
const _ = require('lodash');

const obj1 = { a: 1, b: { c: 2 } };
const obj2 = _.cloneDeep(obj1);
obj2.b.c = 3;
console.log(obj1.b.c); // 2
```

### 使用结构化克隆算法（`structuredClone()`）

`structuredClone()` 是一种内置的 JavaScript API，可以直接实现深拷贝。它支持复杂的数据结构，如 `Map`、`Set`、`ArrayBuffer`，并且能够处理循环引用。

```javascript
const obj1 = { a: 1, b: { c: 2 }, d: new Date() };
const obj2 = structuredClone(obj1);
obj2.b.c = 3;
console.log(obj1.b.c); // 2
```

### 结合 `MessageChannel` 实现深拷贝

`MessageChannel` 是浏览器中的一种 API，可以用于实现深拷贝，尤其是在处理循环引用时。

```javascript
function deepClone(obj) {
  return new Promise(resolve => {
    const { port1, port2 } = new MessageChannel();
    port2.onmessage = ev => resolve(ev.data);
    port1.postMessage(obj);
  });
}

const obj1 = { a: 1, b: { c: 2 } };
deepClone(obj1).then(obj2 => {
  obj2.b.c = 3;
  console.log(obj1.b.c); // 2
});
```

### 通过 `map()` 结合递归实现深拷贝

对于复杂的数据结构，如 `Map` 和 `Set`，可以使用递归结合 `map()` 实现深拷贝。

```javascript
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  const clone = Array.isArray(obj) ? [] : {};
  hash.set(obj, clone);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], hash);
    }
  }
  return clone;
}

const map = new Map([['key1', 'value1'], ['key2', 'value2']]);
const obj1 = { a: 1, b: { c: 2 }, d: map };
const obj2 = deepClone(obj1);
obj2.d.set('key1', 'newValue');
console.log(obj1.d.get('key1')); // 'value1'
```