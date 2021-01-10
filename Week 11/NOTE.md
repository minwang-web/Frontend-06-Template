学习笔记

## 1. CSS总论 | CSS语法的研究 ##

## CSS2.1的语法 ##

[链接1](https://www.w3.org/TR/CSS21/grammar.html#q25.0)

[链接2](https://www.w3.org/TR/css-syntax-3/)

	stylesheet
	  : [ CHARSET_SYM STRING ';' ]?
	    [S|CDO|CDC]* [ import [ CDO S* | CDC S* ]* ]*
	    [ [ ruleset | media | page ] [ CDO S* | CDC S* ]* ]*
	  ;

### CSS总体结构 ###

- @charset
- @import
- ryles
	- @media
	- @page
	- rule

css规则：一种是普通规则，一种是@规则

## 2. CSS总论 | CSS @规则的研究 ##

At-rules

- [@charset ：](https://www.w3.org/TR/css-syntax-3/) 声明css的字符集
- [@import ：](https://www.w3.org/TR/css-cascade-4/) 在css cascade 级联标准里 
- [@media ：](https://www.w3.org/TR/css3-conditional/) 在css3-conditional标准里
- [@page ：](https://www.w3.org/TR/css-page-3/) 分页媒体
- [@counter-style ：](https://www.w3.org/TR/css-counter-styles-3 ) 列表前面的小黑点或小数字
- [@keyframes ： ](https://www.w3.org/TR/css-animations-1/) 定义动画
- [@fontface ：](https://www.w3.org/TR/css-fonts-3/ ) web font功能，定义字体
- [@supports ：](https://www.w3.org/TR/css3-conditional/) 用来检查某些css的功能存不存在（不建议用它检查css的兼容性）
- [@namespace ：](https://www.w3.org/TR/css-namespaces-3/)

## 3. CSS总论 | CSS规则的结构 ##

CSS规则

- Selector(选择器)
 
	- [level3](https://www.w3.org/TR/selectors-3/)

	- [level4](https://www.w3.org/TR/selectors-4/)

- 声明
	- Key
		- Properties (属性)
		- [Variables:](https://www.w3.org/TR/css-variables/) 
	 
	- Value 
		- [level4](https://www.w3.org/TR/css-values-4/)

## 4. CSS总论 | 收集标准 ##

https://www.w3.org/TR/?tag=css网页控制台输入得到css标准的列表：

    Array.prototype.slice.call(document.querySelector("#container").children).filter(e => e.getAttribute("data-tag").match(/css/)).map(e =>({
		name: e.children[1].innerText, 
		url:e.children[1].children[0].href
	}))

将其做JSON.stringify():

    JSON.stringify(Array.prototype.slice.call(document.querySelector("#container").children).filter(e => e.getAttribute("data-tag").match(/css/)).map(e =>({
    	name: e.children[1].innerText, 
    	url:e.children[1].children[0].href
    })))

## 5. CSS总论 | CSS总论总结 ##

CSS语法
 
- at-rule 
- selector 
- variables 
- value 
- 实验

## 6.CSS选择器 | 选择器语法 ##

### 简单选择器 ###

- *					通用选择器
- div svg|a			类型选择器
- .cls
- #id
- [attr=value]
- :hover
- ::before


### 复合选择器 ###

- <简单选择器><简单选择器><简单选择器>
- * 或者 div 必须写在最前面

### 复杂选择器 ###

- <复合选择器><sp><复合选择器>		用空格分开表示子孙选择器
- <复合选择器>">"<复合选择器>		必须是它的直接上级	
- <复合选择器>"~"<复合选择器>		
- <复合选择器>"+"<复合选择器>
- <复合选择器>"||"<复合选择器>		做表格时，表示可以选中某一个列

## 7.CSS选择器 | 选择器优先级 ##

### 简单选择器计数 ###

选择优先级已计数的形式统计优先级
如下样式,计数为 arr = [0, 2, 1, 1]
arr[0]: 固定值为0

**#选择器出现个数为2所以 arr[1] = 2**

tagName选择器出现个数为1所以 arr[2] = 1

.cls选择器出现个数为1所以 第位为 arr[3] = 1

    #id div.a#id {
    //......
    }

S = 0 * N3 + 2 * N2 + 1 * N1 + 1;
N 取固定值： 1000000 计算出 S 为 最终优先级的值

### 练习 ###

请写出下面选择器的优先级

- div#a.b .c[id=x] [0 1 3 1]
- #a:not(#b) [0 2 0 0]
- *.a [0 0 1 0]
- div.a [0 0 1 1]

## 8.CSS选择器 | 伪类 ##

### 链接/行为 ###

- :any-link			匹配所有超链接
- :link :visited	匹配已经访问过的超链接
- :hover			鼠标移动到链接上
- :active			激活状态
- :focus			获取焦点状态
- :target			锚点状态

### 树结构 ###

- :empty		是否有子元素
- :nth-child()	匹配该元素的第几个子元素 支持奇偶 odd even n
- :nth-last-child()	匹配该元素的第几个子元素 从最后一个开始
- :first-child 	元素的第一个子元素
- :last-child 	元素的最后一个子元素
- :only-child	指定子元素

	*:nth-child 是一个非常复杂的伪类，里面支持一种语法，比如说可以在括号里面写奇偶 event 或者 odd，也可以写 4N+1、3N-1，这个就会分别匹配到整数的形态。因为这个是一个比较复杂的选择器，我们就不要在里面写过于复杂的表达式了，只用它来处理一下奇偶，逢3个多1个，逢4个多1个等等这种表达式。*

	*其实 empty 、 nth-last-child、last-child、only-child 这两个选择器，是破坏了我们之前在 《实现中学习浏览器原理》中的说到的 CSS 计算的时机问题。我们可以想象一下，当我们在开始标签计算的时候，肯定不知道它有没有子标签。empty 影响不是特别大，但是 last-child 的这个关系其实还是影响蛮大的。所以浏览在实现这些的时候是做了特别处理的，要么就是浏览器实现的不是特别好，要么就是浏览器要耗费更大的性能来得以实现。所以建议大家尽量避免大量使用这些。*

### 逻辑型 ##

- :not伪类		排除；主流浏览器只支持简单选择器的序列（复合选择器）我们是没有办法在里面写复杂选择器的语法的
- :where 		:where() 实验功能；
- :has			:has()  匹配指定选择器节点 例如：a:has(> img) 只会匹配直接包含` <img>` 子元素的 `<a>` 元素

	*这里还是想温馨建议一下大家，不建议大家把选择器写的过于复杂，我们很多时候都可以多加一点 class 去解决的。如果我们的选择器写的过于复杂，某种程度上意味着 HTML 结构写的不合理。我们不光是为了给浏览器工程省麻烦，也不光是为了性能，而是为了我们自身的代码结构考虑，所以我们不应该出现过于复杂的选择器。*

## 9.CSS选择器 | 伪元素 ##

- ::before			节点之前插入元素
- ::after			节点后插入元素
- ::first-line		首行
- ::first-letter	首页字符

::before 和 ::after 是在元素的内容的前和后，插入一个伪元素。一旦应用了 before 和 after 的属性，declaration（声明）里面就可以写一个叫做 content 的属性（一般元素是没有办法写 content 的属性的）。content 的属性就像一个真正的 DOM 元素一样，可以去生成盒，可以参与后续的排版和渲染了。所以我们可以给他声明 border、background等这样的属性。

可以理解为：伪元素向界面上添加了一个不存在的元素。

::first-line 和 ::first-letter 的机制就不一样了。这两个其实原本就存在 content 之中。他们顾名思义就是 选中“第一行” 和选中 “第一个字母”。它们 不是一个不存在的元素，是把一部分的文本括了起来让我们可以对它进行一些处理。

#### before 和 after ####
在我们概念里，我们可以认为带有 before 伪元素的选择器，会给他实际选中的元素的内容前面增加了一个元素，我们只需要通过他的 content 属性为它添加文本内容即可。（这里我们也可以给伪元素赋予 content: '' 为空的）所以我们可以任何的给 before 和 after 指定 display 属性，和不同元素一样比较自由的。

我们在实现一些组建的时候，也会常常使用这种不污染 DOM 树，但是能实际创造视觉效果的方式来给页面添加一些修饰性的内容。

	    <div>	    
	    <::before/>	    
	    content content content content
	    content content content content
	    content content content content
	    content content content content
	    content content content content
	    content content content content	    
	    <::after/>	    
	    </div>

#### first-letter 和 first-line ####
first-letter 相当于我们有一个元素把内容里面的第一个字母给括了起来。这个 first-letter 我们是可以任意声明各种不同的属性的，但是我们是无法改变它的 content 的。我们应该都看到过报纸上的第一个字母会比较大，然后会游离出来的效果，这个在 CSS 里面我们就可以用 ::first-letter的伪元素选择器了。使用这个来实现相比用 JavaScript 来实现就会更加稳定和代码更加优雅一些。

    	<div>
    	<::first-letter>c</::first-letter> content content content content
    	content content content content
    	content content content content
    	content content content content
    	content content content content
    	content content content content
    	</div>

first-line 是针对排版之后的 line，其实跟我们源码里面的 first line 没有任何的关系的。假如说我们的浏览器提供的渲染的宽度不同，first-line 在两个环境里面它最终括住的元素数量就不一样多了。所以我们用这个选择器的时候需要去根据需求的情况使用，很有可能在我们开发机器上和用户的机器上渲染出来的效果是不一样的！
    	<div>
    	<::first-line>content content content content </::first-line>
    	content content content content
    	content content content content
    	content content content content
    	content content content content
    	content content content content
    	</div>


## 思考 ##

为什么first-letter可以设置float之类的，而first-line不行呢？

first-letter 是将`<first-letter>a</first-letter>`包裹首个字符，而first-line则不能使用这种方式，因为首行字符数是不可控的，不同屏幕尺寸或者字体大小会影响首行渲染

## 作业：编写一个match函数 ##

编写一个 match 函数。它接收两个参数，第一个参数是一个选择器字符串性质，第二个是一个 HTML 元素。这个元素你可以认为它一定会在一棵 DOM 树里面。通过选择器和 DOM 元素来判断，当前的元素是否能够匹配到我们的选择器。（不能使用任何内置的浏览器的函数，仅通过 DOM 的 parent 和 children 这些 API，来判断一个元素是否能够跟一个选择器相匹配。）以下是一个调用的例子。


    function match(selector, element) {
    return true;
    }
    match("div #id.class", document.getElementById("id"));

[作业参考链接：](https://cloud.tencent.com/developer/article/1734381?from=information.detail.word-spacing)


	<!DOCTYPE html>
	<html lang="en">
	  <head>
	    <meta charset="UTF-8" />
	    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	    <title>Match Example —— by 三钻</title>
	  </head>
	  <body>
	    <div>
	      <b>
	        <div class="class classA" id="id">content</div>
	      </b>
	    </div>
	  </body>
	  <script language="javascript">
	    /**
	     * 匹配选择器
	     */
	    function matchSelectors(selector, element) {
	      // 先匹配当前元素是否匹配
	      let tagSelector = selector.match(/^[\w]+/gm);
	      let idSelectors = selector.match(/(?<=#)([\w\d\-\_]+)/gm);
	      let classSelectors = selector.match(/(?<=\.)([\w\d\-\_]+)/gm);
	
	      /**
	       * 实现复合选择器，实现支持空格的 Class 选择器
	       * --------------------------------
	       */
	      // 检查 tag name 是否匹配
	      if (tagSelector !== null) {
	        if (element.tagName.toLowerCase() !== tagSelector[0]) return false;
	      }
	      // 检测 id 是否匹配
	      if (idSelectors !== null) {
	        let attr = element.attributes['id'].value;
	        if (attr) {
	          for (let selector of idSelectors) {
	            if (attr.split(' ').indexOf(selector) === -1) return false;
	          }
	        }
	      }
	      // 检测 class 是否匹配
	      if (classSelectors !== null) {
	        let attr = element.attributes['class'].value;
	        if (attr) {
	          for (let selector of classSelectors) {
	            if (attr.split(' ').indexOf(selector) === -1) return false;
	          }
	        }
	      }
	
	      return true;
	    }
	
	    /**
	     * 匹配元素
	     */
	    function match(selector, element) {
	      if (!selector || !element.attributes) return false;
	
	      let selectors = selector.split(' ').reverse();
	
	      if (!matchSelectors(selectors[0], element)) return false;
	
	      let curElement = element;
	      let matched = 1;
	
	      // 递归寻找父级元素匹配
	      while (curElement.parentElement !== null && matched < selectors.length) {
	        curElement = curElement.parentElement;
	        if (matchSelectors(selectors[matched], curElement)) matched++;
	      }
	
	      // 所有选择器匹配上为 匹配成功，否则是失败
	      if (matched !== selectors.length) return false;
	
	      return true;
	    }
	
	    let matchResult = match('div #id.class', document.getElementById('id'));
	    console.log('Match example by 三钻');
	    console.log('matchResult', matchResult);
	  </script>
	</html>