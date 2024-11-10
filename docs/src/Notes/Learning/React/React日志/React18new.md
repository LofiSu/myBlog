---
title: React18有哪些更新
date: 2024-11-10
tags: React
---

# React18有哪些更新

## 1. setState自动批处理

> React18之前，只在React时间处理函数中进行批处理更新，默认情况下promise、setTimeout、原生时间处理函数或任何其他事件内的更新都不会批处理。setState在同步更新状态时，不会自动批处理，如果连续调用多次setState，每次都会触发一次更新，导致多次渲染。
> react18，将所有事件都进行批处理，即多次setState会被合并为1次执行，提高了性能，在数据层，将多个状态更新合并成一次处理（在视图层，将多次渲染合并成一次渲染）
> 批处理是指为了获得更好的性能，在数据层，将多个状态更新批量处理，合成一次更新，在视图层，将多次DOM操作合并成一次操作，减少DOM操作的次数。

## 2.引入新的root API，支持new concurrent render（并发模式渲染）
```js
//react17
ReactDOM.render(<App />, document.getElementById('root'));

// react18
// 创建root
// 使用createRoot创建root，代替ReactDOM.render
// 使用root.render()渲染应用
// 使用root.unmount()卸载应用
// 使用root.render()更新应用
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
root.unmount();
```

## 3. 去掉对IE浏览器的支持，react18引入新特性全部基于现代浏览器，如需支持IE，退回17版本
## 4. flushSync
> 在react18中，flushSync()方法用于强制同步更新，确保所有状态更新立即执行，而不是延迟执行。
> 批量更新是一个破坏性的更新，如果想退出批量更新，可以使用flushSync
```js
import { flushSync } from 'react-dom';
import { useState } from 'react';

const App=()=>{
const [count,setCount]=useState(0);
const [count2,setCount2]=useState(0);

return (
    <div className='App'>
       <button onClick={()=>{
        // 第一次更新
        flushSync(()=>{
          setCount(count=>count+1)
        })
        // 第二次更新
        flushSync(()=>{
          setCount2(count2=>count2+1)
        })
      }}>点击</button>
    </div>
)
}
```

## 5. React组件返回值更新
> 17重返回空组件只能返回null，显示返回undedined会报错，18重支持null和undefined返回

## 6. strict mode更新
> 使用严格模式时，React会对每个组件返回两次渲染，用于检查组件的副作用，17去掉了一次渲染的控制台日志，一遍让日志容易阅读。18取消了这个限制，二次渲染会以浅灰色出现在控制台日志。

## 7. Suspense不再需要fallback捕获
> 18中，不再需要fallback捕获，直接使用Suspense组件即可。
```js
import { Suspense } from 'react';
// 17
const App=()=>{
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>Hello, world!</div>
        </Suspense>
    )
}
// 18
const App=()=>{
    return (
        <Suspense>
            <div>Hello, world!</div>
        </Suspense>
    )
}
``` 
## 8. 支持useId
> 18中，useId是新的hook，用于生成唯一的ID，用于组件内部，避免使用全局变量或外部库。
在服务器和客户端生成相同唯一一个id，避免hydrating不兼容。

## 9. 支持useSyncExternalStore

> 用于解决外部数据撕裂问题，useSyncExternalStore是新的hook，用于同步外部存储，如redux、mobx等，避免使用useEffect和useState的组合，提高性能。

```js
import { useSyncExternalStore } from 'react';

const App=()=>{
    // 订阅函数
    const subscribe=()=>{
        // 订阅函数
    }
    // 获取ssr快照
    const getSSRSnapshot=()=>{
        // 获取ssr快照
    }
    // 获取ssr快照
    const getSSRSnapshotOnServer=()=>{
        // 获取ssr快照
    }
    // 使用useSyncExternalStore获取外部存储
    const count=useSyncExternalStore(subscribe,getSSRSnapshot,getSSRSnapshotOnServer);
    return <div>{count}</div>
}   
```

## 10. 支持useInsertionEffect

> 只建议在css in js中使用，这个hooks执行实际在dom生成之后，useLayoutEffect执行之前，工作原理是
在dom生成之后，执行插入样式，大致与useLayoutEffect相同，此时无法访问dom节点的引用，一般用于提前注入css。

## 11. Concurrent Mode

> 并发模式是默认开启的，用于解决react17中，多个状态更新时，导致多次渲染的问题，提高性能。
并发模式不是一个功能，而是一个底层设计，帮助应用保持响应，根据用户的设备性能和网速进行调整，通过渲染可中断来修复阻塞渲染机制。
在concurrent模式中，react可以同时更新多个状态。
区别就是使同步不可更新变成了异步可中断更新。
useDeferredValue和startTransition用来标记一次非紧急更新，用于解决多个状态更新时，导致多次渲染的问题，提高性能。

文章参考：
https://juejin.cn/post/7094037148088664078#heading-4    