---
updateTime: "2024-11-21 10:30"
desc: "jotai优势"
tags: "jotai"
outline: deep
---
# jotai优势

核心atom通过“原子”来管理状态。这种方法与传统 Redux 或 MobX 的方式不同，更轻量、直观，并充分利用了 React 的特性。

---

### **Jotai 相对于其他状态管理工具的优点**

#### **1. 简单直观**
- **无样板代码 (Boilerplate-free)**：
  - 传统的 Redux 需要编写 action、reducer 和 store 配置，而 Jotai 使用简单的 `atom` 定义状态。
  - 例子：
    ```javascript
    import { atom } from 'jotai';

    const countAtom = atom(0); // 定义一个简单的状态
    ```
- 在组件中直接使用 `useAtom`，无需额外复杂的 setup。
  ```javascript
  import { useAtom } from 'jotai';
  
  function Counter() {
    const [count, setCount] = useAtom(countAtom);
    return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
  }
  ```

#### **2. 与 React 的紧密集成**
- Jotai 的设计与 React 的 `useState` 非常相似，因此学习曲线非常低。
- 通过 React 的 Context 特性管理全局状态，无需外部中间件。

#### **3. 精细化更新**
- Jotai 支持**按需渲染**，只有与特定 `atom` 相关联的组件会在状态变化时更新。
  - 例如，Redux 的 connect 或全局 store 通常需要优化避免不必要的重渲染，而 Jotai 天然避免了这些问题。

#### **4. 强大的组合能力**
- Jotai 支持将多个 atom 组合成一个衍生状态 (`derived atom`)。
  ```javascript
  const doubleCountAtom = atom((get) => get(countAtom) * 2);
  ```
  - `derived atom` 仅在依赖的 atom 改变时重新计算，类似于 Recoil 的 Selector 或 MobX 的计算属性。

#### **5. 类型安全**
- Jotai 原生支持 TypeScript，`atom` 的类型推导直观而友好。

#### **6. 插件生态**
- Jotai 的社区不断壮大，提供了如 Redux DevTools 集成、持久化状态、异步状态等实用扩展。
- 示例：持久化状态
  ```javascript
  import { atomWithStorage } from 'jotai/utils';

  const persistentAtom = atomWithStorage('myKey', 0);
  ```

#### **7. 小巧轻量**
- Jotai 的核心只有 **3kb**，适合轻量级应用，也能在复杂项目中保持性能稳定。

---

### **为什么选择 Jotai？**

#### **适用场景**
1. **轻量级项目**
   - 如果你的项目需要简单的状态管理（比如计数器、表单状态），Jotai 的学习成本和维护成本非常低。
2. **需要精细化性能优化的场景**
   - 在页面中存在大量状态变化、需要精确控制渲染的场景（例如复杂的表单或实时数据更新），Jotai 是理想选择。
3. **状态依赖复杂**
   - 如果项目中存在大量衍生状态或依赖链较长的场景（如计算属性或嵌套数据流），Jotai 的 `derived atom` 能帮助管理复杂逻辑。
4. **React Context 性能瓶颈**
   - 在使用 React Context 遇到性能问题时，可以用 Jotai 替代它以实现更精细化的控制。

#### **相较其他工具的特点**
| 特性         | Jotai              | Redux                     | MobX               | Recoil             |
|--------------|--------------------|---------------------------|--------------------|--------------------|
| 学习成本     | 低                 | 高                        | 中                 | 中                 |
| 核心体积     | **3kb**            | 14kb                      | 50kb               | 8kb                |
| 按需渲染     | **默认支持**        | 手动优化                  | 默认支持           | 默认支持           |
| 状态结构     | 原子化              | 全局 store                | 响应式数据          | 原子化             |
| 类型支持     | 强                 | 中等                      | 中等               | 中等               |
| 社区和生态   | 逐渐成长           | 成熟                      | 成熟               | 成长中             |

---

### **在什么场景下更适合用 Jotai？**

1. **中小型项目：**
   - 比如个人项目或 MVP 开发，避免为 Redux 等工具配置繁琐的生态系统。

2. **组件间独立状态：**
   - 例如表单字段的单独状态，避免全局管理器的状态污染。

3. **需要复杂状态依赖：**
   - 如计算用户余额、筛选数据等，Jotai 的 `derived atom` 可帮助管理逻辑。

4. **React 优先的团队：**
   - 如果团队熟悉 React Hooks，Jotai 的使用体验无缝衔接。

5. **性能敏感的 UI：**
   - 页面上有大量交互或实时数据变化（如股票行情或聊天应用）。

---