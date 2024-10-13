# vite预加载
>在处理的过程中如果说看到了非绝对路径或者相对路径的引入，就会开启路径补全。
>
>**依赖预构建**：首先vite会先找到对应的依赖，然后调用esbuild（对js语法处理的一个库），将其他规范的代码转化成esmodule规范，然后放到当前目录下的node_modules/.vite/deps，同时对esmodule规范的各个模块进行统一集成。
>
>有了依赖预构建之后无论他有多少额外export和import，vite都会尽可能的将他们进行集成最后只剩下一个或者几个模块。

```javascript
import_from"lodash";

vite补全的：
import_vite_from"/node_modules/.vite/deps/lodash.js?";
```
找寻依赖的过程是自当前目录一次向上查找的过程，知道搜寻到根目录或者搜寻到对应的依赖为止。

开发环境和生产环境

yarn dev--->开发环境中（每次依赖预构建所重新构建的相对路径都是正确的）
vite会圈圈交给一个叫做rollup的库去完成生产环境的打包

缓存--->

实际上vite在考虑另外一个问题的时候就把这个问题解决了

commonjs规范的导出module.exports

有的包他是以commonjs规范的格式导出Axios



他解决了3个问题：
1.不同的第三方包会有不同的导出格式（这是vite没法约束的事情）
2.对路径的处理上可以直接使用.vite/deps,方便路径重写
3.叫做**网络多包传输的性能问题**（就比如lodash，export导入了但是浏览器不知道他导入了多少依赖包，这也是原生esmodule规范不敢支持node_modules的原因之一）

vite.config.js === webpack.config.js


