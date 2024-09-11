如果你想一次性获取多个用户的 GitHub API 数据，可以使用以下方法：

### 1. **GraphQL API**：
   - GitHub 提供了更强大的 GraphQL API，允许你在一个请求中获取多个用户的信息。你可以创建一个包含所有用户名的 GraphQL 查询，然后发送一个请求来获取所有用户的数据。

   **示例查询**：
   ```graphql
   {
     users: search(query: "Rui-Gan huiwq1990 donychen1134 fengshunli huweihuang Lan-ce-lot MrGirl River-sh xavier-hou", type: USER, first: 10) {
       nodes {
         ... on User {
           login
           name
           avatarUrl
           bio
           company
           location
         }
       }
     }
   }
   ```

   - 通过 POST 请求将查询发送到 `https://api.github.com/graphql`。

### 2. **批量 REST API 请求**：
   - 如果你仍然想使用 REST API，你可以编写一个脚本，循环遍历所有用户名，并在短时间内发送多个请求，但这样会受限于速率限制。
   - 一些编程语言或库（如 Python 的 `asyncio` 或 JavaScript 的 `Promise.all`）允许你并行发送多个 HTTP 请求，从而加快请求的处理速度。

   **示例代码（JavaScript）**：
   ```javascript
   const axios = require('axios');

   const users = ['Rui-Gan', 'huiwq1990', 'donychen1134', 'fengshunli', 'huweihuang', 'Lan-ce-lot', 'MrGirl', 'River-sh', 'xavier-hou'];

   const fetchUserData = async (username) => {
     const response = await axios.get(`https://api.github.com/users/${username}`);
     return response.data;
   };

   const fetchAllUsers = async () => {
     const userPromises = users.map(fetchUserData);
     const userData = await Promise.all(userPromises);
     console.log(userData);
   };

   fetchAllUsers();
   ```

### 3. **使用第三方库或工具**：
   - 有一些第三方库和工具可以帮助你一次性获取多个 GitHub 用户的数据，并处理速率限制问题。比如 `octokit.js` 是 GitHub 提供的官方 JavaScript SDK，它能够更方便地处理 API 请求。

通过这些方法，你可以有效地获取多个 GitHub 用户的数据，而无需手动逐个请求。