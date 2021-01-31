学习笔记

另学习过程中的笔记、遇到的bug，在csdn写了些文档和处理方法，总体来说，这一周非常充实

[搭建jsx环境](https://blog.csdn.net/minmin_web/article/details/113414835)

[报错1](https://blog.csdn.net/minmin_web/article/details/113366848)

[报错2](https://blog.csdn.net/minmin_web/article/details/113418470)

报错3： 运行 webpack-dev-server报错：

我这里是用 webpack serve 代替 webpack-dev-server 

## 组件的基本知识 | 组件的基本概念和基本组成部分 ##
### 对象与组件 ###

对象

- Properties
- Methods
- Inherit

组件

- Properties
- Methods 
- Inherit 
- Attribute 
- Config & State 
- Event 
- Lifecycle 
- Children

### Attribute vs Property ###

- Attribute强调描述性
- Property强调从属关系

Attribute:

	<my-component attribute=“v” />
	myComponent.getAttribute(“a”)
	myComponent.setAttribute(“a”,“value”);

Property:

	myComponent.a =“value”;

例如：

	<div class="cls1 cls2"></div>
	<script>
	var div = document.getElementByTagName(‘div’);
	div.className // cls1 cls2
	</script>

	<div class="cls1 cls2" style="color:blue" ></div>
	<script>
	var div = document.getElementByTagName('div');
	div.style // 对象
	</script>

	<a href="//m.taobao.com" ></div>
	<script>
	var a = document.getElementByTagName('a’);
	a.href // “http://m.taobao.com”，这个 URL 是 resolve 过的结果
	a.getAttribute(‘href’) // “//m.taobao.com”，跟 HTML 代码中完全一致
	</script>

	<input value = "cute" />
	<script>
	var input = document.getElementByTagName(‘input’); //若 property 没有设置，则结果是 attribute
	input.value // cute
	input.getAttribute(‘value’); // cute
	input.value = ‘hello’; // 若 value 属性已经设置，则attribute 不变，property 变化，元素上实际的效果是 property 优先
	input.value // hello
	input.getAttribute(‘value’); // cute
	</script>

组件的生命周期

created  ？ destroyed

### Children ###

Content 型 Children 与 Template 型 Children

	<my-button><img src="{{icon}}"/>{{title}}</my-button>
	<my-list>
		<li><img src="{{icon}}"/>{{title}}</li>
	</my-list>

## 为组件添加JSX语法 ##

markup 环境

- 与react一样的JSX
- 类似vue的标记语言的parser

安装jsx:

    mdkir jsx #创建目录
    cd jsx	#进入文件夹
    npm init #初始化 （一直按enter即可）
    npm install -g webpack webpack-cli  #全局安装webpack webpack-cli
    webpack --version #查看版本

若用的是vs code终端，可能会有以下：

- webpack : 无法加载文件 D:\Program Files\nodejs\webpack.ps1……；
- set-ExecutionPolicy : 对注册表项“HKEY……”的访问被拒绝

[可查看链接帮助解决：](https://blog.csdn.net/minmin_web/article/details/113366848)

安装完webpack之后，还需要安装Babel系列，因为JSX是Babel的一个插件,所以需要依次安装 webpack，babel-loader、babel 和babel的plugin

webpack可以帮助我们把不同的import或者requre这些东西打包

babel可以把一个新版本的JS编译成一个老版本的JS，这样可以在更多的老版本的浏览器去跑

    npm install --save-dev webpack babel-loader #本地目录安装
    code . #vs code 终端打开当前项目

配置webpack.config.js

	module.exports = {
	    entry:"./main.js"
	}

配置main.js文件

	for(let i of [1,2,3]){
	    console.log(i);
	}

运行--> 点creat…… -->命令终端

	webpack  #打包



继续安装babel

	npm install --save-dev @babel/core @babel/preset-env 
	#只安装babel/core啥也不会做，还需要安装babel的preset-env

用npm如果太慢，可将npm更换成淘宝镜像源：

	npm install -g cnpm --registry=https://registry.npm.taobao.org
	cnpm -v #查看版本
	clear #vs code清除终端命令

之后安装只需要将npm换成cnpm即可

继续配置webpack.config.js

	module.exports = {
	    entry:"./main.js",
	    //模块
	    module:{
	        rules:{
	            test:/\.js$/,
	            use:{
	                loader:"babel-loader",
	                options:{
	                    presets:['@babel/preset-env']
	                }
	            }
	        }
	    }
	}

配置好之后运行webpack

没问题后可在webpack.config.js中增加 

	mode:"development" //表示是开发者模式，打包后的文件不在压缩，可调式

在main.js中增加：

	let a = <div/>//没有在package.json配置时会报错

需在package.json中增加 @babel/plugin-transform-react-jsx,即在终端安装：

	npm install --save-dev @babel/plugin-transform-react-jsx

安装完之后需要配置

	plugins:["@babel/plugin-transform-react-jsx"]


此时再去运行webpack即可


##  JSX的基本使用方法 ##

之前打包好的
jsx插件允许在配置时加上一个配置，可以改名

	plugins:[["@babel/plugin-transform-react-jsx"],{pragma:"createElement"}]

基础练习：

	function createElement(type,atttributes,...children){
	    let element;
	    if(typeof type === "string"){
	        //string表示是原生的元素
	        //element = document.createElement(type);
	        element = new ElementWrapper(type);
	    }else{
	        element = new type;//不是原生元素，转成实例
	    }
	        
	
	    for(let name in atttributes){
	        element.setAttribute(name,atttributes[name]);
	    }
	    for(let child of children){
	        //对child的类型进行判断
	        if(typeof child === "string"){
	            //child = document.createTextNode(child);//将其换成textnode
	            child = new TextWrapper(child);//将其换成textnode
	        }
	        element.appendChild(child);
	    }
	    return element;
	}
	
	//把普通的div也转成有mountTo的形式
	class ElementWrapper{
	    constructor(type){
	        this.root = document.createElement(type);
	    }
	    setAttribute(name, value){
	        this.root.setAttribute(name, value);
	    }
	    appendChild(child){
	        //this.root.appendChild(child);
	        child.mountTo(this.root);
	    }
	    mountTo(parent){
	        parent.appendChild(this.root);
	    }
	}
	
	class TextWrapper{
	    constructor(content){
	        this.root = document.createTextNode(content);
	    }
	    setAttribute(name, value){
	        this.root.setAttribute(name, value);
	    }
	    appendChild(child){
	        //this.root.appendChild(child);
	        child.mountTo(this.root);
	    }
	    mountTo(parent){
	        parent.appendChild(this.root);
	    }
	}
	
	//标签是大写的时候
	class Carousel {
	    constructor(){
	        this.root = document.createElement("div");
	    }
	    setAttribute(name, value){
	        this.root.setAttribute(name, value);
	    }
	    appendChild(child){
	        //this.root.appendChild(child);
	        child.mountTo(this.root);
	    }
	    mountTo(parent){
	        parent.appendChild(this.root);
	    }
	
	}
	
	let a = <div id="a">
	    <span>a</span>
	    <span>b</span>
	    <span>c</span>
	    Hellow world!
	    </div>
	
	    //document.body.appendChild(a);
	
	    a.mountTo(document.body);


## 轮播组件（一） ##

希望在调试的时候体验好一点，可以安装dev tool( webpack-dev-server)

	npm install webpack-dev-server --save-dev

它依赖webpack-cli,所以还需要安装

	npm install --save-dev webpack-cli

安装好之后启动程序

	webpack-dev-server

### 无法启动原因： ###

1.如果你电脑全局没有装 webpack-dev-server
你直接使用 webpack-dev-server 命令会报错 command not found: webpack-dev-server
需要使用 node_modules/.bin/webpack-dev-server 启动
或者
配置在package.json 例如:

	"scripts": {
	"start": "webpack-dev-server"
	}

使用 npm start 或 yarn start 启动


2.webpack-cli是4.* 版本 会和 webpack-dev-server 3.* 版本 不兼容

启动 webpack-dev-server 会报错：Cannot find module 'webpack-cli/bin/config-yargs'


可以换成启动 **webpack serve** 命令

## 轮播组件（二） ##

轮播效果一:图片可自动播放

	class Carousel extends Component{
	    constructor(){
	        super();
	        this.attrbutes = Object.create(null);
	    }
	    setAttribute(name, value){
	        this.attrbutes[name] = value;
	    }    
	    render(){
	        //console.log(this.attrbutes.src);//检查有没有取到图片
	        this.root = document.createElement("div");
	        this.root.classList.add("carousel");//增加class
	        for(let record of this.attrbutes.src){
	            //let child = document.createElement("img");
	            //child.src = record;
	            //将img换成div
	            let child = document.createElement("div");
	            child.style.backgroundImage = `url('${record}')`;
	            //child.style.display = "none";
	            this.root.appendChild(child);
	        }
	
	        //let current = 0;
	        let currentIndex = 0;//轮播记数
	        setInterval(()=>{
	            let children = this.root.children;
	            let nextIndex = (currentIndex + 1) % children.length;//下一张
	            //++current;
	            //current = current % children.length;//播到最后一张反向回到第一张
	
	            let current = children[currentIndex];
	            let next = children[nextIndex];
	
	            next.style.transition = "none";//不希望next的移动有动画
	            next.style.transform = `translateX(${100 - nextIndex * 100 }%)`;
	            //for(let child of children) {
	              //  child.style.transform = `translateX(-${current * 100}%)`;
	            //}
	
	            setTimeout(()=>{
	                next.style.transition = "";
	                current.style.transform = `translateX(${-100 - currentIndex * 100 }%)`;
	                next.style.transform = `translateX(${ - nextIndex * 100 }%)`;
	                currentIndex = nextIndex;
	            },16);//16毫秒刚好是浏览器中一帧的时间         
	
	        },3000)
	
	
	        return this.root;
	    }
	    mountTo(parent){
	        parent.appendChild(this.render());
	    }	
	}

轮播效果二:图片可鼠标点击播放

初始结构

	class Carousel extends Component{
	    constructor(){
	        super();
	        this.attrbutes = Object.create(null);
	    }
	    setAttribute(name, value){
	        this.attrbutes[name] = value;
	    }    
	    render(){
	        //console.log(this.attrbutes.src);//检查有没有取到图片
	        this.root = document.createElement("div");
	        this.root.classList.add("carousel");//增加class
	        for(let record of this.attrbutes.src){
	            //let child = document.createElement("img");
	            //child.src = record;
	            //将img换成div
	            let child = document.createElement("div");
	            child.style.backgroundImage = `url('${record}')`;
	            //child.style.display = "none";
	            this.root.appendChild(child);
	        }
	
	        //鼠标控制播放--拖拽
	        //监听鼠标的mousedow、mousemove、mouseup事件
	        this.root.addEventListener("mousedown", event =>{
	            console.log("mousedown");
	
	            let move = event => {
	                console.log("mousemove");
	            }
	            let up = event =>{
	                console.log("mouseup");
	                document.removeEventListener("mousemove",move);
	                document.removeEventListener("mouseup",up);
	            }
	            //document监听有一个好处，即使是已处理浏览器范围外，也能监听到这个事件触发他们
	            document.addEventListener("mousemove",move);
	            document.addEventListener("mouseup",up);
	        })      
	
	        return this.root;
	    }
	    mountTo(parent){
	        parent.appendChild(this.render());
	    }
	}

## 轮播组件（三） ##
鼠标拖动播放

	//引入Component, createElement
	import {Component, createElement} from "./framework.js"
	
	//标签是大写的时候
	class Carousel extends Component{
	    constructor(){
	        super();
	        this.attrbutes = Object.create(null);
	    }
	    setAttribute(name, value){
	        this.attrbutes[name] = value;
	    }    
	    render(){
	        //console.log(this.attrbutes.src);//检查有没有取到图片
	        this.root = document.createElement("div");
	        this.root.classList.add("carousel");//增加class
	        
	        for(let record of this.attrbutes.src){
	            //let child = document.createElement("img");
	            //child.src = record;
	            //将img换成div
	            let child = document.createElement("div");
	            child.style.backgroundImage = `url('${record}')`;
	            //child.style.display = "none";
	            this.root.appendChild(child);
	        }
	
	        let position = 0;
	        //鼠标控制播放--拖拽
	        //监听鼠标的mousedow、mousemove、mouseup事件
	        this.root.addEventListener("mousedown", event =>{
	            console.log("mousedown");
	            //起始点
	            let startX = event.clientX;
	            //let startY = event.clientY;
	
	            let children = this.root.children;
	
	            let move = event => {
	                console.log("mousemove");
	                let x = event.clientX - startX;
	                //let y = event.clientY -startY;
	                for(let child of children){
	                    child.style.transition = "none";//关闭transition
	                    child.style.transform = `translateX(${-position * 500 + x}px)`;
	                }
	            }
	            let up = event =>{
	                console.log("mouseup");
	                let x = event.clientX - startX;
	                position = position - Math.round(x/500);//让x为离500较近的值
	                for(let child of children){
	                    child.style.transition = "";//关闭transition
	                    child.style.transform = `translateX(${-position * 500}px)`;
	                }
	                document.removeEventListener("mousemove",move);
	                document.removeEventListener("mouseup",up);
	            }
	            //document监听有一个好处，即使是已处理浏览器范围外，也能监听到这个事件触发他们
	            document.addEventListener("mousemove",move);
	            document.addEventListener("mouseup",up);
	        })
	        return this.root;
	    }
	    mountTo(parent){
	        parent.appendChild(this.render());
	    }
	
	}
	
	//轮播图
	let d = [
	    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
	    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
	    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
	    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
	]
	
	let a = <Carousel src={d}/>
	a.mountTo(document.body);

## 轮播组件（四） ##

	//引入Component, createElement
	import {Component, createElement} from "./framework.js"
	
	//标签是大写的时候
	class Carousel extends Component{
	    constructor(){
	        super();
	        this.attrbutes = Object.create(null);
	    }
	    setAttribute(name, value){
	        this.attrbutes[name] = value;
	    }    
	    render(){
	        //console.log(this.attrbutes.src);//检查有没有取到图片
	        this.root = document.createElement("div");
	        this.root.classList.add("carousel");//增加class
	        
	        for(let record of this.attrbutes.src){
	            //let child = document.createElement("img");
	            //child.src = record;
	            //将img换成div
	            let child = document.createElement("div");
	            child.style.backgroundImage = `url('${record}')`;
	            //child.style.display = "none";
	            this.root.appendChild(child);
	        }
	
	        let position = 0;
	        //鼠标控制播放--拖拽
	        //监听鼠标的mousedow、mousemove、mouseup事件
	        this.root.addEventListener("mousedown", event =>{
	            console.log("mousedown");
	            //起始点
	            let startX = event.clientX;
	            //let startY = event.clientY;
	
	            let children = this.root.children;
	
	            let move = event => {
	                console.log("mousemove");
	                let x = event.clientX - startX;
	                
	                let current = position - ((x - x % 500)/500);
	                for(let offset of [-1,0,1]){
	                    let pos = current + offset;
	                    pos = (pos + children.length)%children.length;
	                    children[pos].style.transition = "none";
	                    children[pos].style.transform = `translateX(${-pos * 500 + offset * 500 + x % 500}px)`;
	
	                }           
	            }
	            let up = event =>{
	                console.log("mouseup");
	                let x = event.clientX - startX;
	                position = position - Math.round(x/500);//让x为离500较近的值
	                for(let offset of [0,Math.sign(Math.round(x/500) - x + 250 * Math.sign(x))]){
	                    let pos = position + offset;
	                    pos = (pos + children.length)%children.length;
	                    children[pos].style.transition = "";
	                    children[pos].style.transform = `translateX(${-pos * 500 + offset * 500}px)`;
	
	                }  
	                document.removeEventListener("mousemove",move);
	                document.removeEventListener("mouseup",up);
	            }
	            //document监听有一个好处，即使是已处理浏览器范围外，也能监听到这个事件触发他们
	            document.addEventListener("mousemove",move);
	            document.addEventListener("mouseup",up);
	        })
	     
	
	        return this.root;
	    }
	    mountTo(parent){
	        parent.appendChild(this.render());
	    }
	
	}
	//轮播图
	let d = [
	    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
	    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
	    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
	    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
	]
	
	let a = <Carousel src={d}/>
	a.mountTo(document.body);