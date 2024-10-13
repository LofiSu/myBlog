---
updateTime: "2024-7-1 09:30"
desc: "ES6"
tags: "Javascript"
outline: deep
---

# let和const声明变量和常量只局限在作用域内使用
![[Pasted image 20240418171034.png]]


# 运算符：
1.指数运算符：`x ** y` 的结果与 `Math.pow(x,y)` 相同：
eg：
var x = 5;
var z = x ** 2;          // 结果是 25
var z = Math.pow(x,2);   // 结果是 25

## 默认参数值

`ES6` 允许函数参数具有默认值。

### 实例
```js
function myFunction(x, y = 10) {
  // y is 10 if not passed or undefined
  return x + y;
}
myFunction(5); // 将返回 15
```
## Array.find()

`find()` 方法返回通过测试函数的第一个数组元素的值
![[Pasted image 20240418174209.png]]

## Array.findIndex()

`findIndex()` 方法返回通过测试函数的第一个数组元素的索引。
![[Pasted image 20240418174643.png]]
## Number.isInteger() 方法

如果参数是整数，则 `Number.isInteger()` 方法返回 `true`。
## Number.isSafeInteger() 方法

安全整数是可以精确表示为双精度数的整数。

如果参数是安全整数，则 `Number.isSafeInteger()` 方法返回 `true`。