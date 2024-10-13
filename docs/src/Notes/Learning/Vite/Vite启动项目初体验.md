---
updateTime: "2024-7-1 09:30"
desc: "Vite启动项目初体验"
tags: "Vite"
outline: deep
---

>开箱即用（out of box）：你不需要做任何额外的配置就可以使用vite来帮你处理构建工作。

```counter.js

import_from "lodash"
//lodash可能也import了其他东西

export const count = 0;

```
```main.js
import {count} from "./counter"
console.log(count);
```
**在默认情况下esmodule去导入资源的时候，要么是绝对路径，要么是相对路径。**
既然我们现在的最佳时间就是node_modules，那为什么es官方在我们导入非绝对路径和非相对路径的资源的时候浏览器不默许帮我们搜寻node_modules呢？

因为浏览器搜寻的话lodash会被发现，可能也导入了很多其他的就会消耗性能。
所以要先下载lodash然后commonjs（node运行在服务端）来读取内存（本地文件）

vite：代码处理
使用 NPM:

```
$ npm create vite@latest
```

使用 Yarn:

```
$ yarn create vite
```

使用 PNPM:

```
$ pnpm create vite
```

然后按照提示操作即可！

你还可以通过附加的命令行选项直接指定项目名称和你想要使用的模板。例如，要构建一个 Vite + Vue 项目，运行:

```
# npm 6.x
npm create vite@latest my-vue-app --template vue

# npm 7+, extra double-dash is needed:
npm create vite@latest my-vue-app -- --template vue

# yarn
yarn create vite my-vue-app --template vue

# pnpm
pnpm create vite my-vue-app --template vue
```

查看 [create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite) 以获取每个模板的更多细节：`vanilla`，`vanilla-ts`，`vue`，`vue-ts`，`react`，`react-ts`，`preact`，`preact-ts`，`lit`，`lit-ts`，`svelte`，`svelte-ts`。

## 社区模板[¶](https://vitejs.cn/vite3-cn/guide/#community-templates)

create-vite 是一个快速生成主流框架基础模板的工具。查看 Awesome Vite 仓库的 [社区维护模板](https://github.com/vitejs/awesome-vite#templates)，里面包含各种工具和不同框架的模板。你可以用如 [degit](https://github.com/Rich-Harris/degit) 之类的工具，使用社区模版来搭建项目。

```
npx degit user/project my-project
cd my-project

npm install
npm run dev
```

如果该项目使用 `main` 作为默认分支, 需要在项目名后添加 `#main`。

```
npx degit user/project#main my-project
```

## `index.html` 与项目根目录
