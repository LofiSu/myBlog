JSON（JavaScript Object Notation）是一种轻量级的数据交换格式。它是基于 JavaScript 对象表示法的一个子集，用于表示简单的数据结构和对象。

### JSON 的特点：
- **易读性**：JSON 是纯文本格式，使用与 JavaScript 相似的语法，非常易于阅读和理解。
- **轻量级**：相比于 XML 等格式，JSON 更加简洁，因此传输的数据量更小，性能更高。
- **跨平台**：JSON 是一种文本格式，与编程语言无关，几乎所有主流编程语言都支持 JSON 解析和生成。
- **广泛应用**：JSON 常用于前后端数据传输、配置文件、API 响应等场景。

### JSON 的语法规则：
1. **对象** 以 `{}` 包裹，键值对之间用逗号分隔，键和值之间用冒号分隔。
    ```json
    {
      "name": "John",
      "age": 30,
      "isStudent": false
    }
    ```
2. **数组** 以 `[]` 包裹，元素之间用逗号分隔。
    ```json
    ["apple", "banana", "cherry"]
    ```
3. **键** 是字符串，必须使用双引号 `" "` 包围。
4. **值** 可以是：
   - 字符串（使用双引号）
   - 数字（整数或浮点数）
   - 布尔值（`true` 或 `false`）
   - `null`
   - 对象（嵌套的 JSON 对象）
   - 数组

### 示例：
```json
{
  "name": "Alice",
  "age": 25,
  "email": "alice@example.com",
  "hobbies": ["reading", "hiking", "coding"],
  "address": {
    "street": "123 Main St",
    "city": "Wonderland"
  },
  "isVerified": true,
  "profilePicture": null
}
```

### 使用 JSON 的常见场景：
- **数据传输**：客户端和服务器之间的数据通常以 JSON 格式传输，特别是在 RESTful API 中。
- **配置文件**：许多应用程序和框架使用 JSON 文件来存储配置，如 `package.json` 在 Node.js 项目中。
- **数据存储**：NoSQL 数据库（如 MongoDB）使用类似 JSON 的格式（BSON）来存储数据。

### 在 JavaScript 中如何操作 JSON：
- **解析 JSON**：将 JSON 字符串转换为 JavaScript 对象。
    ```javascript
    const jsonString = '{"name": "Alice", "age": 25}';
    const obj = JSON.parse(jsonString);
    console.log(obj.name); // 输出: Alice
    ```

- **生成 JSON**：将 JavaScript 对象转换为 JSON 字符串。
    ```javascript
    const obj = { name: "Alice", age: 25 };
    const jsonString = JSON.stringify(obj);
    console.log(jsonString); // 输出: {"name":"Alice","age":25}
    ```
