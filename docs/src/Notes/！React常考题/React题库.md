### 1. React 有哪些 Hooks？
React 提供了许多内置的 Hooks，以下是一些主要的 Hooks：

- **`useState`**：用于在函数组件中声明状态变量。
- **`useEffect`**：用于在函数组件中处理副作用，比如数据获取、订阅或手动更改 DOM。
- **`useContext`**：用于在函数组件中访问 React 的 Context API 提供的上下文数据。
- **`useReducer`**：用于在复杂状态逻辑中替代 `useState`，类似于 Redux 的 reducer。
- **`useCallback`**：返回一个记忆化的回调函数，用于优化性能，避免不必要的重新渲染。
- **`useMemo`**：返回一个记忆化的值，用于性能优化，避免不必要的计算。
- **`useRef`**：创建一个可以持久化的可变引用对象，可以直接访问 DOM 元素或保持跨渲染周期的变量。
- **`useImperativeHandle`**：配合 `forwardRef` 使用，定制暴露给父组件的 ref API。
- **`useLayoutEffect`**：与 `useEffect` 类似，但它是在所有 DOM 变更之后同步调用，适用于读取 DOM 布局并同步触发重新渲染。
- **`useDebugValue`**：用于在 React DevTools 中显示自定义 Hook 的调试信息。

### 2. 你了解类组件的生命周期吗？
React 类组件有一系列的生命周期方法，分为三个主要阶段：**挂载（Mounting）**、**更新（Updating）** 和 **卸载（Unmounting）**。

- **挂载阶段**：
  - `constructor()`: 初始化组件的状态和绑定事件处理程序。
  - `static getDerivedStateFromProps()`: 根据父组件传入的 props 来更新组件状态。
  - `render()`: 渲染 UI。
  - `componentDidMount()`: 组件挂载后调用，通常用于进行 API 请求或 DOM 操作。

- **更新阶段**：
  - `static getDerivedStateFromProps()`: 每次组件接收新的 props 时调用。
  - `shouldComponentUpdate()`: 决定组件是否需要重新渲染。
  - `render()`: 渲染更新后的 UI。
  - `getSnapshotBeforeUpdate()`: 渲染之前调用，可以捕获 DOM 信息（如滚动位置）。
  - `componentDidUpdate()`: 组件更新后调用，通常用于操作 DOM 或处理新的数据。

- **卸载阶段**：
  - `componentWillUnmount()`: 组件卸载前调用，通常用于清理资源或取消订阅。

### 3. 对于 React 的组件，我希望在挂载之后执行一段逻辑，应该写在哪儿？
在函数组件中，应该使用 **`useEffect`** Hook 来处理挂载后的逻辑。

```javascript
useEffect(() => {
  // 在组件挂载后执行的逻辑
}, []);
```

`useEffect` 的第二个参数是一个空数组 `[]`，表示这个副作用只在组件挂载时执行一次。

### 4. 那如果希望卸载的时候执行呢？
仍然使用 **`useEffect`**，并在 `useEffect` 返回一个清理函数，这个函数会在组件卸载时执行。

```javascript
useEffect(() => {
  // 在组件挂载后执行的逻辑

  return () => {
    // 在组件卸载时执行的清理逻辑
  };
}, []);
```

### 5. Hooks 有什么限制吗，比如不能在什么场景下用？
React Hooks 有几个重要的使用规则和限制：

- **只能在函数组件或自定义 Hook 中使用**：Hooks 不能在普通的 JavaScript 函数、类组件或者条件语句中使用。
- **只能在顶层调用 Hooks**：不能在循环、条件语句或嵌套函数中调用 Hooks，必须在 React 函数组件或自定义 Hook 的最顶层调用。

### 6. 具体是怎么影响的？
这些限制主要确保了 React 能够正确地记录和维护 Hooks 的调用顺序。如果在循环或条件中调用 Hooks，会导致调用顺序在渲染期间发生变化，从而破坏 React 对状态的管理，进而引发渲染问题或无法正确更新状态。

### 7. React 在什么地方保存这个 Hooks 的顺序？
React 在内部通过一个数组来保存 Hooks 的状态，每个组件实例都有自己的 Hooks 数组。React 通过每次渲染时的调用顺序来确保状态在正确的位置上，这就是为什么 Hooks 必须按照相同的顺序调用。

### 8. 之前提到的 `useCallback` 和 `useMemo` 有什么区别？
- **`useCallback`**：返回一个记忆化的回调函数。当你希望传递一个不会在每次渲染时重新创建的函数给子组件时，使用 `useCallback`。
  
  ```javascript
  const memoizedCallback = useCallback(() => {
    // 函数逻辑
  }, [依赖项]);
  ```

