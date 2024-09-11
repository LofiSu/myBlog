### 一、原生 Ajax

Ajax 是一种异步的 JavaScript 和 XML 技术，用于在不重新加载整个页面的情况下从服务器获取数据。使用原生的 `XMLHttpRequest` 对象可以实现 Ajax 请求。

#### 1.1 GET 请求示例

```javascript
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.github.com/users/mzlogin/repos");
xhr.send();

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log(xhr.response); // 输出响应内容
      console.log(JSON.parse(xhr.responseText)); // 将字符串转换为 JSON 对象
    } else {
      console.log("请求失败");
    }
  }
};
```

- `xhr.open`：指定请求方式和请求地址。
- `xhr.send`：发送请求。
- `xhr.onreadystatechange`：监听请求状态的变化。
- `xhr.readyState === 4`：表示请求完成。
- `xhr.status === 200`：表示请求成功。

#### 1.2 POST 请求示例

```javascript
const xhr = new XMLHttpRequest();
xhr.open("POST", "https://github.com/LofiSu/post");

// 设置请求头，指定内容类型
xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(
  JSON.stringify({
    name: "LofiSu",
    age: 18,
  })
);

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log(xhr.response); // 输出响应内容
      console.log(JSON.parse(xhr.responseText)); // 将字符串转换为 JSON 对象
    } else {
      console.log("请求失败");
    }
  }
};
```

- POST 请求可以发送任意格式的数据（如 JSON）。
- 使用 `xhr.setRequestHeader` 设置请求头，指定内容类型。
- 使用 `JSON.stringify()` 将 JavaScript 对象转换为 JSON 字符串，以便发送到服务器。

### 二、封装好的第三方工具 Axios

Axios 是一个基于 Promise 的 HTTP 客户端，它能够在浏览器和 Node.js 中使用。它提供了更友好的 API 和更强大的功能，如请求和响应拦截器。

#### 2.1 创建 Axios 实例并发起 GET 和 POST 请求

```javascript
(async () => {
  // 创建 Axios 实例
  const ins = axios.create({
    baseURL: "http://localhost:3000",
  });

  // 请求拦截器
  ins.interceptors.request.use((config) => {
    console.log("这是请求拦截器");
    return config; // 发送请求
  });

  // 响应拦截器
  ins.interceptors.response.use((res) => {
    console.log("这是响应拦截器");
    return res; // 处理响应
  });

  console.log("开始");

  // 发起 GET 请求
  const response1 = await ins.get("/get", {
    params: {
      name: "张三",
      age: 18,
    },
  });
  console.log(response1.data);

  // 发起 POST 请求
  const response2 = await ins.post("/api/post", {
    name: "李四",
    age: 20,
  });
  console.log(response2.data);
})();
```

- `axios.create(config)`：创建一个 Axios 实例。
- `ins.interceptors.request.use`：添加请求拦截器。
- `ins.interceptors.response.use`：添加响应拦截器。
- 使用 `await` 等待请求结果。

### 三、Fetch API

Fetch API 是基于 Promise 封装的 HTTP 请求 API，是对原生 Ajax 的现代替代方案。

#### 3.1 GET 请求示例

```javascript
fetch("http://localhost:3000/api/get", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("请求失败");
    }
  })
  .then((data) => console.log(data));
```

- `fetch` 是基于 Promise 的异步请求 API。
- `response.ok`：检查请求是否成功。
- `response.json()`：将响应内容解析为 JSON 对象。

#### 3.2 POST 请求示例

```javascript
fetch("http://localhost:3000/api/post", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "李四",
    age: 20,
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data));
```

- 使用 `body` 传递请求体数据。
- 使用 `JSON.stringify()` 将 JavaScript 对象转换为 JSON 字符串。

### 总结

- **原生 Ajax** 提供了最基础的异步请求能力，但代码较为复杂，处理较低层次的细节。
- **Axios** 是一个功能丰富的 HTTP 客户端，支持请求和响应拦截器，Promise 语法使代码更加简洁明了。
- **Fetch API** 是现代浏览器内置的 HTTP 请求 API，使用 Promise 语法，更简洁，但在处理错误和兼容性上需要更多注意。