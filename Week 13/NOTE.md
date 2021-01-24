学习笔记

## 合法元素 ##

- Element: `<tagname>...</tagname>`  元素
- Text:text			文本节点
- Comment:`<!--comments-->`		注释节点
- DocumentType:<!DOCTYPE HTML>	HTML5
- ProcessingInstruction:<?a 1?>	里面是一些预处理语法
- CDATA:<![CDATA[ ]]>	CDATA中用到的文本不需要考虑转义问题

## 字符引用 ##

- &#161; 数字型引用，代表161的ASCLL字符
- &amp;	"&"
- &lt; "<"
- &quot;"""

## DOM API ##

node

- element:元素型节点，跟标签相对应
	- HTMLElement
	- SVGElement
- Document：文档根节点
- CharacterData:字符数据
	- Text:文本节点 --CDATA节点
	- comment：注释
	- ProcessingInstruction：处理信息
- DocumentFragment:文档片段
- DocumentType:文档类型

### 导航类操作 ###

- parentNode 找到他的父节点
- childNodes 找到他的子节点
- firstCild 找到他的第一个节点
- lastCild 找到他的最后一个节点
- nextSibling 找到他的下一个兄弟节点
- previousSibling 找到他的前一个兄弟节点

- parentElement
- children
- firstElementChild
- lastElementChild
- nextElementSibling
- previousElementSibling

### 修改操作 ###

- appendChild 向节点添加最后一个子节点
- insertBefore 在您指定的已有子节点之前插入新的子节点。
- removeChild 移除
- replaceChild 相当于一次remove + 一次insert

### 高级操作 ###

- compareDocumentPosition 是一个用于比较两个节点中的关系函数
- contains 检查一个节点是否包含另一个节点
- isEqualNode 检查两个节点是否完全相同
- isSameNode 检查两个节点是否是同一个节点，实际在JS中可以用“===”。
- cloneNode 复制一个节点，如果传入参数true，则会连同子元素做深拷贝

## 事件API ##

[参考链接](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

句法

	target.addEventListener(type, listener [, options]);
	target.addEventListener(type, listener [, useCapture]);
	target.addEventListener(type, listener [, useCapture, wantsUntrusted 
	    This API has not been standardized.
	    
	    
	]); // Gecko/Mozilla only

参量
type：区分大小写的字符串，表示要侦听的事件类型。
listener：Event当指定类型的事件发生时，接收通知的对象（实现接口的对象 ）。这必须是实现EventListener接口的对象或JavaScript 函数。有关回调本身的详细信息，请参见 事件侦听器回调。
options 可选的
选项对象指定有关事件侦听器的特征。可用的选项有：

- capture：一个Boolean表明这种类型的事件将被分派到注册listener被分派到任何之前 EventTarget它下面的DOM树。
- once：一个Boolean指示listener 应至多调用添加后一次。如果为true，则 listener在调用时会自动将其删除。
- passive：一Boolean ，如果true，指示由指定的函数listener永远不会调用 preventDefault()。如果被动侦听器确实进行了调用preventDefault()，则用户代理将不执行任何操作，只生成控制台警告。请参阅使用被动侦听器提高滚动性能以了解更多信息。
-  mozSystemGroup：甲Boolean指示侦听器应该被添加到系统组。仅在XBL或Firefox浏览器的Chrome中运行的代码中可用 。


冒泡与捕获：先捕获在冒泡

## 浏览器API ##

Range API

把一个元素所有子元素逆序？

初级解法

	function ReverseChildren(element){
	let children = Array.prototype.slice.call(element.childNodes); 
	//移除所有元素
	for(let child of children){
	    element.removeChild(child);
	}
	
	children.reverse();
	
	for(let child of children){
	    element.appendChild(child);
	}
	}
 
//正常解法 二级

	function ReverseChildren(element){
	    var  l = element.childNodes.length;
	    while(l-- > 0){
	        element.appendChild(element.childNodes[l]);
	    }
	}

用Range API

var range = new Range();
range.setStart(element,9);
range.setEnd(element,4);
var range = document.getSelection().getRangeAt(0);

range.setStartBefore
range.setEndBefore
range.setStartAfter
range.setEndAfter
range.selectNode
range.selectNodeContents


var fragment = range.extractContents();
//把range里面选取的内容，插入一个新的节点
range.insertNode(document.createTextNode("aaaa"));

优解，对DOM操作两次

	function ReverseChildren(element){ 
	    let range = new Range();//创建新的range
	    range.selectNodeContents(element);//选中node的contents
	    
	    let fragment = range.extractContents();//extract出来，此时也会创建一个fragment，里面就是 span p a……
	
	    //不需要发生重排的操作，性能高
	    var l = fragment.childNodes.length;
	    while(l-- > 0){
	        fragment.appendChild(fragment.childNodes[l]);
	    }
	    element.appendChild(fragment);
	}

## CSSOM ##

DOM是对HTML所描述的文档的一个抽象

对CSS文档的抽象，就是CSSOM。

css代码就是潜在HTML的代码里的，所以CSS的一切API都需要通过document.styleSheets这个属性去访问

document.styleSheets 查看

### rules ###

- document.styleSheets[0].cssRules
- document.styleSheets[0].insertRule("p {color: pink;}", 0)
- document.styleSheets[0].removeRule(0)


CSSStyleRule

- slectorText String
- style K-V结构


document.styleSheets[0].cssRules[0].style.color = 'lightgreen'

### getComputedStyle ###

getComputedStyle属性可以去到页面上元素最终真实渲染的时候所需要的CSS的属性

- window.getComputedStyle(elt, pseudoElt);
	- elt 想要获取的元素
	- pseudoElt 可选，伪元素

//获取所有对a元素已经计算出来的属性
getComputedStyle(document.querySelector("a"));

//获取伪元素
getComputedStyle(document.querySelector("a"),"::before")

## CSSOM View ##

**window**

- window.innerHeight,window.innerWidth 实际上所使用的的viewport，也就是浏览器HTML实际上渲染所用的区域 的高度和宽度
- window.outerHeight,window.outerWidth  包含了浏览器自带的工具栏 总共用的尺寸
- window.devicePixelRatio 屏幕上的物理像素 与 代码中的逻辑像素px 的一个比值
- window.screen  
	- window.screen.width 实际上的屏幕的宽和高
	- window.screen.height
	- window.screen.availWidth 可使用的宽和高
	- window.screen.avialHeight

**window API**

- window.open("about:blank", "blank","width=100,height=100,left=100,right = 100")
- moveTo(x,y)
- moveBy(x,y)
- resizeTo(x,y)
- resizeBy(x,y)

**scroll**

元素

- scrollTop
- scrollLeft
- scrollWidth
- scrollHeight
- scroll(x,y)
- scrollBy(x,y)
- scrollIntoView()

- Window
	- scrollX
	- scrollY
	- scroll(x,y)
	- scrollBy(x,y)

**layout API 在每一个元素上**

- getClientRects() 
- getBoundingClientRect()

x.getClientRects();//获取元素生成的盒

伪元素本身也会参与获取生成盒的过程中

## 其他API ##

标准化组织

- khronos
	- WebGL
- ECMA
	- ECMAScript
- WHATWG
	- HTNL
- W3C
	- webaudio
	- CG/WG






