---
updateTime: "2024-7-1 09:30"
desc: "React 0基础入门"
tags: "React"
outline: deep
---

# 引入：
## JSX语法：
==**JSX** 是 JavaScript 语法扩展，将Html标签引入 JavaScript。*在 React 中，渲染逻辑和标签共同存在于同一个地方——组件。*==
Q：为什么用JSX？
A：因为渲染逻辑JS和标签HTML是紧密相关的。所以 React 将它们存放在一个组件中。
摘要：JSX 类似 HTML，不过有一些区别。如果需要的话可以使用 [转化器](https://transform.tools/html-to-jsx) 将 HTML 转化为 JSX。错误提示通常会指引你将标签修改为正确的格式。

### JSX规则：
#### 1.只能返回一个根元素
如果想要在一个组件中包含多个元素，**需要用一个父标签把它们包裹起来**。
例如，你可以使用一个 `<div>` 标签：
```jsx
<div>  
<h1>海蒂·拉玛的待办事项</h1>
<img     src="https://i.imgur.com/yXOvdOSs.jpg"     alt="Hedy Lamarr"     class="photo"  > 
<ul>    ...  </ul>
</div>
```
如果你不想在标签中增加一个额外的 `<div>`，可以用 `<>` 和 `</>` 元素来代替：
这个空标签被称作 _[Fragment](https://react.docschina.org/reference/react/Fragment)_。React Fragment 允许你将子元素分组，而不会在 HTML 结构中添加额外节点。

###### Q：为什么多个 JSX 标签需要被一个父元素包裹？
A：JSX 虽然看起来很像 HTML，但在底层其实被转化为了 JavaScript 对象，你不能在一个函数中返回多个对象，除非用一个数组把他们包装起来。这就是为什么多个 JSX 标签必须要用一个父元素或者 Fragment 来包裹。

#### 2.标签必须闭合</>
像 `<img>` 这样的自闭合标签必须书写成 `<img />`，而像 `<li>oranges` 这样只有开始标签的元素必须带有闭合标签，需要改为 `<li>oranges</li>`。
```jsx
<>  
<h1>海蒂·拉玛的待办事项</h1>  
<img  
src="https://i.imgur.com/yXOvdOSs.jpg"  
alt="Hedy Lamarr"  
class="photo"  
/>  
<ul>
<li>发明一种新式交通信号灯</li>  
<li>排练一个电影场景</li>  
<li>改进频谱技术</li> 
</ul>  
</>
```
#### 3. 使用驼峰式命名法给 ~~所有~~ 大部分属性命名！
变量名称不能包含 `-` 符号或者像 `class` 这样的保留字。
需要用 `strokeWidth` 代替 `stroke-width`。由于 `class` 是一个保留字，所以在 React 中需要用 `className` 来代替。

### 在 JSX 中通过大括号使用 JavaScript：
- 引号传递字符串
- 大括号引用 JavaScript 变量
- 大括号调用 JavaScript 函数
- 大括号内使用 JavaScript 对象
#### 1.用引号传递字符串：(' ')(" ")
```jsx
<img
      className="avatar"
      src="https://i.imgur.com/7vQD0fPs.jpg"
      alt="Gregorio Y. Zara"
    />
```
#### 2.用大括号传递变量(属性）（{}）：
```jsx
export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = 'Gregorio Y. Zara';
  const name ='Sue';
  return (
  <h1>{name}'s To Do List</h1>
    <img
      className="avatar"
      src={avatar}
      alt={description}
    />
  );
}
```
#### 3.大括号调用函数（{}）：
```jsx
const today =new Date();//today对象获取今天日期
function formatDate(date){//这个函数式方法把当前日期格式化为中文字符串
    return new Intl.DateTimeFormat(
    'zh-CN',// 指定区域设置为中文（中国）
    {weekday:'long'}// 指定格式选项为长格式的星期几
    ).formate(date);// 使用 format 方法格式化传入的日期对象
}
export default function ToDoList(){
   return(
      <h1>To Do List for {formateDate(today)}</h1>
   )
}
```
#### 4.双大括号{{}}:CSS和对象：
```jsx
export default function TodoList() {
  return (
    <ul style={{
      backgroundColor: 'black',
      color: 'pink'
    }}>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}
```
```jsx
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <ul>
        <li>Improve the videophone</li>
      </ul>
    </div>
  );
}
```

## Props（信息）：
定义：Props是组件的唯一参数，是传递给JSX的标签*信息*，作用与函数的参数相同。例如，`className`、`src`、`alt`、`width` 和 `height` 便是一些可以传递给 `<img>` 的 props。  

### 1.父组件向子组件传递props,子组件从父组件中读取props：
```jsx
export default function Profile(){
  return (
  <Avator 
  person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}  
  size={100}/>
  );
}
function Avatar({ person, size }) {  
// 在这里 person 和 size 是可访问的， Prop可以指定默认值：size=100 
return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
}
```
```jsx
#陷阱
在声明 props 时,不要忘记 `(` 和 `)` 之间的一对花括号 `{` 和 `}` ：
function Avatar({ person, size }) {  // ...}
这种语法被称为 [“解构”]等价于于从函数参数中读取属性：
function Avatar(props) {  
let person = props.person; 
let size = props.size;
}
```
### 2.JSX展开语法传递props：
```jsx
function Profile(props) {  
return (  
<div className="card">  
<Avatar {...props} />  
</div>  
);  
}
```
### 3.将JSX作为子组件传递：
嵌套浏览器内置标签是很常见：
```jsx
<div>  <img /></div>
```
有时你会希望以相同的方式嵌套自己的组件：
```jsx
<Card>  <Avatar /></Card>
```
嵌套组件实例：
```jsx  Avatar.js
export function getImageUrl(person, size = 's') {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}

import { getImageUrl } from './utils.js';
export default function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}
```
```jsx App.js
import Avatar from './Avatar.js';
function Card({ children }) {//将一个子组件当成props传递给Card
  return (
    <div className="card">
      {children}
    </div>
  );
}
export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}
```
![[Pasted image 20240626023114.png]]
### 3.props如何随时间变化：
![[Pasted image 20240626023200.png]]
==props不是静态的，组件可能会随时间变化收到不同的props。==
==props不能改变，可以设置state来响应用户输入。==

## 根组件 App.js
==组件名称首字母必须大写==
## 导入导出：具名 默认
**一个文件里有且仅有一个 _默认_ 导出，但是可以有任意多个 _具名_ 导出。**
![[Pasted image 20240625141515.png]]










# 第一个组件：
1. **创建** 一个新的 JS 文件来存放该组件。
2. **导出** 该文件中的函数组件（可以使用 [默认导出](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#using_the_default_export) 或 [具名导出](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#using_named_exports)）
3. 在需要使用该组件的文件中 **导入**（可以根据相应的导出方式使用 [默认导入](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import#importing_defaults) 或 [具名导入](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import#import_a_single_export_from_a_module)）。
4. 在 `App` 组件里 **渲染** 组件。

##### 示例：

| 语法  | 导出语句                                  | 导入语句                                    |
| --- | ------------------------------------- | --------------------------------------- |
| 默认  | `export default function Button() {}` | `import Button from './Button.js';`     |
| 具名  | `export function Button() {}`         | `import { Button } from './Button.js';` |
![[Pasted image 20240625142532.png]]
![[Pasted image 20240625142546.png]]
![[Pasted image 20240625142600.png]]

# 条件渲染：
## 1.条件返回JSX（if/else)、选择性返回null、三目运算符`? :` 、与运算符&&：
```jsx
if(isPacked){
   return <li className="item">{name}✔</li>//被打包好的物品打钩
}return <li className="item">{name}</li>;

if(isPacked){
 return null;//被打包好就不显示在清单里面
}return <li className="item">{name}</li>;


return(
 <li className="item">
   {isPacked ? name + '✔' :name}
   //判断是否打包？如果打包就名字打钩 ：没有就名字
)

return(
 <li className="item">
   {name}{isPacked && '✔'}//左侧判断true，右侧为返回值
   //当 `isPacked` 为真值时，则（`&&`）渲染勾选符号，否则，不渲染。
 </li>
)
```
## 2.赋值给变量：
默认值给变量，判断条件，为真是重新赋值
```jsx
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = name + " ✔";
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
}
export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="宇航服" 
        />
        <Item 
          isPacked={true} 
          name="带金箔的头盔" 
        />
        <Item 
          isPacked={false} 
          name="Tam 的照片" 
        />
      </ul>
    </section>
  );
}
```
# 渲染列表：
1.首先把数据储存到数组中 Data.js（结构化储存）
```jsx
export const people = [
  {
    id: 0,
    name: '凯瑟琳·约翰逊',
    profession: '数学家',
    accomplishment: '太空飞行相关数值的核算',
    imageId: 'MK3eW3A',
  },
  {
    id: 1,
    name: '马里奥·莫利纳',
    profession: '化学家',
    accomplishment: '北极臭氧空洞的发现',
    imageId: 'mynHUSa',
  },
  {
    id: 2,
    name: '穆罕默德·阿卜杜勒·萨拉姆',
    profession: '物理学家',
    accomplishment: '关于基本粒子间弱相互作用和电磁相互作用的统一理论',
    imageId: 'bE7W1ji',
  },
  {
    id: 3,
    name: '珀西·莱温·朱利亚',
    profession: '化学家',
    accomplishment: '开创性的可的松药物、类固醇和避孕药',
    imageId: 'IOjWm71',
  },
  {
    id: 4,
    name: '苏布拉马尼扬·钱德拉塞卡',
    profession: '天体物理学家',
    accomplishment: '白矮星质量计算',
    imageId: 'lrWQx8l',
  },
];
```

2.遍历数组中每一项`map()` 方法来生成一组相似的组件
```jsx
const listItems = people.map(person => <li>{person}</li>);
```

3.`filter()` 方法筛选数组
```jsx
 const chemists = people.filter(person =>
    person.profession === '化学家'
  );
  const everyoneElse = people.filter(person =>
    person.profession !== '化学家'
  );
```

4.集合中的每个组件设置一个 `key` 值， `key` 保持列表项的顺序：它使 React 能追踪这些组件，即便后者的位置或数据发生了变化。
```jsx
<li key={person.id}>...</li>
```

### 陷阱
因为箭头函数会隐式地返回位于 `=>` 之后的表达式，所以你可以省略 `return` 语句。
```jsx
const listItems = chemists.map(person =>  <li>...</li> // 隐式地返回！);
```

不过，**如果你的 `=>` 后面跟了一对花括号 `{` ，那你必须使用 `return` 来指定返回值！**

```jsx
const listItems = chemists.map(person => { // 花括号  return <li>...</li>;});
```

箭头函数 `=> {` 后面的部分被称为 [“块函数体”](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions#function_body)，块函数体支持多行代码的写法，但要用 `return` 语句才能指定返回值。假如你忘了写 `return`，那这个函数什么都不会返回！
直接看官网的四个例题：[渲染列表 – React 中文文档 (docschina.org)](https://react.docschina.org/learn/rendering-lists)
# 组件纯粹（纯函数：组件作为公式）
组件和数学公式一样
- **只负责自己的任务**。不改变函数作用域外的变量、或在函数调用前创建的对象
- **输入相同，则输出相同**。给定相同的输入，纯函数应总是返回相同的结果。
局部突变mutation：组件改变了预先存在的变量值。
- 不应该改变任何用于组件渲染的输入。==**这包括 props、state 和 context**==。通过 [“设置” state](https://react.docschina.org/learn/state-a-components-memory) 来更新界面，而不要改变预先存在的对象。
- 在返回的 JSX 中表达组件逻辑。需要“改变事物”时，事件处理程序中进行使用 `useEffect`。
做例题：[保持组件纯粹 – React 中文文档 (docschina.org)](https://react.docschina.org/learn/keeping-components-pure)
# 将 UI 视为树
![[Pasted image 20240626040949.png]]
![[Pasted image 20240626041047.png]]
每个节点代表一个组件。`App`、`FancyText`、`Copyright` 等都是我们树中的节点。
根节点是应用程序的 [根组件](https://react.docschina.org/learn/importing-and-exporting-components#the-root-component-file)。根组件是 `App`，是 React 渲染的第一个组件。树中的每个箭头从父组件指向子组件。
![[Pasted image 20240626041435.png]]
![[Pasted image 20240626041611.png]]
树的根节点是根模块，入口文件，包含根组件的模块。
与同一应用程序的渲染树相比，存在相似的结构，但也有一些显著的差异：
- 构成树的节点代表模块，而不是组件。
- 非组件模块，如 `inspirations.js`，在这个树中也有所体现。渲染树仅封装组件。
- `Copyright.js` 出现在 `App.js` 下，但在渲染树中，`Copyright` 作为 `InspirationGenerator` 的子组件出现。这是因为 `InspirationGenerator` 接受 JSX 作为 [children props](https://react.docschina.org/learn/passing-props-to-a-component#passing-jsx-as-children)，因此它将 `Copyright` 作为子组件渲染，但不导入该模块。
## 摘要（官网的我直接抄了）
- 树是表示实体之间关系的常见方式，用于建模 UI。
- 渲染树表示单次渲染中 React 组件之间的嵌套关系。
- 使用条件渲染，渲染树可能会在不同的渲染过程中发生变化。使用不同的属性值，组件可能会渲染不同的子组件。
- 渲染树有助于识别顶级组件和叶子组件。顶级组件会影响其下所有组件的渲染性能，而叶子组件通常会频繁重新渲染。识别它们有助于理解和调试渲染性能问题。
- 依赖树表示 React 应用程序中的模块依赖关系。
- 构建工具使用依赖树来捆绑必要的代码以部署应用程序。
- 依赖树有助于调试大型捆绑包带来的渲染速度过慢的问题，以及发现哪些捆绑代码可以被优化。



