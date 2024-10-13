---
updateTime: "2024-7-1 09:30"
desc: "Vite相较于Webpack的优势"
tags: "Vite"
outline: deep
---

>webpack侧重兼容性，vite更侧重浏览器的开发体验
>
>当我们构建越来越大型的应用时，需要处理的Javascript代码量也呈指数级增长。
我们开始遇到性能瓶颈--使用Javascript开发的工具通常需要很长时间才能启动开发服务器（启动项目）。即使是用HMR（热更新），文件修改后的效果也需要几秒才能在浏览器反应（热更新迟缓）。影响开发效率。

```
yarn start

yarn dev

npm run dev 

npm run start

```

webpack支持多种模块化，webpack编译原理：AST抽象语法分析的工具，分析出你写的js文件有哪些导入和导出操作，前端没办法改文件， 构建工具是运行在服务端的,所以可以转换成webpack统一的规范。

>因为webpack支持多种模块化开发，他一开始必须要统一模块代码，所以意味着他需要将所有依赖全部读一遍
>vite是基于es moudle的 所以不用吧所有的依赖全部读一遍。vite先启动服务器。


```javascript

//这一段代码最终会到浏览器里去运行
const lodash =require("lodash");//commonjs规范
import Vue from "vue";//es6 module

//webpack是允许我们这么写的

//webpack转换的结果：
const lodash=webpack_require("lodash");
const Vue = webpack_require("vue");

(function(modules){
   function webpack_require(){
   //入口是index.js
   //通过webpack的配置文件得来的:webpack.config,js ./src/index.js
   modules[entry]()
   },({
     "index.js":(webpack_require)=>{
        const lodash =webpack_require("lodash");
        const Vue = webpack_require("vue);
     
     }
   })

})

```

 