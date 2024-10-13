---
updateTime: "2024-7-1 09:30"
desc: "TypeScript 入门"
tags: "TypeScript"
outline: deep
---

## 课题拆解

这一课题可以拆解为「TypeScript 是什么，为什么需要它」，「TypeScript 提供了哪些能力」以及「如何基于这些能力进行可维护性编程」。

在前言部分，我们将介绍 TypeScript 的出现背景，讨论它是为了解决什么样的问题而设计的，以及它是如何解决这些问题的。这将帮助读者理解 TypeScript 的设计初衷和它在现代开发中的价值。

接下来，我们将重点讨论如何将 TypeScript 的这些能力应用于可维护性编程，既构建对TypeScript 应用场景的基础认知，这有助于在具体的编程实践中更好地应用 TypeScript 的特性，提高系统的可维护性。

## 引言

JS 设计上的缺陷导致它无法适应大型和复杂的项目

1. 动态类型语言，缺乏静态类型定义，变量和代码的类型在运行时才确定
2. 缺少泛型等高级特性，制约了在类型抽象和代码复用方面的能力，限制了它在大规模项目上代码组织的能力
3. 解释型语言，缺乏静态类型检查，仅在运行时发现问题

TS 建立在 JS 的基础上，旨在解决 JS 在大型应用和复杂项目开发中的缺陷

1. **静态类型系统**：引入了静态类型定义，这意味着变量和函数的类型在编写代码时就已确定，而不是在代码运行时
2. **支持**泛型编程、接口、枚举和命名空间等**高级特性**：泛型编程允许开发者编写灵活且可重用的代码组件，接口可以用于定义对象的形状，枚举提供了一种组织相关常量的方式，而命名空间可以帮助避免全局命名冲突......这些特性对于构建大型、高度可维护的代码库尤其有用
3. **编译型语言**：可在编译时进行类型检查和错误提示，帮助开发者提前发现问题

TS 通过这些特性提升了代码的安全性、可读性和维护性，使得开发复杂的应用程序和库更加可靠和便利。

此外，由于 TS 是 JS 的超集，它支持所有 JS 的特性，因此任何有效的 JS 代码也可以在 TS 中无缝运行。这意味着开发者可以逐步迁移到 TS，而无需对现有的 JS 代码库进行重写。

## 用好类型定义

### 类型汇总

#### 基本类型

|   |   |
|---|---|
|类型|定义|
|string|```<br>const type1 : string = '123';<br>```|
|number|```<br>const type2 : number = 123;<br>```|
|boolean|```<br>const type3 : boolean = true;<br>```|
|undefined|```<br>const type4 : undefined = undefined;<br>```|
|null|```<br>const type5 : null = null;<br>```|
|bigint|```<br>const type6: bigint = 9007199254740991n;<br>// const type6: bigint = BigInt(9007199254740991);<br>```|
|symbol|```<br>const type7: symbol = Symbol('unique');<br>```|

**重点：为什么需要**`**any**`**和**`**unknow**`**类型**

1. any 用于当前变量允许任何类型，意味着关闭对这个变量的类型检查，这应该是你在无法确定类型时的最后选择。

1. 应用场景

1. 处理来自不同源头、类型不确定的数据
2. 当你需要逐步迁移 JavaScript 代码到 TypeScript 时

2. 赋值：any 类型可以再次被赋值为所有类型，同时也能赋值给所有类型。

2. unknow 用于当一个变量的类型未知时，它要求你必须先执行类型断言或类型守卫，确定其类型之后，才能对该变量执行操作。这增加了类型安全，因为你被迫明确变量的类型，而不是盲目地执行操作。

1. 应用场景

1. 处理动态数据或来自外部源的数据

2. 赋值：`unknow`类型可以再次被赋值为所有类型，但只能赋值给 `any`和`unknow`类型。

总而言之，**any 类型和 unknown 类型是 TypeScript 提供的灵活性和兼容性的机制**，用于处理不确定或未知的值。然而，为了提高代码的可靠性和可维护性，**应该尽量避免过度使用 any 类型**，并在能确定类型的情况下使用更具体的类型。而 unknown 类型则提供了更严格的类型安全性，要求进行类型检查和类型断言，以确保类型安全。

#### 引用类型

##### 元组和数组

定长的数组。但使用元组可以帮助我们进一步提升**数组结构的严谨性**，包括基于位置的类型标注、避免出现越界访问等等。

```
const arr1: [string, number ] = ['xiaohe', 18];

console.log(arr1[599]); //长度为“2”的元组类型“[string, string, string]”在索引“599“处没有元素
```

##### 装箱类型

**装箱**

在我们定一个 string 类型时，我们有时候会去访问`substring`方法，有没有想过为什么一个基本类型下面怎么挂载着属性和方法，其实这都归究于 ts 的装箱。

```
var s1 = 'call_me_R'; // 隐式装箱
var s2 = s1.substring(2);

// 隐式装箱当读取一个基本类型值时，后台会创建一个该基本类型所对应的基本包装类型对象。在这个基本类型的对象上调用方法，
// 其实就是在这个基本类型对象上调用方法。这个基本类型的对象是临时的，它只存在于方法调用那一行代码执行的瞬间，执行方法后立即被销毁。
```

  

**装箱类型**

