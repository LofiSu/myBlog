### 三者区别总结
- **参数传递方式**：`call` 逐个传递参数，`apply` 使用数组传递参数，`bind` 既可以逐个传递参数，也可以在调用返回的新函数时再传递参数。
- **函数调用时机**：`call` 和 `apply` 立即调用函数，`bind` 返回一个绑定了 `this` 的新函数，可以稍后调用。
- **常见使用场景**：
  - 使用 `call` 和 `apply` 来立即调用函数，并手动指定 `this`。
  - 使用 `bind` 来绑定 `this` 并延迟函数调用，例如在事件处理程序中。

### 基本介绍
- `call`、`apply` 和 `bind` 都是 JavaScript 中的函数方法，用于改变函数内部 `this` 的指向。
- `call` 和 `apply` 都是立即执行的，而 `bind` 是返回一个新的函数，需要手动调用。

### `call` 方法
- 语法：`function.call(thisArg, arg1, arg2, ...)`
- 特点：
  - `call` 方法第一个参数是函数执行时的 `this` 指向，后面的参数是函数执行所需的参数。
  - 可以用来调用函数，并将 `this` 指向指定的对象。
  
```javascript
function greet(greeting, punctuation) {
    console.log(greeting + ", " + this.name + punctuation);
}

let person = { name: "Alice" };

greet.call(person, "Hello", "!");
// 输出: Hello, Alice!
```

### `apply` 方法
- 语法：`function.apply(thisArg, [argsArray])`
- 特点：
  - `apply` 方法与 `call` 类似，但它的第二个参数是一个数组，数组中的每个元素分别作为函数的参数传递。
  
```javascript
function greet(greeting, punctuation) {
    console.log(greeting + ", " + this.name + punctuation);
}

let person = { name: "Alice" };

greet.apply(person, ["Hello", "!"]);
// 输出: Hello, Alice!
```

### `bind` 方法
- 语法：`function.bind(thisArg, arg1, arg2, ...)`
- 特点：
  - `bind` 方法返回一个新的函数，并且新的函数的 `this` 指向 `thisArg`。
  - 可以在调用时传递参数，或者在绑定时预设参数。

```javascript
function greet(greeting, punctuation) {
    console.log(greeting + ", " + this.name + punctuation);
}

let person = { name: "Alice" };

let boundGreet = greet.bind(person, "Hello");
boundGreet("!"); 
// 输出: Hello, Alice!
```




# 老笔记 call apply bind 区别
```javascript
  //call是一个函数的方法
   let dog={
    name:"旺财",
    sayName(){
        console.log("我是"+this.name);
    },eat(food1,food2){
        console.log("我喜欢吃"+ food1 + food2)
    }
   }
   let cat={
    name:"喵喵"
   }
//call可以调用函数，可以改变函数中this的指向
 function fun(){
    console.log(this.name);
//没有call的时候，this指向全局，这里打印不了cat类里面的name喵喵，打印出来时undefine
 };
fun.call(cat);//这行代码输出喵喵，因为call可以改变this指向，此时this指向定义cat的函数
dog.sayName();//实现旺财
dog.sayName.call(cat)//调用cat，call就相当于可以随时调用里面的对象
dog.eat("骨头");//调用eat方法，输出我喜欢吃骨头
dog.eat.call(cat,"鱼","肉");//增加形参变量，call第二个参数开始往后的参数列表就是eat的参数列表，这里是调用dog类里的eat方法并且用call函数调用了cat

//call是参数列表依次往后传参,直接调用函数
//apply是用数组传参,数组第一个参数是food1第二个是food2
dog.eat.apply(cat,["鱼", "肉"]);
//bind,不直接调用函数传参，给一个返回值返回函数，然后用返回值调用，更加方便，比如一直打fun()就行了，不用写一堆call
let fun=dog.eat.bind(cat, "鱼", "肉");
fun();
 fun();
  fun();
```
## Call 继承：子类继承父类,call可以多重继承（就是超级方便）
![[Pasted image 20240514223156.png]]
```javascript
 function meme(){
    this.happy=function(){
        console.log("happy happy happy")
    }

    this.eat=function(){
        console.log("你可以吃芝士汉堡")
    }
  }

  function bird(){
    this.fly=function(){
        console.log("fly")
    }

    meme.call(this)
  }

  function Cat(){
    meme.call(this);
    this.say=function(){
        console.log("miao")
    }
    bird.call(this);
  }
  let susu=new Cat()
  susu.eat();
  susu.happy()
  susu.fly()
  let hua=new Cat()
  let li=new bird()
  li.happy()
  hua.eat()
```