- **`useMemo`**：返回一个记忆化的值。当你希望在依赖项不变时避免重新计算某个值时，使用 `useMemo`。

  ```javascript
  const memoizedValue = useMemo(() => {
    return 计算结果;
  }, [依赖项]);
  ```

简单来说，`useCallback` 是优化回调函数的性能，`useMemo` 是优化计算结果的性能。

### 9. 用过 `useLayoutEffect` 吗？
`useLayoutEffect` 与 `useEffect` 类似，但它是在所有 DOM 变更后同步触发的。它适用于需要读取 DOM 布局并同步触发重新渲染的场景。

`useLayoutEffect` 会在浏览器完成布局和绘制后运行，这意味着它在 `useEffect` 之前运行，因此可以防止闪烁或不一致的 UI 显示。

### 10. React 组件通讯有几种方式？
React 组件之间的通讯方式有多种，常见的有以下几种：

1. **Props**：父组件通过 Props 向子组件传递数据和回调函数。
2. **Context**：通过 React 的 Context API 在组件树中跨层级共享数据。
3. **Ref**：父组件可以通过 Ref 直接访问子组件的实例或 DOM 元素。
4. **Redux/MobX 等状态管理库**：通过全局状态管理库来实现跨组件的状态共享。
5. **Event Emitter**：使用事件总线模式来实现松散耦合的组件通信。
6. **回调函数**：通过向子组件传递回调函数来实现父子组件间的通信。
7. **全局状态（如 React Query、Recoil）**：利用第三方库管理全局状态，在不同组件之间同步数据。

这些方法可以组合使用，具体选择取决于组件的复杂度和数据流的需求。
当然可以，以下是标号清晰的回答：

### 11. Redux 的更新是怎么触发视图更新的？
Redux 的视图更新是通过 **订阅-通知机制** 来实现的。当你在 Redux 中派发（dispatch）一个动作（action）时，Redux 会调用你定义的 reducer 函数，并返回一个新的状态。然后，Redux 会通知所有订阅这个状态的组件，这些组件会重新渲染以反映新的状态。

在 React 中，通常使用 `react-redux` 提供的 `connect` 高阶组件或 `useSelector` Hook 将 Redux 状态连接到 React 组件。这些方法会订阅 Redux store 的状态，当状态发生变化时，它们会触发组件的重新渲染。

### 12. 你了解事件总线吗？了解 React18 的 Fiber 架构吗？
**事件总线**是一种模式，允许不同组件之间进行松散耦合的通信。通过事件总线，一个组件可以触发事件，另一个组件可以监听和处理该事件，而不需要显式地将它们连接在一起。这在复杂的应用程序中特别有用。

