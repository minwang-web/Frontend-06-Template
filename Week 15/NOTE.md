学习笔记

## 复习上周命令 ##

	npm install -g cnpm --registry=https://registry.npm.taobao.org #更换镜像源
	cnpm -v #查看版本
	clear #vs code清除终端命令
	
	cnpm init #初始化webpack
	cnpm install -g webpack webpack-cli  #全局安装webpack webpack-cli
	webpack --version #查看版本
	
	cnpm install --save-dev webpack babel-loader #本地目录安装
	code . #vs code 终端打开当前项目
	
	cnpm install --save-dev @babel/core @babel/preset-env 
	#只安装babel/core啥也不会做，还需要安装babel的preset-env

	cnpm install --save-dev @babel/plugin-transform-react-jsx #plugin

	cnpm install webpack-dev-server --save-dev
	cnpm install --save-dev webpack-cli
	webpack-dev-server #运行webpack 或用 webpack serve

## 手势与动画 | 实现鼠标操作 ##

[本人笔记链接：](https://blog.csdn.net/minmin_web/article/details/113730956)

学习课程，简要做下记录。

### 鼠标mouse事件：

	let element = document.documentElement;
	
	element.addEventListener("mousedown",event=>{
	    let mousemove = event => {
	        console.log(event.clientX, event.clientY)
	    }
	    let mouseup = event => {
	        element.removeEventListener("mousemove",mousemove);
	        element.removeEventListener("mouseup",mouseup);
	    }
	    element.addEventListener("mousemove",mousemove);
	    element.addEventListener("mouseup",mouseup);
	
	})

### 移动端touch事件：
移动端，触屏事件，touchstart和move一定触发在同一个元素上
所以touch事件的监听不需要像mouse事件一样mousedown之后才去监听

	element.addEventListener("touchstart", event => {
	    //console.log(event.changedTouches);
	    for(let touch of event.changedTouches){
	        console.log("start",touch.clientX, touch.clientY)
	    }
	})
		element.addEventListener("touchmove", event => {
	    //console.log(event.changedTouches);
	    for(let touch of event.changedTouches){
	        console.log("move",touch.clientX, touch.clientY)
	    }
	
	})
	element.addEventListener("touchend", event => {
	    //console.log(event.changedTouches);
	    for(let touch of event.changedTouches){
	        console.log("end",touch.clientX, touch.clientY)
	    }
	})
	
touch事件和mouse事件类似，也有clientX，clientY，……等。但是touch事件有identifier。

这是因为start，move，end 事件需要一个唯一的标识符去追踪触屏事件，所以start，move，end会各有一个标识符，会用identifier去表示touch的惟一的ID

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210206212723310.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21pbm1pbl93ZWI=,size_16,color_FFFFFF,t_70)

touch 事件中start，move，end 与mouse中down, move, up 类似。但是touch事件比mouse事件多了touchcancel，cancel就是手指touch的点的序列，是以一个异常的模式去结束的

	element.addEventListener("touchcancel", event => {
	    //console.log(event.changedTouches);
	    for(let touch of event.changedTouches){
	        console.log("cancel",touch.clientX, touch.clientY)
	    }
	})

正常的一个序列就是一个start, 一堆move, 然后end, 如下图：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210206213430688.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21pbm1pbl93ZWI=,size_16,color_FFFFFF,t_70)

但是我们如果3秒后让它触发一个alert，我的触屏就会被alert打断（一直触屏，直到弹出alert）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210206213849841.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21pbm1pbl93ZWI=,size_16,color_FFFFFF,t_70)

关闭alert之后，可以看到最后出现了cancel事件。鼠标事件不会出现这种情况，永远不会出现mousecancel这种情况。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210206213909358.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21pbm1pbl93ZWI=,size_16,color_FFFFFF,t_70)

### 抽象出统一的方法
针对mouse和touch两套操作，可以抽象出统一的方法。

这样就不用去针对具体的mouse还是touch事件去做处理，只需要抽象的针对每一个点的start move end cancel去写逻辑就可以了

	let start = (point) => {
	    console.log("start", point.clientX, point.clientY);
	}
	let move = (point) => {
	    console.log("move", point.clientX, point.clientY);
	    
	}
	let end = (point) => {
	    console.log("end", point.clientX, point.clientY);
	    
	}
	let cancel = (point) => {    
	    console.log("cancel", point.clientX, point.clientY);
	}

gesture.js第一步全代码如下：

	//手势
	let element = document.documentElement;
	
	element.addEventListener("mousedown",event=>{
	    start(event);
	    let mousemove = event => {
	        //console.log(event.clientX, event.clientY)
	        move(event);
	    }
	    let mouseup = event => {
	        end(event);
	        element.removeEventListener("mousemove",mousemove);
	        element.removeEventListener("mouseup",mouseup);
	    }
	    element.addEventListener("mousemove",mousemove);
	    element.addEventListener("mouseup",mouseup);
	
	})
	
	//移动端，触屏事件，touchstart和move一定触发在同一个元素上
	//所以touch事件的监听不需要像mouse事件一样mousedown之后才去监听
	element.addEventListener("touchstart", event => {
	    //console.log(event.changedTouches);
	    //start，move，end 需要一个唯一的标识符去追踪它，
	    //所有start，move，end会各有一个标识符，会用identifier去表示touch的惟一的ID
	
	    for(let touch of event.changedTouches){
	        //console.log("start",touch.clientX, touch.clientY);
	        start(touch);
	    }
	})
	element.addEventListener("touchmove", event => {
	    //console.log(event.changedTouches);
	    for(let touch of event.changedTouches){
	        //console.log("move",touch.clientX, touch.clientY)
	        move(touch);
	    }
	
	})
	element.addEventListener("touchend", event => {
	    //console.log(event.changedTouches);
	    for(let touch of event.changedTouches){
	        //console.log("end",touch.clientX, touch.clientY)
	        end(touch);
	    }
	})
	
	//touch 事件比鼠标事件多了touchcancel，
	//cancel就是手指touch的点的序列，是以一个异常的模式去结束的
	//正常的一个序列就是一个start, 然后一堆move, 然后end
	element.addEventListener("touchcancel", event => {
	    //console.log(event.changedTouches);
	    for(let touch of event.changedTouches){
	        //console.log("cancel",touch.clientX, touch.clientY)
	        cancel(touch);
	    }
	})
	
	//这样的一种抽象，就不用去针对具体的鼠标还是touch事件去做处理
	//只需要抽象的针对每一个点的start move end cancel去写逻辑就可以了
	let start = (point) => {
	    console.log("start", point.clientX, point.clientY);
	}
	let move = (point) => {
	    console.log("move", point.clientX, point.clientY);
	    
	}
	let end = (point) => {
	    console.log("end", point.clientX, point.clientY);
	    
	}
	let cancel = (point) => {    
	    console.log("cancel", point.clientX, point.clientY);
	}

