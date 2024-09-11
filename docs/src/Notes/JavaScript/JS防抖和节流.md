- **防抖**：适用于处理用户停止频繁操作后的事件执行，例如输入框内容变动的场景。
- **节流**：适用于控制高频事件的触发频率，例如滚动、窗口调整等场景。

都是为了优化性能，防止不必要的重复操作或过多的资源消耗。

### 防抖（Debounce）
**防抖的作用**是减少频繁触发事件，确保只有最后一次操作得到执行。防抖适用于那些用户可能会频繁触发的操作，但我们只关心最后一次操作结果的场景。

**举例来说**，在处理搜索框输入时，每次用户键入一个字符都会触发搜索请求，可能会导致大量不必要的网络请求。通过防抖技术，可以让搜索请求在用户停止输入一段时间后才执行，避免了频繁的请求。

**实现上**，防抖通过计时器 `setTimeout` 来实现。如果在规定时间内用户再次触发了该事件，计时器就会被重置，只有当用户停止操作超过设定的时间时，计时器才会执行回调函数。

**代码示例**：
```javascript
function debounce(fn, delay) {
    let timer = null;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, delay);
    };
}

const handleInput = debounce(function() {
    console.log('Input processed:', this.value);
}, 500);

document.querySelector('input').addEventListener('input', handleInput);
```

### 节流（Throttle）
**节流的作用**是控制高频事件的触发频率，使得在一段时间内只能执行一次。节流适用于那些可能会频繁触发的操作，但我们希望在特定时间间隔内控制执行次数的场景。

**举例来说**，在处理页面滚动事件时，每次滚动都会触发事件，如果不加以控制，可能会导致性能问题。通过节流技术，可以限制滚动事件的处理频率，例如每隔500毫秒处理一次。

**实现上**，节流可以通过标志位（flag）来控制函数的执行。函数在第一次执行后，会设置一个标志位阻止后续的执行，直到设定的时间间隔过去，再重置标志位以允许下一次执行。

**代码示例**：
```javascript
function throttle(fn, delay) {
    let flag = true;
    return function() {
        if (flag) {
            flag = false;
            setTimeout(() => {
                fn.apply(this, arguments);
                flag = true;
            }, delay);
        }
    };
}

const handleScroll = throttle(function() {
    console.log('Scroll event processed');
}, 500);

window.addEventListener('scroll', handleScroll);
```

防抖（Debouncing）和节流（Throttling）是处理高频率事件（如滚动、输入等）时常用的两种技术。它们可以提高性能并避免重复触发事件。

### 防抖（Debouncing）

**定义**：防抖是一种优化技术，用于确保某个函数在某段时间内只被执行一次。如果在这段时间内有新的事件发生，计时器会被重置。

**应用场景**：
- 输入框的实时搜索建议。
- 窗口调整大小时的处理。

**实现思路**：使用 `setTimeout` 来延迟函数的执行，如果在延迟时间内再次触发事件，则重新设置延迟时间。

**手写防抖**：

```javascript
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 使用示例
const handleResize = debounce(() => {
  console.log('Resize event');
}, 500);

window.addEventListener('resize', handleResize);
```

### 节流（Throttling）

**定义**：节流是一种优化技术，用于确保某个函数在固定时间内只被执行一次。即使事件频繁发生，函数也只会在固定时间间隔内执行一次。

**应用场景**：
- 滚动事件处理（如懒加载）。
- 按钮点击事件（避免多次提交）。

**实现思路**：使用 `setTimeout` 来设定固定的时间间隔，在每次事件触发时检查是否到达了时间间隔。

**手写节流**：

```javascript
function throttle(fn, interval) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

// 使用示例
const handleScroll = throttle(() => {
  console.log('Scroll event');
}, 1000);

window.addEventListener('scroll', handleScroll);
```

### 总结

- **防抖**：适用于需要确保事件处理函数在用户停止操作后才执行的情况。适用于如搜索建议、表单输入等场景。
- **节流**：适用于需要控制事件处理函数执行频率的情况。适用于如滚动监听、按钮点击等场景。
