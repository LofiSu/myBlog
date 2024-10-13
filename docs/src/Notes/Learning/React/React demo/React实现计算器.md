要用 React 实现一个简单的计算器，可以按照以下步骤来进行。这个计算器可以处理基本的加减乘除操作。

### 1. **设置 React 项目**
如果你没有创建 React 项目，可以使用以下命令创建一个新的项目：

```bash
npx create-react-app calculator
cd calculator
npm start
```

### 2. **编写计算器组件**

在 `src` 文件夹下，编辑 `App.js` 文件，写入如下代码：

```javascript
import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');  // 用来存储用户输入
  const [result, setResult] = useState(''); // 用来存储计算结果

  // 处理按钮点击事件
  const handleClick = (value) => {
    if (value === '=') {
      try {
        setResult(eval(input)); // 计算表达式的结果
      } catch (e) {
        setResult('Error'); // 处理错误情况
      }
    } else if (value === 'C') {
      setInput(''); // 清空输入
      setResult('');
    } else {
      setInput(input + value); // 追加输入
    }
  };

  return (
    <div className="App">
      <h1>React Calculator</h1>
      <div className="calculator">
        <div className="display">
          <input type="text" value={input} readOnly />
          <div className="result">{result}</div>
        </div>
        <div className="buttons">
          {['7', '8', '9', '/'].map(val => <button onClick={() => handleClick(val)} key={val}>{val}</button>)}
          {['4', '5', '6', '*'].map(val => <button onClick={() => handleClick(val)} key={val}>{val}</button>)}
          {['1', '2', '3', '-'].map(val => <button onClick={() => handleClick(val)} key={val}>{val}</button>)}
          {['0', '.', '=', '+'].map(val => <button onClick={() => handleClick(val)} key={val}>{val}</button>)}
          <button onClick={() => handleClick('C')} className="clear">C</button>
        </div>
      </div>
    </div>
  );
}

export default App;
```

### 3. **添加样式**
在 `src` 文件夹下的 `App.css` 文件中添加以下样式：

```css
.App {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #282c34;
  color: white;
}

.calculator {
  width: 320px;
  padding: 20px;
  background-color: #444;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.display {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  background-color: #222;
  border-radius: 5px;
  padding: 10px;
}

.display input {
  font-size: 2rem;
  text-align: right;
  border: none;
  background-color: #222;
  color: white;
  outline: none;
}

.result {
  font-size: 1.5rem;
  text-align: right;
  color: #0f0;
  margin-top: 5px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

button {
  font-size: 1.5rem;
  padding: 20px;
  background-color: #666;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #888;
}

button.clear {
  grid-column: span 4;
  background-color: #f00;
}

button.clear:hover {
  background-color: #d00;
}
```

### 4. **运行应用**
确保一切都设置正确后，你可以通过以下命令来运行应用：

```bash
npm start
```

这样你就得到了一个基础的计算器应用。它可以处理简单的加减乘除操作，并具有一个清除按钮来重置计算器。用户可以依次点击数字和运算符，最后点击等号来获得计算结果。