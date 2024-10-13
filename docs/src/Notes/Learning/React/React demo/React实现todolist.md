---
updateTime: "2024-7-1 09:30"
desc: "React 实现todolist"
tags: "React"
outline: deep
---

要用 React 实现一个简单的 To-Do List 应用，你可以按照以下步骤进行。这个应用将包含添加、删除、标记任务完成等基本功能。

### 1. **设置 React 项目**
如果还没有 React 项目，可以先创建一个新的项目：

```bash
npx create-react-app todo-list
cd todo-list
npm start
```

### 2. **创建 ToDo List 组件**

在 `src` 文件夹下，编辑 `App.js` 文件：

```javascript
import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // 添加任务
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  // 删除任务
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // 标记任务完成或未完成
  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="Add a new task" 
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleTaskCompletion(index)}>
              {task.text}
            </span>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
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
  margin-top: 50px;
}

.input-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

input {
  width: 300px;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 4px;
  outline: none;
}

button {
  padding: 10px 20px;
  margin-left: 10px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background-color: #5cb85c;
  color: white;
  border-radius: 4px;
}

button:hover {
  background-color: #4cae4c;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
}

li.completed span {
  text-decoration: line-through;
  color: #aaa;
}

li span {
  cursor: pointer;
}

li button {
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

li button:hover {
  background-color: #c9302c;
}
```

### 4. **运行应用**
保存所有文件，然后确保应用正在运行，你可以通过以下命令启动应用：

```bash
npm start
```

### 5. **功能说明**

- **添加任务**：用户可以在输入框中输入任务，然后点击“Add Task”按钮将任务添加到列表中。
- **删除任务**：点击任务旁边的“Delete”按钮可以删除该任务。
- **标记完成任务**：点击任务文本可以将其标记为已完成或未完成，已完成的任务将显示删除线。

### 总结
通过上述步骤，你就得到了一个功能完整的 To-Do List 应用，它使用 React 的 `useState` 钩子来管理任务列表的状态，并实现了基本的增删改查功能。