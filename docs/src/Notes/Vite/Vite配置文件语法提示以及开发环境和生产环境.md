### Vite配置文件的语法提示：
```vite.config.js
//在依赖预处理中我们提到
/**@type*/
const viteConfig={
   optimizeDeps:{
     exclude:[],//将指定数组的依赖不进行依赖预构建
   }
}

/**
 *@param
 *@return{string}
 */
function bar(){

}
//这里就有提示都是返回的string类型的函数，这样写告诉vscode你要记录的类型
```
关于环境的处理：
 过去我们使用webpack的时候，我们要区分配置文件的环境。（很麻烦生产环境和开发环境都得配置）
 - webpack.dev.config
 - webpack.prod.config
 - webpack.base.config
 - webpackmerge
 
 Vite的配置：
```vite.config.js
import {defineConfig} from "vite";

export default defineConfig(config:({command:"build"|"serve"}))=>{
    if(command === "build"){
      //代表生产环境的配置
    }else{
      //代表开发环境的配置
    }
})
```
 



