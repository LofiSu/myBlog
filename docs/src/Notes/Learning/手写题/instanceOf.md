# 手写instanceOf
> instanceof 用于判断一个对象是否是某个构造函数的实例。
obj instanceof Constructor 通过检查构造函数的原型对象是否在obj的原型链上。
1.获取构造函数的prototype属性
2.获取obj的原型对象
3.二者比对

```js
function instanceOf(obj,Constructor){
    //当获取的对象为null或者undefined就返回false
    if(obj==null)return false;
    //获取构造器的原型属性
    const prototype=Constructor.prototype;
    //获取obj的原型对象
    let proto=Object.getPrototypeOf(obj);
    //遍历obj的原型链
    while(proto){
        //如果找到与构造器prototype属性一样的原型就返回true
        if(proto===prototype)return true;
        //继续向上查找
        proto=Object.getPrototypeOf(proto);
    }
    //如果遍历完原型链还没找到就返回false
    return false;
}
```

```JavaScript
const _instanceof = (target, fn) => {
    let proto = Object.getPrototypeOf(target);
    while(proto) {
        if(proto === fn.prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
    return false;
};
```

### `instanceof` 的核心是沿着对象的原型链查找构造函数的 `prototype`，通过判断是否存在于原型链上来决定该对象是否为某构造函数的实例。

### 原理解析

当我们使用 `A instanceof B` 时，JavaScript 进行如下操作：

1. **获取构造函数的原型**: 首先获取构造函数 `B` 的 `prototype` 属性，即 `B.prototype`。
2. **沿着对象的原型链查找**: 然后，JavaScript 会沿着对象 `A` 的原型链（`[[Prototype]]`）向上查找，看是否能找到 `B.prototype`。
3. **返回结果**:
   - 如果在原型链上找到了 `B.prototype`，那么 `A` 被认为是 `B` 的实例，`A instanceof B` 返回 `true`。
   - 如果遍历了整个原型链也没有找到 `B.prototype`，那么 `A` 不是 `B` 的实例，`A instanceof B` 返回 `false`。

### 原型链的概念

每个 JavaScript 对象都有一个内部属性 `[[Prototype]]`（在大多数 JavaScript 引擎中可以通过 `__proto__` 访问），这个属性指向该对象的原型对象。原型对象本身也有 `[[Prototype]]`，这样形成一条原型链。如果某个对象的原型链上包含另一个对象的原型，那么这个对象被认为是那个原型对应的构造函数的实例。

### 实例解析

```javascript
function Foo() {}
const obj = new Foo();

console.log(obj instanceof Foo); // true
```

- 在上述代码中，`obj` 是通过 `Foo` 构造函数创建的。
- 当执行 `obj instanceof Foo` 时，JavaScript 引擎会检查 `obj` 的原型链，看是否包含 `Foo.prototype`。
- 因为 `obj.__proto__` 是 `Foo.prototype`，所以 `obj instanceof Foo` 返回 `true`。

### 注意事项

- `instanceof` 只能用于判断对象和构造函数的关系，不能用于判断基本数据类型（如字符串、数字、布尔值等）。
- 原型链查找是动态的，如果更改了构造函数的 `prototype` 属性，`instanceof` 的判断结果也会随之改变。

