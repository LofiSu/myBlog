`WeakMap` 和 `Map` 都是 JavaScript 中的键值对集合
区别主要体现在键的类型、垃圾回收行为、以及可遍历性等方面。

### 1. 键的类型

- **`Map`**：
  - `Map` 的键可以是任何类型，包括对象、字符串、数字、布尔值等。
  - 键是强引用，只要 `Map` 里有这个键的引用，垃圾回收机制就不会回收该对象。

  ```javascript
  let map = new Map();
  let obj = { name: "example" };
  map.set(obj, "value");

  console.log(map.get(obj)); // "value"
  ```

- **`WeakMap`**：
  - `WeakMap` 的键必须是对象，不能是原始类型（如字符串、数字、布尔值等）。
  - 键是弱引用，即如果没有其他引用指向这个对象，垃圾回收机制可以回收它。

  ```javascript
  let weakMap = new WeakMap();
  let obj = { name: "example" };
  weakMap.set(obj, "value");

  console.log(weakMap.get(obj)); // "value"
  obj = null; // 原对象 obj 被垃圾回收
  ```

### 2. 垃圾回收

- **`Map`**：
  - 键的引用是强引用，只要 `Map` 中存在对某个对象的引用，垃圾回收机制就不会回收该对象，导致对象可能会长时间占用内存。

- **`WeakMap`**：
  - 键的引用是弱引用，这意味着即使 `WeakMap` 里存有对一个对象的引用，只要没有其他地方引用该对象，垃圾回收机制就可以回收该对象。`WeakMap` 对象本身不会阻止其键对象的回收。

### 3. 可遍历性

- **`Map`**：
  - `Map` 是可遍历的，支持 `keys()`、`values()`、`entries()` 等迭代方法，可以使用 `for...of` 或 `forEach` 循环遍历 `Map` 的所有键值对。

  ```javascript
  let map = new Map();
  map.set("key1", "value1");
  map.set("key2", "value2");

  for (let [key, value] of map.entries()) {
    console.log(key, value);
  }
  ```

- **`WeakMap`**：
  - `WeakMap` 不可遍历，原因是键是弱引用，键可能在任何时候被垃圾回收，因此 `WeakMap` 不提供遍历方法，无法获取其中的所有键或值。
  - 只能通过 `get`、`set`、`has`、`delete` 方法操作具体的键值对。

### 4. 使用场景

- **`Map`**：
  - 用于需要键可以是任意类型、需要遍历键值对、或数据需要长时间存储的场景。

- **`WeakMap`**：
  - 用于键必须是对象且需要根据引用状态自动释放内存的场景，例如存储 DOM 元素的元数据、缓存与对象相关的数据或处理循环引用问题。

### 总结

- `Map` 适合用于一般的键值对存储，可以使用任意类型的键，并支持遍历。
- `WeakMap` 适合用于存储与对象关联的临时数据，在没有其他引用时，允许垃圾回收自动清理这些对象，从而避免内存泄漏，但不支持遍历。