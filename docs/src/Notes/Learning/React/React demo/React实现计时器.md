---
updateTime: "2024-7-1 09:30"
desc: "React 实现计时器"
tags: "React"
outline: deep
---

要在刷新页面后仍然保持计时器继续计时，你需要将计时器的状态持久化到浏览器的存储中，比如 `localStorage` 或 `sessionStorage`。下面是一个简单的示例，展示了如何使用 React 和 `localStorage` 实现一个计时器：

```jsx
import React, { useState, useEffect } from 'react';

function Timer() {
  // 获取初始时间，从 localStorage 读取或默认为 0
  const getInitialTime = () => {
    const savedTime = localStorage.getItem('timer');
    return savedTime ? parseInt(savedTime, 10) : 0;
  };

  // 初始化状态
  const [time, setTime] = useState(getInitialTime());
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    // 清除计时器
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    // 每次计时器状态变化时保存到 localStorage
    localStorage.setItem('timer', time);
  }, [time]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    localStorage.removeItem('timer');
  };

  return (
    <div>
      <h1>{time} seconds</h1>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default Timer;
```

### 代码解析：
1. **获取初始时间**：`getInitialTime` 函数从 `localStorage` 中读取上一次保存的计时时间，如果没有则返回 `0`。

2. **状态初始化**：使用 `useState` 钩子来管理 `time` 和 `isRunning` 两个状态变量。

3. **计时器逻辑**：在 `useEffect` 中，当 `isRunning` 为 `true` 时，每秒更新一次 `time`。使用 `clearInterval` 在组件卸载或 `isRunning` 变化时清除计时器。

4. **状态保存**：另一个 `useEffect` 钩子会在 `time` 变化时将其保存到 `localStorage` 中，确保刷新后能够继续计时。

5. **控制按钮**：提供了 `Start`、`Stop` 和 `Reset` 按钮，分别用于启动、暂停和重置计时器。

### 如何工作：
- 当你刷新页面时，`localStorage` 中保存的时间会被重新读取，计时器会从该时间继续计时。

这样，你的计时器就可以在页面刷新后继续计时了。