**React 18 的 Fiber 架构** 是 React 重新实现的核心算法，它将 React 渲染流程重构为一种增量渲染架构。Fiber 允许 React 更好地处理高优先级任务和低优先级任务的调度，支持暂停和恢复渲染，改善了性能和用户体验。你可以通过这个 [链接](https://fe.azhubaby.com/React/Fiber.html) 了解更详细的信息。


React 18 的 Fiber 架构是对 React 内部渲染机制的一次重构，旨在解决 React 在处理大型应用时遇到的性能问题。Fiber 是一种新的协调算法（reconciliation algorithm），使得 React 能够更好地管理渲染过程中的复杂任务，特别是在处理高优先级和低优先级任务的调度时。

### Fiber 架构的关键概念

1. **增量渲染 (Incremental Rendering)**：
   - Fiber 允许 React 将渲染工作分解为多个小任务，并在执行这些任务时能够暂停、继续或中止。这种增量渲染使得 React 能够更好地响应用户交互，比如在用户输入或点击按钮时，React 可以优先处理这些高优先级任务，而不是一直等待整个渲染过程完成。

2. **可中断的更新 (Interruptible Updates)**：
   - 在 Fiber 架构下，React 的渲染过程是可中断的。如果在渲染过程中出现了高优先级的更新（如用户输入），React 可以暂停当前的渲染任务，先处理高优先级的任务，再恢复之前的任务。这种机制极大地提高了 React 应用的响应速度。

3. **优先级调度 (Priority Scheduling)**：
   - Fiber 使用了优先级调度机制，根据任务的重要性对其进行排序和调度。高优先级任务（如用户交互）会优先被处理，而低优先级任务（如非关键渲染）会被延后处理。这种调度机制确保了用户在使用应用时的流畅体验。

4. **双缓冲 (Double Buffering)**：
   - Fiber 采用了双缓冲技术，使得 React 可以在更新视图时同时处理多个任务。旧的任务会在一个缓冲区中执行，而新的任务则可以在另一个缓冲区中准备。这种技术允许 React 在更新界面时减少卡顿，提供更平滑的用户体验。

5. **新的协调算法**：
   - 在经典的 React 15 及之前的版本中，React 使用了一种同步的协调算法。当组件树很大时，这种算法可能会导致 UI 的长时间卡顿。Fiber 提供了一种新的协调算法，它将渲染过程划分为多个可中断的片段，使得 React 可以在必要时暂停渲染，处理其他更紧急的任务。

6. **Concurrent Mode（并发模式）**：
   - Fiber 架构引入了并发模式，允许 React 可以同时处理多个更新而不阻塞主线程。这种模式可以显著提升应用的性能，尤其是在处理复杂用户交互和动画时。并发模式使得 React 更加适合于构建响应迅速、流畅的用户界面。

### Fiber 的数据结构

Fiber 架构中的每个节点都是一个 Fiber 对象，代表 React 组件树中的一个单元。每个 Fiber 对象都包含了以下信息：
- **type**: 组件的类型（如函数组件、类组件、原生 DOM 元素）。
- **key**: 用于识别节点在其同级节点中的唯一性。
- **stateNode**: 存储组件实例或 DOM 元素。
- **child**: 指向第一个子 Fiber。
- **sibling**: 指向下一个兄弟 Fiber。
- **return**: 指向父 Fiber。

### Fiber 架构的优势

- **更好的用户体验**：通过增量渲染和优先级调度，React 可以在处理大量更新时保持应用的流畅性。
- **更高的性能**：双缓冲和并发模式使得 React 能够更高效地利用浏览器的资源。
- **更灵活的任务管理**：React 可以在不同优先级的任务之间灵活切换，确保用户交互始终得到快速响应。

### 总结

React 18 的 Fiber 架构为 React 带来了更强大的渲染能力和更高的性能。通过增量渲染、优先级调度、并发模式等新特性，React 能够更好地处理复杂应用中的多任务调度，为用户提供更流畅的体验。Fiber 的引入标志着 React 在可维护性、性能和用户体验上的进一步提升。
### 13. 为什么要 setState，而不直接修改 state（this.state.xx = oo）[​](https://fe.azhubaby.com/React/%E5%BF%AB%E9%97%AE%E5%BF%AB%E7%AD%94setState.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81-setstate-%E8%80%8C%E4%B8%8D%E7%9B%B4%E6%8E%A5%E4%BF%AE%E6%94%B9-state-this-state-xx-oo)

setState 做的事情不仅时修改 this.state 的值，它还会触发 React 的更新机制，进行 diff，然后将 patch 部分更新到真实 dom 里。

如果直接 this.state.xx = oo 的话，state 虽然修改，但不会触发 UI 重渲染

### 14. Proxy 代替 getter/setter 的优势：
`Proxy` 相较于传统的 `getter/setter`，性能更优主要因为：

- **灵活性**：`Proxy` 可以代理整个对象并对所有操作进行捕获（包括属性的添加、删除、遍历等），而 `getter/setter` 只能拦截单一属性的读取和设置。
- **无需遍历**：`Proxy` 不需要遍历对象的所有属性，可以直接代理整个对象，而 `getter/setter` 需要为每个属性单独定义。
- **功能性**：`Proxy` 支持 13 种拦截操作，而 `getter/setter` 只能拦截 `get` 和 `set` 操作。

### 15. Proxy 是浅层的还是深层的？
**Proxy 是浅层的**：`Proxy` 只会代理对象的最外层属性，如果需要对嵌套的对象也进行代理，则需要在访问嵌套对象时重新设置 `Proxy`。

### 15. Vue 2 中数组的代理机制：
在 Vue 2 中，由于 `Object.defineProperty` 无法拦截数组的索引变化和方法调用，Vue 2 通过重写数组的原型方法（如 `push`, `pop`, `splice` 等）来实现数组的响应式。这种方法允许 Vue 2 在数组内容变化时能够触发视图更新。

### 16. ES6 中 Promise 的方法：
- **`Promise.all`**：传入一个 Promise 数组，当所有 Promise 都成功时返回一个新的 Promise，并传入结果数组。如果其中一个 Promise 被拒绝，`Promise.all` 会立即被拒绝，并传入该错误。

- **`Promise.catch`**：用于处理 Promise 的拒绝情况。

- **`Promise.finally`**：无论 Promise 成功或失败，都会执行 `finally` 中的回调。

- **`Promise.then`**：用于处理 Promise 成功的情况，`then` 方法会在每个 Promise 完成后立即执行，而不是等所有 Promise 都执行完才执行。

关于 `Promise.all` 的 `catch` 行为，当一个 Promise 被拒绝时，`Promise.all` 会立即返回被拒绝的 Promise，不会等待其他 Promise 完成。

### 17. WeakMap 与 Map 的区别：
`WeakMap` 只能接受对象作为键，并且这些键是弱引用的，意味着如果对象没有其他引用，垃圾回收器会自动回收它们，`WeakMap` 不会阻止这种回收。这使得 `WeakMap` 适合用于缓存等场景中，避免内存泄漏。因为 `WeakMap` 中的键是弱引用，所以它不支持遍历方法（如 `keys()`，`values()` 等）。

### 18. 箭头函数：
箭头函数 (`=>`) 是 ES6 中引入的一种简洁的函数语法，最大的特点是**不绑定自己的 `this`**，它会继承外层上下文的 `this`，适合在回调函数中使用，避免手动绑定 `this`。

### 19. V8 的垃圾回收机制：
V8 引擎使用了标记-清除（Mark-and-Sweep）算法作为垃圾回收的核心算法。该算法会从根对象开始遍历所有可达对象，并标记它们，随后清除没有标记的不可达对象。相较于引用计数算法，标记-清除算法不会受循环引用的影响，更加可靠。

### 20. CSS 居中一个元素：
CSS 中可以通过多种方法居中一个元素，比如使用 `flexbox`、`grid`、绝对定位加上 `transform`、以及利用 `margin` 等。

### CSS 中的定位

CSS 中的定位方式主要有四种：**静态定位**（`static`）、**相对定位**（`relative`）、**绝对定位**（`absolute`）和**固定定位**（`fixed`），以及在 CSS3 引入的**粘性定位**（`sticky`）。

1. **静态定位（`static`）**：
   - 默认定位方式。元素按文档流的正常布局进行排列。`top`, `bottom`, `left`, `right` 这些属性在静态定位下不会生效。

2. **相对定位（`relative`）**：
   - 元素相对于其在文档流中的原始位置进行定位。元素依然占据原始位置，但可以通过 `top`, `bottom`, `left`, `right` 属性进行偏移。
   - 常用于微调位置或者作为子元素的定位参考点。

3. **绝对定位（`absolute`）**：
   - 元素相对于最近的已定位祖先元素（非 `static`）进行定位。如果没有找到已定位的祖先元素，元素将相对于浏览器窗口进行定位。
   - 绝对定位元素从正常文档流中脱离，不占据空间。常用于布局中的精确定位。

4. **固定定位（`fixed`）**：
   - 元素相对于浏览器窗口进行定位，即使页面滚动，元素也保持在同一位置。
   - 也从正常文档流中脱离，不占据空间。常用于导航栏、浮动广告等固定元素。

5. **粘性定位（`sticky`）**：
   - 元素在特定的阈值（如滚动到一定位置）之前表现为相对定位，超过阈值后表现为固定定位。
   - 常用于滚动页面时的导航栏或浮动元素。

### 手撕代码

1. **手写一个 `compose` 函数**

`compose` 函数用于将多个函数组合在一起，使得每个函数的输出成为下一个函数的输入。返回一个新的函数，能够对传入的不定量个函数进行链式调用。

```javascript
function compose(...funcs) {
  return function (initialValue) {
    return funcs.reduceRight((acc, fn) => fn(acc), initialValue);
  };
}

// 示例使用
const add1 = x => x + 1;
const multiply2 = x => x * 2;

const composedFunc = compose(multiply2, add1);

console.log(composedFunc(5)); // 输出 12
```

2. **二叉树的 Z 型遍历**

Z 型遍历二叉树，即先从左到右，再从右到左的顺序层次遍历树结构。

```javascript
function zigzagLevelOrder(root) {
  if (!root) return [];

  const result = [];
  let currentLevel = [root];
  let leftToRight = true;

  while (currentLevel.length > 0) {
    const nextLevel = [];
    const levelValues = [];

    for (const node of currentLevel) {
      levelValues.push(node.val);
      if (node.left) nextLevel.push(node.left);
      if (node.right) nextLevel.push(node.right);
    }

    if (!leftToRight) levelValues.reverse();
    result.push(levelValues);
    currentLevel = nextLevel;
    leftToRight = !leftToRight;
  }

  return result;
}

// 示例二叉树节点结构
function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

// 示例使用
const root = new TreeNode(1, 
                new TreeNode(2, new TreeNode(4), new TreeNode(5)),
                new TreeNode(3, new TreeNode(6), new TreeNode(7))
              );

console.log(zigzagLevelOrder(root)); // 输出 [[1], [3, 2], [4, 5, 6, 7]]
```

这段代码通过层次遍历的方式来实现 Z 型遍历，每层依次切换遍历方向。