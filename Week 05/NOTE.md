学习笔记

本周主要跟着课程学习了proxy代理，了解了proxy代理相关理论，及Map对象相关知识，最后学习了课程中的拖拽功能

# Proxy
Proxy对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。

## 语法：let p = new Proxy(target, handler);
* target: 要使用Proxy包装的目标对象，可以是原生数组、函数，甚至是另一个代理
* handler: 一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。

* handler对象的方法：
handler.has()：in 操作符的捕捉器。
handler.get()：属性读取操作的捕捉器。
handler.set()：属性设置操作的捕捉器
handler.apply()：函数调用操作的捕捉器。

# Map
Map对象保存键值对，并且能够记住键的原始插入顺序。任何值(对象或者原始值) 都可以作为一个键或一个值。

* Map可以使用for..of循环来实现迭代
```
    let map = new Map();  
    map.set(name,"min");  
    map.set(age,"111");
    for(let key of map.keys()){
    	consle.log(key)
    }
```

* 也可以通过forEach()方法迭代
```
    map.forEach(function(value,key){
    	consloe.log(key + ":" + value);
    })
```

* 可利用Map对象键不可重复性数组去重
```
    function unique(array){
	    let map = new Map();
	    let arr = [];	    
	    array.forEach((element) => {
		    if(!map.has(element)){
			    map.set(element,element);
			    arr.push(element);
		    }
	    });
	    return arr;
    }    
    let array = [1,1,2,12,34,4,2,1,3,4];
    console.log(unique(array));
```

