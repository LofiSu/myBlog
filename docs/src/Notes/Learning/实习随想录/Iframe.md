---
updateTime: "2024-11-21 10:30"
desc: "iframe"
tags: "iframe"
outline: deep
---
# 什么是iframe？

`iframe` 是HTML的一个元素，表示 **"inline frame"**，用于在一个网页中嵌入另一个独立的网页。嵌入的网页与主网页是独立的，它拥有自己的浏览上下文，包括自己的DOM和JavaScript作用域。因此，`iframe` 常用于嵌入外部内容，如视频、广告、地图等。

### iframe的用法：

`iframe` 的基本语法如下：

```html
<iframe src="https://example.com" width="600" height="400"></iframe>
```

- `src`: 指定要嵌入的页面的URL。
- `width` 和 `height`: 设置iframe的宽度和高度。
- 还有其他属性，如 `sandbox`、`allowfullscreen` 等，用于控制iframe的行为和权限。

### iframe的优势与局限：

**优势**：
1. **隔离性**：`iframe` 中的内容与父页面是完全独立的，CSS样式和JavaScript作用域互不影响。
2. **安全性**：通过 `sandbox` 属性，可以限制iframe中内容的行为（如禁用脚本、阻止表单提交等），增加安全性。
3. **动态加载**：可以异步加载内容，提升主页面的加载性能。

**局限**：
1. **SEO**：嵌入iframe中的内容通常不会被搜索引擎抓取。
2. **用户体验**：iframe的加载速度慢、嵌入网页的交互性不强，会影响用户体验。
3. **跨域限制**：与主页面不同源的iframe会受到浏览器的跨域策略限制，难以进行父子页面之间的直接通信。

### 如何使用iframe实现微前端

微前端是一种将大型前端应用拆分为多个独立模块的方法，每个模块可以独立开发、部署和运行。`iframe` 在某些场景下可以用于实现微前端架构，因为它天生提供了独立性和隔离性，适合嵌入多个独立的子应用。

#### 用iframe实现微前端的步骤：

1. **将每个子应用独立部署**：将每个微前端应用部署为独立的URL（可以是不同的子域名或服务器路径）。
   
2. **使用iframe嵌入子应用**：在主应用中使用 `iframe` 元素将各个子应用嵌入。每个 `iframe` 对应一个微前端子应用。

   ```html
   <iframe src="https://micro-frontend-1.com" width="100%" height="800"></iframe>
   <iframe src="https://micro-frontend-2.com" width="100%" height="800"></iframe>
   ```

3. **处理跨应用通信**：
   - 子应用和主应用可以使用 `postMessage` 进行跨域通信。`postMessage` 是HTML5中用于不同窗口或 `iframe` 之间安全通信的API。
   
   例子：
   ```javascript
   // 父应用向iframe发送消息
   document.querySelector('iframe').contentWindow.postMessage('Hello from parent', 'https://micro-frontend-1.com');
   
   // iframe中的子应用监听消息
   window.addEventListener('message', function(event) {
       if (event.origin === 'https://parent-app.com') {
           console.log('Message from parent:', event.data);
       }
   });
   ```

4. **隔离与安全**：通过 `sandbox` 属性，可以更细粒度地控制iframe子应用的权限，例如：
   ```html
   <iframe src="https://micro-frontend-1.com" sandbox="allow-scripts"></iframe>
   ```
   这会禁用子应用中的表单提交、脚本执行等，进一步确保安全性。

### iframe实现微前端的优缺点

**优点**：
- **完全隔离**：每个iframe中的微前端子应用是独立运行的，不会受到主应用或其他子应用的影响。
- **现有系统集成**：很适合集成已有的独立系统或应用，因为iframe能嵌入不同技术栈的页面。
- **跨域支持**：可以轻松嵌入不同源的应用而不需要考虑跨域问题。

**缺点**：
- **性能问题**：多个 `iframe` 会引入多个独立的浏览器上下文，增加页面的加载时间和内存开销。
- **交互复杂性**：iframe与父页面的通信需要通过 `postMessage`，增加了开发的复杂性。
- **用户体验**：iframe内容加载时间较长，并且在内容适配上可能不如直接集成的方式流畅。

### 总结

`iframe` 虽然在微前端架构中提供了一种简单的隔离方式，但它并不是最理想的解决方案。更现代的微前端技术，如模块化加载、单页面应用路由等，能够提供更流畅的用户体验和性能优化。不过，`iframe` 在特定场景下仍然有其独特的优势，尤其是需要集成现有独立应用时。




### **`iframe` 的基本使用**

`iframe`（内嵌框架）是 HTML 标签，用于在一个网页内嵌入另一个独立的 HTML 文档。它能够把来自外部或内部的网页内容嵌入到当前页面中，并且嵌入的页面和主页面是独立的。

#### **基本语法：**

```html
<iframe src="URL"></iframe>
```

- **src**: 这个属性指定嵌入的 URL，表示 iframe 中显示的网页。

#### **例子：**
```html
<iframe src="https://www.example.com"></iframe>
```

这将会在主页面内嵌显示 `https://www.example.com` 页面。

