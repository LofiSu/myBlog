# 闭包
>作用域链：从当前作用域一层一层向上找一直找到全局环境

>闭包：函数嵌套函数，内部函数就是闭包
正常情况下，函数执行完成，内部变量会销毁。在闭包中，外部函数已经执行完毕但是内部函数引用外部变量所以外部变量不会被销毁。
```JavaScript
    function outerFun() {
       let a=10;
       //a可以访问外部变量 但是 不能从外部单独调取a ，a在函数里面执行完会释放内存空间直接销毁
        function innerFun(){
            console.log(a);
        }
        return innerFun;
    }
   let fun=outerFun();
   fun();
   //最后输出10
   
   function outer() { 
   let num = 10; 
   function inner() {
    console.log(num);
   } return inner; 
 }//outer函数返回的是inner
  let closureFunction = outer();
   // 此时 outer 函数已经执行完毕，但是 num 变量没有被销毁
   // 因为被 inner 函数引用着 
   closureFunction();//这个函数返回的inner，inner又调用了num，num就不会被销毁
```
闭包封装代码:保护数据不被随意篡改
```javascript
//闭包封装代码实现模块化
//普通代码：
//   let a=10;
//   let b=20;
//   function add(){
//     return a+b;
//   }
//   function sub(){
//     return a-b;
//   }
//   let result1=add()
//   let result2=sub()
//   console.log(result1)
//   console.log(result2)
//模块化封装：(类似构造函数)
  let module1=(function(){
      function add() {
          return a + b;
      }
      function sub() {
          return a - b;
      }
      return {
        add,
        sub
      }
  })()
let result1 = module1.add()
let result2 = module1.sub()
console.log(result1)
console.log(result2)
```