```js

const obj={name:'张三',age:18}
const container=document.getElementById('container')
container.textContent=obj.name

const p1=new proxy(obj,{
    get(target,property){
        return obj[property]
    },
    set(target,property,value){
        obj[property]=value
        container.textContent=obj.name
    }
})

console.log(p1.name)
p1.name='李四'
p1.age=20

```