### **`iframe` 的其他常用属性**

1. **`src`**：
   - 指定要在 `iframe` 中加载的网页 URL。

2. **`width` 和 `height`**：
   - 用来设置 `iframe` 的宽度和高度，可以使用像素（px）或者百分比（%）。
   - 示例：
     ```html
     <iframe src="https://www.example.com" width="600" height="400"></iframe>
     ```

3. **`name`**：
   - 允许为 `iframe` 命名，用于跨页面引用，如通过链接目标 `target` 指定在特定的 iframe 中打开新的页面。
   - 示例：
     ```html
     <iframe src="https://www.example.com" name="exampleIframe"></iframe>
     <a href="https://another.com" target="exampleIframe">点击在 iframe 中加载另一个页面</a>
     ```

4. **`sandbox`**：
   - 用来增强安全性，通过限制 `iframe` 中加载的内容的行为。可以防止恶意代码执行，隔离第三方内容。
   - 示例：
     ```html
     <iframe src="https://www.example.com" sandbox></iframe>
     ```

### **`sandbox` 属性详细介绍**

`sandbox` 属性主要用于限制 `iframe` 的行为，增强安全性，特别是在加载不受信任的外部内容时。`sandbox` 是一种安全机制，它提供了一种受限的执行环境。

#### **默认行为：**
当你在 `iframe` 中使用 `sandbox` 属性而没有指定任何值时，它会默认启用所有的安全限制，这意味着以下功能会被禁用：
- JavaScript 脚本的执行。
- 表单提交。
- 使用 `window.open` 进行弹出窗口操作。
- 访问同源内容。
- 访问浏览器存储，如 cookies、localStorage 等。

#### **常见的 `sandbox` 值：**

1. **`allow-same-origin`**：
   - 允许 `iframe` 中的内容与父页面共享同一个源（origin），即允许读取和写入 `iframe` 内部的内容和父页面之间的资源。
   - 没有该属性时，`iframe` 中的内容会被当作来自不同源处理，禁止与主页面进行同源交互（例如读取 cookie 或 DOM 操作）。

2. **`allow-scripts`**：
   - 允许执行 `iframe` 内的 JavaScript 脚本。需要注意的是，如果没有 `allow-same-origin`，即使允许脚本，依然会有同源限制，不能与父页面共享资源。

3. **`allow-popups`**：
   - 允许 `iframe` 中的内容通过 JavaScript 打开新的浏览器窗口（例如 `window.open` 函数），否则弹窗功能会被禁用。

4. **`allow-forms`**：
   - 允许 `iframe` 内提交表单数据。如果没有该属性，表单提交行为会被禁止。

5. **`allow-pointer-lock`**：
   - 允许 `iframe` 内的内容使用鼠标指针锁定 API，即允许通过 JavaScript 捕获用户鼠标输入。

6. **`allow-modals`**：
   - 允许 `iframe` 使用模态对话框（如 `alert`、`prompt` 和 `confirm` 函数）。没有这个属性时，模态对话框的弹出功能会被禁用。

7. **`allow-orientation-lock`**：
   - 允许 `iframe` 内容使用屏幕方向锁定功能（通常在移动设备上使用）。

8. **`allow-presentation`**：
   - 允许 `iframe` 使用 `Presentation API`（允许页面将内容投射到外部显示设备，如电视屏幕）。

9. **`allow-top-navigation`**：
   - 允许 `iframe` 中的内容通过设置 `window.top` 改变父页面的 URL。

#### **`sandbox` 属性的组合**

`sandbox` 属性的值可以组合使用，以细粒度控制 `iframe` 的行为。例如：

```html
<iframe src="https://www.example.com" sandbox="allow-scripts allow-forms"></iframe>
```

在这个例子中，iframe 允许执行脚本和提交表单，但仍然禁用了其他功能（如弹窗、同源访问等）。

#### **安全性与 `sandbox`**

`sandbox` 机制是浏览器安全模型中的一个重要工具，尤其在涉及外部内容时。它帮助防止外部页面执行恶意操作，比如跨站点脚本攻击（XSS），并确保不受信任的内容不会对主页面造成破坏。

例如，如果你在一个网站中嵌入了来自第三方服务的广告、视频等内容，通过使用 `sandbox` 可以限制这些内容的权限，防止它们访问用户的敏感数据或执行不受控制的行为。

#### **示例：**

```html
<iframe src="https://www.example.com" sandbox="allow-scripts allow-popups"></iframe>
```

- 这个 `iframe` 允许执行 JavaScript 脚本，并且可以通过 `window.open` 打开新的弹出窗口。
- 但它禁用了表单提交、同源访问等其他功能，确保了嵌入内容的行为受到限制。

### **总结**

`iframe` 是一个非常有用的工具，允许嵌入和隔离网页内容。通过 `sandbox` 属性，开发者可以为 `iframe` 中的内容设置严格的安全限制，以减少潜在的安全风险。这尤其适用于在页面中加载第三方内容或不受信任的资源。

如果你对某个特定用例或者某些特定属性有更深入的疑问，可以随时告诉我！