![](https://cdn.nlark.com/yuque/0/2024/png/34717503/1711375600006-75f684cb-f9ad-41be-ada3-f92171ed7ef3.png)

像这样的类似的装箱类型还有 Boolean、Number、String、Symbol 等等。只要在非严格模式下装箱类型都可以赋值为 undefined 、null 、void 0 这个三种超预期的类型，这是我们需要注意的点

#### 内置工具类型

##### 联合类型（｜）

联合类型中是一种允许一个值可以是多种类型的类型系统特性，给项目带来了**灵活性**和**代码复用性**。

应用场景：

类型的整体结构已确定，需要处理不同的选择分支和多种返回值类型

```
type ProductType = 'Device' | 'Normal';

function processColor(type: ProductType) {
  // 公共逻辑的处理
  if (type === 'Device') {
    // 执行设备商品逻辑
  } else {
    // 执行普通商品逻辑
  }
}
```

##### 交叉类型（&）

交叉类型允许你将多个类型合并为一个新类型，合理的使用它可以给代码带来它可以给代码带来清晰性和可读性。

在使用交叉类型时需保证两个前提**明确意图**和**保持简洁，**需确保意图是明确的在把多个类型组合在一起时，应该避免创建过于复杂的类型，应该使类型变得更加容易理解。如果交叉类型使得类型定义变得难以阅读或维护，那么可能需要重新考虑下类型的设计。

应用场景：

例如一个很常见的首页金刚位场景为例，前端需要在本地存一份菜单配置类型，但还需要通过后端接口拿到实时计算的进度描述信息、提醒数量等数据配置类型，最终将这**两个模块类型**合并在一起形成最终的结构体：

```
// 本地配置信息
export interface BaseGoldEntryItemConfig {
  menuCode?: MenuCode;
  /** 菜单名称 */
  title: string;
  /** 描述 */
  desc?: string;
  /** 图标链接 */
  iconUrl: string;
  /** 主题颜色 */
  color?: string;
  /** 点击埋点 */
  eventClickName?: string;
  /** 跳转目标 URL */
  targetUrl?: string;
  /** 子分组菜单 */
  children?: Array<Omit<BaseGoldEntryItemConfig, 'children'>>;
}

// 服务端数据
export interface HomeMenuItem {
  /** 菜单编码 */
  code?: MenuCode;
  /** 菜单名称 */
  name?: string;
  /** 菜单描述 */
  desc?: string;
  /** 是否有菜单权限，默认有 */
  accessFlag?: boolean;
  /** 是否需要展示引导（用户已有培训记录则不需要展示） */
  needGuided?: boolean;
  /** 提示数量 */
  noticeNum?: number
}

export type GoldEntryItemConfig = HomeMenuItem & BaseGoldEntryItemConfig;
```

##### 索引类型

索引类型不是一种特定的类型工具，在于**提供一种类型安全的访问和操作对象属性或元组元素的方式**。它包括三个部分：索引签名类型、索引类型查询、索引类型访问。它们都是通过索引的形式进行类型操作，**但「索引签名类型」是「声明」的形式，后两者是「读取」**。

应用场景：主要是在**暂时支持对类型未明确属性的访问**，此后再一步步完善（而不是用 Record<string,any> 以偏概全）。

有时当我们给没有 TS 定义的三方纯 JS 库封装 React 组件时，需要给组件的类实例方法写一些 TS 类型定义，以方便业务工程调用。但是我们不可能覆盖到所有成员的类型定义，往往只会加入常用的成员的类型定义，这时我们可以使用索引类型来跳过未明确属性的强校验，使得业务项目中即使用到了没有显式声明的实例成员，也不需要组件添加定义重新发版。而当后续业务工程中更新了完善类型后的组件库版本，就可以无缝接入 TS 类型定义了。

```
export interface VideoPlayerEntity {
  /** 视频时长 */
  duration: number;
  /** 视频当前播放时间 */
  currentTime: number;
  /** 销毁播放器实例 */
  destroy: () => void;
  /**
   * 跳转到指定时间
   * @deprecated 可能存在兼容性问题，尽量不要使用
   */
  seek: (time: number) => void;
  /** 暂停播放 */
  pause: () => void;
  /** 开始播放 */
  play: () => void;
  /** 事件监听 */
  on: (event: string, callback: (data: any) => void) => void;
  /** video 元素 */
  $video: HTMLVideoElement;
  /** 不做强校验 */
  [key: string]: any;
}

const player = useRef<VideoPlayerEntity>(null)

player.seek() // 会划删除线提示已废弃
player.exitFullscreen() // 未显式声明但可以正常调用
```

此外，在对组件进行传参时，使用索引访问也往往可以帮助我们减少重复定义”

```
const columns: TableProps['columns'] = []

const onFieldsChange: FormProps['onFieldsChange'] = () => {}
```

##### 映射类型（in）

映射类型的主要作用即是**基于键名映射到键值类型**。通常与映射操作符（keyof、in、as const 等）、extends 、索引类型一起使用。

应用场景：

1. 对键名进行修饰

```
type MyObject = { a: number; b: string; c: boolean };
type MyObjectReadonly = { readonly [K in keyof MyObject]: MyObject[K] };
```

2. 结合条件类型生成一个具有含义的新类型

```
type IsString<T> = T extends string ? true : false;
type MyStringType = { [K in keyof string]: IsString<T[K]> };
```

##### 条件类型（extends）

条件类型允许**基于类型系统中的类型条件来创建新类型**，使得类型可以根据某个条件来决定其最终的形式。这种类型的引入极大地增强了 TypeScript 表达力和类型安全性。

```
import { ModalProps } from 'antd';

type Pattern = 'add' | 'edit'

export interface AddOrEditModalProps<T extends Pattern> extends ModalProps {
  type?: T;
  id: T extends 'edit' ? string :never
}
```

##### 模版字符串类型

TypeScript 可以识别模版字符串语法，故有了模版字符串类型

```
type Greet<T extends string | number | boolean | null | undefined | bigint> = `Hello ${T}`;

// 对于模版字符串支持的范型只有 string | number | boolean | null | undefined | bigint 
```

当对**字符串的构成有着一定的结构形式**，我们就可以借助模版字符串类型，利用其**自动分发的特性**来实现这样可以减少手写类型声明，提高代码可读性，让代码变得更好维护。

```
// 不借助模版字符串
type Placement = 'top' | 'left' | 'right' | 'bottom'
  | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'left-top'
  | 'left-bottom' | 'right-top' | 'right-bottom'

// 利用模版字符串
type Horizontal = "left" | "right"
type Vertical = "top" | "bottom"
type Placement = `${Vertical}-${Horizontal}` | `${Horizontal}-${Vertical}` 
    | Vertical | Horizontal

```

### 类型特殊状态-字面量（as const）

字面量类型在于提供了**一种强类型的约束**，确保变量或函数参数只能接受特定的值。提高代码的精确性和可预测性，同时也使得代码更加清晰和易于维护。

1. **减少魔法字符串的使用:** "魔法字符串"（即硬编码的字符串常量）常常被用来表示特定的状态或值。使用字面量类型可以避免这种情况，因为每个字符串都是一个明确的枚举值，这样可以减少错误和提高代码的可维护性。
2. **有助于重构:** 当你需要修改代码以适应新的需求时，字面量类型可以提供额外的安全网。
3. **代码清晰性:** 使用字面量类型可以明确地表达代码的意图，让其他开发者更容易理解代码的功能和限制。

应用场景：

1. **组件的属性：**在一些组件 props 的设计中可以用字面量类型，来确保预期的值
2. **规范设计上：**API 中 methods 的参数类型
3. **开关和枚举：**定义配置选项或状态标志

### 类型实践

#### type 和 interface

**应用场景**：

1. 只能用 type（interface 无法使用对这几种类型进行直接定义）

1. 定义基础类型
2. 定义元组
3. 定义联合类型
4. 使用 in 关键字动态生成属性（Interface 的索引值必须是 string 或 number 类型，所以 Interface 并不支持动态生成属性）

```
type HZFELanguage = "JavaScript" | "Go";
type HZFEProjects = {
  [key in HZFELanguage]?: string[];
};

const hzfeProjects: HZFEProjects = {
  JavaScript: ["xx", "xx"],
};
```

2. 更建议用 type

1. 定义函数（type 可读性更好）

```
type Greeting = (name: string) => string;

interface Greeter {
  (name: string): string;
}
```

3. 其他情况都用 interface

总的来说：type 虽然可以用于定义对象类型，但它真正的强大之处在于定义联合类型、交叉类型、元组类型等更复杂的类型结构，同时不支持二次编辑，约束性更强，**适合用在定义组件的 props 属性**。 interface 用于定义对象的形状，**更适合在公共 API 的时候使用**，因为它们更易于扩展和重用。

#### 全局定义

1. 全局定义是什么？

如果这个文件被 typeScript 引用，且该文件不包含 `import 、export` ，那么这个文件中包含的 `declare & interface & type` 就会变成全局声明。反之如果这个文件包含了 `import 、export`，那么这个文件包含的 `declare & interface & type` 则会是局部声明，不会影响到全局声明。

```
// type.d.ts  全局声明
declare namespace Jye {
  interface Info {
    name: string;
    age: number;
  }

  function getAge(): number;
}

// index.ts
const a: Jye.Info = {
  name: '123',
  age: 1,
};
```

```
//type.d.ts 局部声明
 declare namespace Jye {
    export  interface Info {
      name: string;
      age: number;
    }
   
    function getAge(): number;
}

// index.ts
let settings: Jye.Info = {  // 找不到命名空间“Jye”。ts(2503)
  name: 'jye',
  age: 8,
};

Jye.getAge(); // 找不到命名空间“Jye”。ts(2503)
```

2. 使用和管理全局定义

全局声明会向整个 ts 项目添加全局的类型、接口等，因此需要考虑命名冲突等问题。如果需要声明全局类型，也应该统一放在 global.d.ts 中进行管理，而不是在模块文件中通过 declare namespace global 随意注册全局类型。在类型定义中存在 declare module、declare namepsace、三斜线指令、import/export等各种模块声明方式，整理下来不禁感慨，ts也残留了很多历史问题，整个模块管理比较混乱。感觉还是统一使用ES6模块最稳妥，类型来源、依赖都一清二楚，也不用考虑命名冲突等问题。至于频繁import多些几行代码的问题，在项目可维护性面前，应该是无足轻重的。

## 用好高级特性

### 静态类型系统

#### 接口和类型别名（Interfaces and Type Aliases）

详见 用好类型定义-类型实践-type 和 interface

#### 类型工具和关键字

一个思路：让有内在联系的类型通过类型工具建立起类型上的联系

利用内置的一些工具类型，我们可以非常简单地通过已有类型构造出一个新的类型：

1. `Record`

```
type PageType = "ADD" | "EDIT" | "COPY"

// 构建模板代码
export const DESC_MAP: Record<PageType, string> = {
  ADD: "新建",
  EDIT: "编辑",
  COPY: "复制",
};
```

2. `Omit`

```
export interface Config {
  initialized: boolean;
  render: (component: React.ReactElement, dom: HTMLElement) => void;
}

// 初始化的时候不能直接修改 `initialized` 字段
export const init = (config: Omit<Config, 'initialized'>) => {};
```

3. `Pick`

```
// 通过已有类型提取出新的类型，以表明两者存在一定的内在联系
export type RawData = Pick<QuestionItem, 'pictureUrl' | 'videoUrl'>;

export const formatRawData = (value: UploadFile[]): RawData => {
  return {
    pictureUrl: value?.filter(({ type }) => type === 'image').map(({ url }) => url),
    videoUrl: value?.filter(({ type }) => type === 'video').map(({ url }) => url),
  };
};
```

4. `Partial`

```
// 更新的时候一般做合并操作，因此可以传入不全的参数
function updateData(data: Partial<DataType>) {}
```

5. `keyof`

```
import { AssignmentCommitParams } from '@/service/assignment/types';

export interface BaseAssignmentParams {}

// 用于从提交参数中过滤掉基础参数
export type ExtraCommitParams = Omit<AssignmentCommitParams, keyof BaseAssignmentParams>;
```

#### 泛型（Generics）

泛型是一种工具。它能让开发者不在定义时指定类型，而在使用时指定类型。

利用泛型，我们可以创建可复用的组件，减少代码冗余，保持类型一致性。

##### 组件的复用性与可维护性

当我们在编写可复用组件时，往往不会把数据源的字段写死某些类型，而是通过对入参使用泛型声明类型，可以不仅可以在编译时确认组件的调用方式是否符合预期，并且可以使组件的类型提示更加完善，例如下面的这个组件：

```
export interface BaseDraggableItemType {
  sort?: number;
}

export interface DraggableCardProps<T extends BaseDraggableItemType = BaseDraggableItemType> {
  item: T;
  accessFlag: string;
  onSort: (dragItem: T, dropItem: T) => void;
}
```

TS 对于传入的 `item` 自动判断出了泛型 `T` 的类型， 并且在 `onSort` 函数中也展示出了泛型的类型。

![](https://cdn.nlark.com/yuque/0/2024/png/22950883/1711345823926-cbb514b6-a2cb-4b0d-b90d-3e0a967c648d.png)

如果传入的 `item` 不满足泛型约束，则会产生报错，可以让我们从编译时知晓组件调用方式的正确性。

因此在编写组件时，应当使用泛型对于外部入参进行约束，可以提高组件的可复用性以及可维护性

##### 优化冗余代码

在前端开发的领域中，一个非常常见的泛型使用场景就是接口定义的结构化出入参，对于**与后端有接口格式的统一约定**的前提下，可以编写泛型接口来优化字段定义时的大量冗余样板代码，常见场景如分页列表的请求和响应体结构：

```
/** 基础分页接口响应类型定义 */
export interface BasePageResponse<T> {
  page?: {
    curPage?: number;
    pageSize?: number;
    totalSize?: number;
    lastPage?: boolean;
    firstPage?: boolean;
    totalPage?: number;
  };
  dataSize?: number;
  data?: T[];
}

/** 基础分页接口请求类型定义 */
export type BasePageRequest<T> = T & {
  /** 分页参数 */
  page: {
    pageNo: number;
    pageSize: number;
  };
};
```

这样我们就可以在所有分页场景下使用，而非对于每个分页接口都重复写一遍样板代码：

```
export default {
  /**
   * 查询岗位学员
   * http://yapi.iguming.net/project/2078/interface/api/248543
   */
  queryPositionTrainee: serviceHelper.define<
    // 分页响应
    BasePageResponse<t.PositionTraineeItem>,
    // 分页请求
    BasePageRequest<t.QueryPositionTraineeParams>
  >({
    url: `${NEWTON_ADMIN_PREFIX}/position/listTrainee`,
    method: 'post',
  })
}
```

### 面向对象特性的增强

#### TS 的面向对象特性

而在 ES6 Class 的基础上，TS 对类本身做了更加完善的实现，并在类型层面实现了许多面向对象的特性

##### 继承（extends）

ES 6 Class 已经基于原型链实现了类的继承，而在 TS 中，继承不仅存在于类与类之间，接口和接口之间同样存在继承关系，在封装组件时，使其继承自上层组件的 props 参数，可以让组件的可扩展性得到增强

```
import { ModalProps } from 'antd';

export interface AddOrEditModalProps extends ModalProps {
  type?: 'add' | 'edit';
}
```

不仅如此，接口还可以继承类：

```
class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

interface Point3d extends Point {
  z: number;
}
```

这是由于使用 `class` 声明类时，同时也会创建一个接口与之对应，上述代码等价于：

```
class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

interface PointInstanceType {
  x: number;
  y: number;
}

interface Point3d extends PointInstanceType {
  z: number;
}
```

接口和类之间灵活的继承关系，可以减少代码的重复编写，且显式地声明了类型之间的关系，有助于提高代码的可维护性

##### 实现（implements）

实现是面向对象中的一个重要概念。在 TS 中，一个类只能继承自另一个类，而有时候不同类之间又可以有一些共有的特性。

在 TS 中，我们可以把这些共同特性提取成单独的接口，用 `implements` 关键字来实现，其支持同时实现多个接口，而在使用 `implements` 的类同时还可以继承其他的类：

```
class Person {}

interface SchoolMember {
  schoolName: string;
}

class Student extends Person implements SchoolMember {}

interface Worker {
  work: () => void
}

// implements 支持多个接口
class Teacher extends Person implements SchoolMember,Worker {}
```

这个特性大大提高了 TS 面向对象的灵活性。

##### 成员修饰符

相较于 ES6 Class，TS 针对类的成员提供了许多新的修饰符，包括 `public`、`private`、`protected`、`readonly`、`abstract` 等，可以直接通过成员修饰符声明不同类型的成员：

```
class Parent {
  private privateMethod() {} // 私有方法

  public publicMethod() {} // 默认不加修饰符的的成员都是公共成员

  static staticMethod() {} // 静态方法

  readonly readonlyProperty // 静态属性

  protected protectedProperty // 受保护属性

  publicMethod() {
    this.privateMethod() // 可以正常调用
  }
}

const instance = new Parent()
instance.privateMethod() // 报错，调用私有方法
```

使用私有属性/方法，可以清晰地区分出类对外和对内的不同处理逻辑，防止外部误操作内部私有方法或修改私有属性，增强代码的可读性和可维护性。

此外还有 `protected`、`readonly` 等修饰符，可以控制成员是否可以被访问/被修改

编写类的相关代码时，应当在设计成员之初就明确成员的公有/私有/静态/保护/只读角色，这实际上是在明确类及其实例的职责边界

##### 抽象类（abstract class）和多态（polymorphism）

在面向对象编程中，随着抽象程度的提升，我们发现类并不一定都有其实例，因此就有了抽象类。TS 同样提供了抽象类的声明方式——使用 `abstract` 关键字声明一个抽象类：

```
abstract class Animal {
  // 实现具体的方法，方便子类复用
  sleep() {}

  // 声明抽象的方法，让子类去实现
  abstract eat(): void
}
```

抽象类的特点就是不能被实例化以及子类必须实现抽象方法，例如「动物」是一个抽象概念，其下还有狮子老虎鸡鸭鱼等具象类别，因此就很适合作为一个抽象类来做为所有动物的父类，在其中声明一些公共的方法让子类服用，并且声明抽象的方法让子类实现。

例如我们可以给 `store` 抽出一个公共类，配合自定义装饰器来实现代码的复用：

```
import Taro from '@tarojs/taro';
import { action, observable, runInAction } from 'mobx';

export function loadingAction(_, __, descriptor: PropertyDescriptor) {
  // 保存原始方法的引用
  const originalMethod = descriptor.value;

  // 重写原始方法
  descriptor.value = async function (...args: any[]) {
    try {
      this.loadingAction('start');
      // 调用原始方法
      return await originalMethod.apply(this, args);
    } finally {
      this.loadingAction('end');
    }
  };

  return descriptor;
}

export abstract class BaseStore {
  /** 加载中的接口数量 */
  @observable loadingNum = 0;

  @action.bound
  loadingAction(type: 'start' | 'end') {
    runInAction(() => {
      this.loadingNum += type === 'start' ? 1 : -1;

      if (this.loadingNum) {
        Taro.showLoading({ title: '加载中' });
      } else {
        Taro.hideLoading();
      }
    });
  }
}
```

调用时就不用重复写 loading 操作和包裹 try catch 了：

```
class XStore extends BaseStore {
  @observable data: Item[]

  @action.bound
  init() {
    this.querySomeThing()
    this.queryAnotherThing()
  }

  @action.bound
  @loadingAction
  async querySomeThing() {}

  @action.bound
  @loadingAction
  async queryAnotherThing() {}
}
```

**多态**是指同一种操作作用于不同的对象，可以有不同的解释和执行方式。

在面向对象编程中，多态通常是通过**抽象继承**和**方法重写**的方式实现的，而 TS 支持了抽象类和抽象方法的定义，使得子类可以实现抽象父类的抽象方法，因此可以实现多态。一个简单的示例如下：

```
abstract class Animal {
  abstract move(): void;
}

class Dog extends Animal {
  move() { console.log("dog move") }
}

class Cat extends Animal {
  move() { console.log("cat move") }
}

function moveAnimal(animal: Animal) {
  animal.move();
}

const dog = new Dog();
const cat = new Cat();

moveAnimal(dog); // 输出 "dog move"
moveAnimal(cat); // 输出 "cat move"
```

抽象类和多态通常用于实现大型代码库，在不同的对象之间定义统一的接口，使得代码可读性更高，同时保留重写和扩展的自由度。

可以拿 [如何实现一个Canvas渲染引擎(一)：节点和层级关系 - 掘金](https://juejin.cn/post/7323398442729848869#heading-23) 一文中提到的 `Shape` 基类作为例子

`Shape` 类是一个**抽象类**，所有的图形类如 `Circle`、`Rectangle`、`Triangle` 等子类都继承自 `Shape` 类

```
export abstract class Shape {
  public abstract type: ShapeType
  constructor() {}
  public abstract contains(point: Point): boolean
}

export class Rectangle extends Shape {
  public x: number
  public y: number
  public width: number
  public height: number
  public type = ShapeType.Rectangle
  constructor(x = 0, y = 0, width = 0, height = 0) {
    super()
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
  public contains(point: Point): boolean {}
}
```

**多态**：`containsPoint` 方法做碰撞检测

```
class XXX {
  public containsPoint(p: Point): boolean {
    for (let i = 0; i < this.graphicsData.length; i++) {
      const { shape, fillStyle } = this.graphicsData[i]
      if (!fillStyle.visible) {
        continue
      }
      if (shape.contains(p)) { // 多态调用
        return true
      }
    }

    return false
  }
}
```

如此一来，实体之间的关系就变得非常清晰明了，极大地提升了代码的组织清晰度

##### 组合

组合描述的是一种“有”关系，它是将一些相对简单的对象组合成更复杂的对象。这关系更为灵活，因为它更容易变更组成对象而不影响到其他对象。具体的表现就是类的一些成员是其他类的实例，通常情况下这些成员类是在类实例化时被实例化的。

例如在 `NestJS` 中我们就能经常见到 `Controller` 类组合 `Service` 类的场景，具体实现是在 `constructor` 中使用 TS 提供的 `private`、`readonly` 修饰符来表明一个组合关系：

```
@Controller()
  export class AppController {
    constructor(
      private readonly userService: UserService,
      private readonly postService: PostService,
    ) {}

    @Get('post/:id')
    async getPostById(@Param('id') id: string): Promise<PostModel> {
      return this.postService.post({ id: Number(id) });
    }

    @Post('user')
    async signupUser(
      @Body() userData: { name?: string; email: string },
    ): Promise<UserModel> {
      return this.userService.createUser(userData);
    }
  }
```

#### 何时使用？

##### 逻辑封装

通常情况下我们会用类来进行代码逻辑封装，以一个水印相关的功能为例：

水印涉及到了给页面加水印、给图片加水印两个场景，其中又包括了图片转码、事件监听、链接处理等多个函数，这些函数分属于不同的文件和模块中，却往往拥有相同的入参（如都会用到水印数据等）

我们可以使用类来抽象出这块逻辑：

- 将水印数据作为类实例化的参数，存储在类实例的内部
- 暴露出两个场景的公共方法
- 将其余的函数作为私有方法存储。

这样一来就把不同模块下的不同函数整合到了一起，使得代码组织更加清晰，避免了定义反复横跳的情况，极大程度地提高了代码的可读性和可维护性

##### 存在实体概念

此外，类由于其实例化的性质，天然就适合用于表述实体，例如一个实体有其内部属性，并且会提供一些方法用于操作或是输出内部属性，这种场景就十分适合使用类来实现，当然这也需要开发者自行决策分析。

一个实际的例子是在待办系统中的时间表达式，其有多种表现形式，例如在选择器 Picker 内部它是一个形同 `["WEEK", 1, 8, 30]` 的数组，表示「每周一八点三十下发」，在回显的组件内部是一个语义化的字符串，在提交的时候他又会变成形同 `0-W-1-08:30:00` 的时间表达式，此时就很适合使用类来描述这个实体：

```
import dayjs from 'dayjs';
import { DateType, PickerColumn } from './types';
import { LAST_DAY_MAP, WEEK_MAP } from './utils';

export default class TaskTime {
  constructor(
    public dateType: DateType,
    // 日期类型为 FIXED_TIME 时，raw 为 string 类型
    public raw: string[] | string,
    public type: 'start' | 'end'
  ) {
    this.dateType = dateType;
    this.raw = raw ?? [];
    this.type = type;
  }

  // 数据转换成展示字符串
  public formatValue(): string {}

  // 数据转换成表达式
  public formatExpression(): string {}

  public isLaterThan(time: TaskTime, pickerColumns: PickerColumn[]): boolean {}

  private getFrequency(): string {}

  private getdateTypeChar(): string {}

  private getStartDate(): string {}

  private getHours(): string {}

  private getMinutes(): string {}
}
```

### 代码结构和设计

#### 模块化（Modularity）

##### 命名空间（namespace）和模块（module）

详见 用好类型定义-三方库-定义三方库的形式

模块和命名空间一样，都是为了解决代码的组织封装和可维护性问题，在正常的 TS 项目开发过程中并不建议用命名空间，现在我们通常还是使用更为先进的模块系统来完成代码逻辑的组织和封装。

#### 扩展-领域驱动设计（Domain-Driven Design）

DDD 即根据业务逻辑构建模型，维护大型项目的业务复杂性。

对于 TS 项目而言，我们通常会维护不同接口的出入参，而这往往是定义在 `request` 目录下接口的 `types.ts` 文件中，但是在大型项目中，这样的组织形式就有些难以满足可维护性编程的需要了。

以一个很简单的用户+笔记的场景，用户可以在个人主页查看自己的笔记列表，可以在知识库中查找公开的笔记列表……对于一个笔记应用来说，这里的**笔记**是一个基础可复用**实体（Entity）**，针对不同的场景有 `ListItem` 和 `Detail` 等多种具体的存在方式，在后端中也被称为 **DTO（Data Transfer Object）**，而最终返回给前端的接口响应中可能是多个 `DTO` 的组合，即所谓的 **VO（Value Object）**

在前端的工程架构中，实际上并不需要关心到 `Entity` 这么底层的存在，因为其是与数据库表结构强关联的，后端在生产响应数据的过程中会删除页面中用不到的数据，即封装 `DTO`。在前端工程中解决类型复用性问题，其本质上也是在维护 `DTO` 的类型

正因此，一个不一样的思路是，在前端项目中也维护一份 `DTO`，这样一来，针对某些跨端跨项目的场景，可以将 `DTO` 的类型定义抽离到单独的 npm 库中在多端引入，实现类型定义的复用。一个非常典型的例子是答题应用，答题端和批改端以及配置后台可能是三个单独的项目，但是对于**题目**的相关类型定义则完全可以实现复用。

## 用好静态检测

### 检测原理

TypeScript 编译器首先将源代码通过解析器转换为 AST，AST 中包含了代码中所有的语法结构和信息。编译器中的类型检查器可以访问这个 AST，并获取变量声明、赋值、函数调用等节点的类型信息。然后，编译器会根据这些信息和 TypeScript 的类型系统规则来判断类型是否正确。如果类型不符合，编译器会抛出错误。

注意：AST 本身只是代码文本的树状表示，没有类型信息，TypeScript 解析器**增强**了这个基础的 AST，使其能够包含类型信息。

在 TypeScript 的编译过程中，源代码首先被解析成基础的 AST，然后 TypeScript 编译器会遍历这个 AST，并增加类型注释。它通过**类型推断**和**显示类型注解**来为变量、函数参数、返回值等增加类型信息。

![](https://cdn.nlark.com/yuque/0/2024/png/35832805/1710842067430-fe94ee39-f66e-4b84-bac5-d1bf2dd0a963.png)

**前置知识**

Babel 中的 AST 遍历有生命周期的。有两个钩子：pre 或 post，它们可以用于设置或清理/分析工作

```
export default function() {
  return {
    //遍历开始之前
    pre(state) {
      this.cache = new Map();
    },
    visitor: {
      StringLiteral(path) {
        this.cache.set(path.node.value, 1);
      }
    },
    //遍历结束后
    post(state) {
      console.log(this.cache);
    }
  };
}
```

#### 赋值场景

**源代码**

```
let age:number = 12
```

**校验思路**

- 获取**声明**的类型（number）
- 获取**真实值**的类型（"12"的类型）
- 比较声明的类型和值的类型是否相同

**校验代码**

```
const core = require("@babel/core"); // babel核心模块

const sourceCode = `var age:number="12";`;

const TypeAnnotationMap = {
  TSNumberKeyword: "NumericLiteral",
};

const tsCheckPlugin = {
  //遍历前
  pre(file) {
    file.set("errors", []);
  },
  visitor: {
    VariableDeclarator(path, state) {
      const errors = state.file.get("errors");
      const { node } = path;
      //第一步：获取拿到声明的类型（number）
      const idType =
        TypeAnnotationMap[node.id.typeAnnotation.typeAnnotation.type]; //拿到声明的类型 TSNumberKeyword
      //第二步：获取真实值的类型（"12"的类型）
      const initType = node.init.type; //这里拿到的是真实值的类型 StringLiteral
      //第三步：比较声明的类型和值的类型是否相同
      if (idType !== initType) {
        errors.push(
          path
          .get("init") //拿到子路径init
          .buildCodeFrameError(`无法把${initType}类型赋值给${idType}类型`, Error)
        );
      }
    },
  },
  //遍历后
  post(file) {
    console.log(...file.get("errors"));
  },
};

let targetSource = core.transform(sourceCode, {
  parserOpts: { plugins: ["typescript"] }, //解析的参数，这样才能识别ts语法
  plugins: [tsCheckPlugin], //使用插件
});

console.log(targetSource.code);
```

#### 先声明再赋值场景

**源代码**

```
let age:number;
age = "12";
```

**校验思路**

- 先获取**左侧变量**的定义（age）
- 在获取左侧变量**定义的类型**（number）
- 获取**右侧的值**的类型（“12”）
- 判断变量的左侧变量的类型和右侧的值的类型是否相同

  

#### 泛型场景

**源代码**

```
function join<T, W>(a: T, b: W) {}
join<number, string>(1, "2");
```

  

**校验思路**

- 先获取**实参**类型数组（1, '2'的类型数组：[number,string]）
- 获取**函数调用时传递的泛型类型**数组（[number, string]）
- 拿到**函数定义时的泛型** [T, W]，然后结合第二步将 T 赋值为 number，W 赋值为 string，得到数组 [T=number,W=string]
- 计算函数定义时的**形参**类型数组：此时 a:number，b:string => {}
- a 的形参类型跟a的实参类型进行比较，b 的形参类型跟 b 的实参类型进行比较

### 工程化配置

项目中做 TS 文件的类型检测大致有以下几种途径：

- [ts-loader](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fts-loader)
- [babel-loader](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fbabel-loader) + [fork-ts-checker-webpack-plugin](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ffork-ts-checker-webpack-plugin)
- [babel-loader](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fbabel-loader) + [tsc](https://link.juejin.cn/?target=https%3A%2F%2Fwww.typescriptlang.org%2F%3F)

|   |   |   |
|---|---|---|
|途径|优点|缺点|
|[ts-loader](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fts-loader)|- 直接集成在 webpack 的构建流程中，不需要额外的配置。<br>- 在编译 TypeScript 时同时进行类型检查，保证了代码质量。<br>- 支持 TypeScript 的最新特性，因为它是 TypeScript 官方支持的|- 构建速度可能较慢，因为它在编译过程中同时执行了类型检查。<br>- 消耗的内存可能较多，特别是在大型项目中。|
|[babel-loader](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fbabel-loader) + [fork-ts-checker-webpack-plugin](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ffork-ts-checker-webpack-plugin)|- babel-loader 转译速度快，因为它只负责将 TypeScript 编译成 JavaScript，不做类型检查。<br>- fork-ts-checker-webpack-plugin 在一个单独的进程中异步执行类型检查，不会拖慢主进程的编译速度。<br>- 能够利用 webpack 的 HMR（热模块替换），因为不会阻塞编译流程。|- 需要同时维护两个工具的配置。<br>- 类型检查错误不会阻止 webpack 输出文件，可能导致在开发中运行时错误。|
|[babel-loader](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fbabel-loader) + [tsc](https://link.juejin.cn/?target=https%3A%2F%2Fwww.typescriptlang.org%2F%3F)|- 利用 Babel 的高效转译能力和 tsc 的强大类型检查。<br>- 可以在 Babel 中使用插件来扩展功能。|- 类型检查和编译是分开的，可能需要额外的脚本或命令来确保两者都执行了。<br>- 类型错误不会影响编译结果，必须手动检查类型错误。|

如何选择

- 项目大小：大型项目可能会更倾向于使用 Babel 结合异步类型检查，以提高构建速度。
- 开发流程：如果你需要即时的类型检查反馈，ts-loader 或者同步运行的 tsc 可能更适合。
- 性能需求：如果构建速度是关键要求，使用 Babel 结合 fork-ts-checker-webpack-plugin 可能是更好的选择。

### 漏网之鱼——类型断言

**定义：**类型断言就是保证数据类型一定是所要求的类型

**作用时间**：编译时

**原理**：在编译阶段，编译器会根据这个断言在内部的抽象语法树（AST）上对应节点标注新的类型（若断言类型与原类型不兼容，则会报错），而不进行常规的类型检查。这样做不改变变量的实际类型原因是类型断言不是类型转换，断言成一个联合类型中不存在的类型毫无疑问是不被允许的。

**应用场景**：在还不确定类型的情况下就访问其中一个类型的属性和方法

```
// 假设我们有一个第三方API返回的JSON对象
const jsonString = `{"name": "Alice", "age": 30}`;
// 我们将其解析为一个any类型
const user = JSON.parse(jsonString);
// 我们使用as来断言user为具体的User类型
interface User {
  name: string;
  age: number;
}

const typedUser = user as User;
console.log(typedUser.name); // "Alice"
console.log(typedUser.age); // 30
```

## 总结

综上，我们深入解析了 TypeScript 的诞生背景、它如何解决 JavaScript 的问题，以及如何巧妙运用其特性来提升编程的可维护性。也在兴趣小区中展开激烈的讨论。![](https://cdn.nlark.com/yuque/0/2024/png/34717503/1712905241259-f817528d-0085-4dc8-8f0b-b03e938eff11.png)

经此，我们也对如何学习一门新的语言/技术总结出了一套自己的方法论。

1. 理解一个技术的起源：这对于掌握其设计初衷和核心概念至关重要。它帮助我们明白技术是为解决何种问题而生，并认识到它发展中面临的挑战。研究过时的语言时，这些知识尤其珍贵，因为它们的设计受限于当时条件，了解这一点有助于我们评估它们今天的价值和局限性。这样的探索也能指导我们避免重复过去的错误，并洞悉技术进步的方向。
2. 理解它的设计理念和解决问题的思路：这是我们能够有效学习和运用新技术的基石。
3. 实践至上：围绕它的特性总结最佳实践，促使我们将理论和日常业务实践联系起来
4. 注重批判性思维：了解语言/技术目前依然存在的问题，了解他未来的优化方向

## 附录

### interface 惰性求值

从一个很简单的场景出发，我们可以写出这样的一个类型定义：

```
type Circular = Record<string, Circular>
```

但是这样的定义在 TS 中是不被允许的，会产生报错 `Type alias 'Circular' circularly references itself.`，并且其类型被推导为了 `any`

![](https://cdn.nlark.com/yuque/0/2024/png/22950883/1710847447203-a81913b7-64bb-4a35-b413-2777fb5d547d.png)

但是这并不意味着循环定义是不被允许的，例如我们经常通过这种方式去声明树节点：

```
interface Node {
  id: number;
  children: Node[];
}
```

这样的定义则是完全合法的。

同样是循环引用自身，两者的区别在于其类型定义的求值过程：对于 `type` 定义的类型，TS 会默认将其展开；而对于 `interface` 定义的类型则不会，即 `interface` 的求值是**惰性**的。

**如何解决？**

我们尝试利用 `interface` 来重新实现一下 `Circular` 类型。我们要做两件事，一个是防止 `Record` 被继续展开，一个是防止 `Record` 的**参数**被继续展开，因此我们可以写出下面的代码：

```
interface Pack<T = any> { __value: T }

type UnpackLazy<T extends Pack> = T["__value"]

type LazyRecord<K extends PropertyKey, T extends Pack> = { [P in K]: UnpackLazy<T>; }

type Circular = LazyRecord<string, Pack<Circular>>
```

可以看出，类型也被正常推导了出来

![](https://cdn.nlark.com/yuque/0/2024/png/22950883/1710858442130-e3fd8897-f562-48b0-949b-e9d8f6fb2d3f.png)

这里其实利用了一个特性，即 `对象字面量` 的求值也是**惰性**的，所以我们完全可以将 `Circular` 类型写成这样：

```
type Circular = { [K in string]: Circular  }
```

在这个情况下，在第一层碰到对象字面量之后，就不会再对里面的类型进行展开了，我们可以看到它同样被正确推导了：

![](https://cdn.nlark.com/yuque/0/2024/png/22950883/1710847756253-934a1054-a52c-43e6-9501-86baeabb859e.png)

不难看出，TS 中 `interface` 与 `type` 最核心的区别就是**真实类型**与**类型别名**的区别——这由此产生了 `interface` 的惰性特点，这在处理循环引用自身的问题上非常重要。

TS 的官方文档似乎没有明确提到这一点，只是强调尽量使用 `interface`，这可能是因为这涉及了太多的 TS 内部实现细节。不过，即使你认为你一辈子也碰不到这种循环引用自身的问题，你也应该尽量多地使用 `interface`，因为它的惰性特点可以帮助 TS 在处理复杂类型时更好地优化求值，从而提高编译速度。

### 参考资料

1. [基于 json-schema 的类型提示方案](https://gumingnc.yuque.com/voph0x/wboqvp/gsp16gt6di69xuc8#v7oof "基于 json-schema 的类型提示方案")
2. [TypeScript 全面进阶指南 - 林不渡 - 掘金小册](https://juejin.cn/book/7086408430491172901?scrollMenuIndex=0)
3. [Typescript 在 AST 解析上的妙用 - 掘金](https://juejin.cn/post/7319797961235398690?searchId=2024031211363233FBE98BA5BD3B303C16)
4. [深入理解 TypeScript | 深入理解 TypeScript](https://jkchao.github.io/typescript-book-chinese/)
5. [探讨 TypeScript 中 interface 与 type 的求值区别](https://zhuanlan.zhihu.com/p/672172699)
6. [FAQ · microsoft/TypeScript Wiki](https://github.com/Microsoft/TypeScript/wiki/FAQ#why-are-function-parameters-bivariant)
7. [多年老鸟教你TypeScript要做的性能优化、关键字进阶与实践、常用几个技巧 - 掘金](https://juejin.cn/post/7272229204870660154#heading-5)
8. [管理TypeScript项目中的类型声明_shymean](https://shymean.com/article/%E7%AE%A1%E7%90%86TypeScript%E9%A1%B9%E7%9B%AE%E4%B8%AD%E7%9A%84%E7%B1%BB%E5%9E%8B%E5%A3%B0%E6%98%8E)