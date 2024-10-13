遍历 DOM 树是一种在网页中访问和操作 HTML 元素的方法。DOM（Document Object Model）树是浏览器将 HTML 文档表示为一棵树形结构，每个节点代表一个 HTML 元素、属性或文本。遍历 DOM 树可以帮助你查找、修改或删除元素。

### 常见的 DOM 遍历方法

1. **深度优先遍历（DFS）**
   - 访问当前节点
   - 遍历子节点
   - 继续向下遍历

2. **广度优先遍历（BFS）**
   - 访问当前节点
   - 遍历当前节点的所有子节点
   - 继续向下遍历

### 使用 JavaScript 遍历 DOM 树

#### 1. 深度优先遍历（DFS）

使用递归方法进行深度优先遍历：

```javascript
function dfsTraversal(node) {
  if (node === null) return;

  console.log(node.nodeName); // 访问当前节点

  // 遍历子节点
  for (const child of node.childNodes) {
    dfsTraversal(child); // 递归遍历子节点
  }
}

// 从 document.body 开始遍历
dfsTraversal(document.body);
```

#### 2. 广度优先遍历（BFS）

使用队列进行广度优先遍历：

```javascript
function bfsTraversal(root) {
  if (root === null) return;

  const queue = [root];
  while (queue.length > 0) {
    const node = queue.shift();
    console.log(node.nodeName); // 访问当前节点

    // 将子节点加入队列
    for (const child of node.childNodes) {
      queue.push(child);
    }
  }
}

// 从 document.body 开始遍历
bfsTraversal(document.body);
```

### DOM 树的基本结构和属性

- **`nodeName`**: 节点的名称，元素节点返回标签名，文本节点返回 `#text`。
- **`nodeType`**: 节点的类型。常见的类型包括：
  - `1`: 元素节点
  - `3`: 文本节点
  - `8`: 注释节点
- **`childNodes`**: 包含当前节点所有子节点的 NodeList（包括文本节点和注释节点）。

### 示例：遍历 DOM 树并修改元素

假设我们有以下 HTML 结构：

```html
<!DOCTYPE html>
<html>
<head>
  <title>Document</title>
</head>
<body>
  <div id="container">
    <h1>Title</h1>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  </div>
</body>
</html>
```

我们可以遍历并修改这些元素：

```javascript
function modifyDOM(node) {
  if (node === null) return;

  // 修改特定类型的节点
  if (node.nodeType === 1) { // 元素节点
    if (node.tagName === 'P') {
      node.textContent = 'Modified Paragraph';
    }
  }

  // 遍历子节点
  for (const child of node.childNodes) {
    modifyDOM(child); // 递归遍历子节点
  }
}

// 从 document.body 开始遍历
modifyDOM(document.body);
```

### 使用 DOM API 进行遍历

除了手动遍历，你还可以使用 DOM API 直接查找和操作元素：

- **`document.getElementById(id)`**: 查找具有指定 ID 的元素。
- **`document.getElementsByClassName(className)`**: 查找具有指定类名的所有元素。
- **`document.getElementsByTagName(tagName)`**: 查找具有指定标签名的所有元素。
- **`document.querySelector(selector)`**: 查找匹配指定 CSS 选择器的第一个元素。
- **`document.querySelectorAll(selector)`**: 查找匹配指定 CSS 选择器的所有元素。

### 示例：使用 DOM API 查找并修改元素

```javascript
// 查找具有 id="container" 的元素
const container = document.getElementById('container');
if (container) {
  // 查找所有 <p> 元素并修改内容
  const paragraphs = container.getElementsByTagName('p');
  for (const p of paragraphs) {
    p.textContent = 'Modified Paragraph';
  }
}
```

### 总结

遍历 DOM 树是前端开发中一个常见的操作，用于访问和修改网页上的元素。通过递归或迭代方法，可以实现深度优先或广度优先遍历。理解这些遍历方法和 DOM API，有助于高效地操作和管理 HTML 文档结构。