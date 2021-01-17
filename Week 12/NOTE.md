学习笔记

## 1. CSS排版 | 盒 ##

1. 标签 ( Tag ) —— 源代码
1. 元素 (Element) —— 语义
1. 盒 ( Box ) —— 表现

HTML代码中可以书写开始**标签**，结束**标签** ，和自封闭**标签**。

一对起止**标签**，表示一个**元素** 。

DOM树中存储的是**元素**和其它类型的节点（Node）。

CSS选择器选中的是**元素**。

CSS选择器选中的**元素**，在排版时可能产生多个**盒** 。
排版和渲染的基本单位是**盒** 

### css的两种盒模型 ###

- W3C的标准盒模型：在标准的盒子模型中，width指content部分的宽度
- IE的盒模型：在IE盒子模型中，width表示content+padding+border这三个部分的宽度


### box-sizing的使用 ###

- box-sizing: content-box 是W3C盒子模型
- box-sizing: border-box 是IE盒子模型


## 2. CSS排版 | 正常流 ##

CSS 的排版其实是有三代的排版技术的：

- 第一代就是正常流
- 第二代就是基于 Flex 的排版
- 第三代就是基于 Grid 的排版
- 结合最近推出的 CSS Houdini，可能更接近的是 3.5 代，它是一种完全自由的，允许使用 JavaScript 干预的排版

目前主流都是在使用 flex 布局。相比 flex，其实正常流并没有变得更简单，反而是更复杂了。

不过挺有意思的是，flex 它比前面的第一代的排版技术要简单，比他后面一代的 grid 也简单。个人认为 flex 是最简单并且最容易理解的一代排版技术。

正常流呢，其实它能力最差，但是反而他的机制很复杂。

### 正常流排版 ###

- 收集盒进行 
- 计算盒在行中的排布 
- 计算行的排布

IFC：行内 inline-level-formatting-context
BFC：块级 block-level-formatting-context


## 3. CSS排版 | 正常流的行级排布 ##

Baseline

	<!DOCTYPE html>
	<html>
	<head>
		<title>行级排布</title>
	</head>
	<body>
		<div style="font-size: 50px;line-height: 100px;background-color: pink;">
			<div style="vertical-align: top;overflow: visible;display: inline-block;width: 1px;height: 1px;">
				<div style="width: 1000px;height: 1px;background-color: red"></div>
			</div>
			<span>Hello good 中文</span>	
			<div style="vertical-align: text-bottom;line-height: 70px;width: 100px;height: 150px;background-color: aqua;display: inline-block;">b <br /> c</div>	
			<div style="vertical-align: text-top;line-height: 70px;width: 100px;height: 150px;background-color: aqua;display: inline-block;">b <br /> c</div>	
		</div>
	</body>
	</html>


## 4. CSS排版 | 正常流的块级排布 ##

float 与 clear

	<!DOCTYPE html>
	<html lang="en">
	
	<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <title>float</title>
	</head>
	
	<body>
	    "float: "
	    <div style="float: right; width: 100px; height: 100px; background-color: blue;"></div>
	    "
	    文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字
	    文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字
	    文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字
	    文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字
	    文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字
	    float: "
	    <div style="float: right; width: 100px; height: 100px; background-color: blue;"></div>
	    "
	    文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字
	    文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字
	    文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字
	    文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字
	    文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字
	    float: "
	    <div style="clear: right; float: right; width: 100px; height: 100px; background-color: blue;"></div>
	    "
	    文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字
	    文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字
	    文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字
	    文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字
	    文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字
	    float: "
	    <div style="float: right; width: 100px; height: 100px; background-color: blue;"></div>
	    "
	    文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字
	    文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字
	    文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字
	    文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字
	    文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字"
	</body>
	
	</html>

注意：“清除浮动”的具体行为是重新找一块不会被占用的全新的区域进行浮动，而不是跟随上一个浮动元素的位置计算自身的位置 

## 5. CSS排版 | BFC合并 ##

Block

- Block Container：里面有BFC的 
	- 能容纳正常流的盒，里面就有BFC，想想有哪些？
- Block-level Box：外面有BFC的 
- Block Box = Block Container + Block-level Box： 里外都有BFC的


Block Container

- block
- inline-block
- table-cell 
- flex item
- grid cell
- table-caption


Block level 

- display:block
- display: flex
- display: table
- display: grid 
- ......


Inline level

- display: inline-bloc
- display: inline-flex
- display: inline-table
- display: inline-grid 
- ......


display: run-in



设立BFC

- floats 
- absolutely positioned elements 
- block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes, 
	- flex items 
	- grid cell
	- ...... 
- and block boxes with 'overflow' other than 'visible'

注：bfc 上下盒之间的 margin 会选两者中最大的那个，而不是两者相加的值

## 5. CSS排版 | BFC合并 ##

- block box && overflow:visible
	- BFC合并与float
	- BFC合并与边距折叠


## 6. CSS排版 | Flex排版 ##

Flex排版

- 收集盒进行
- 计算盒在主轴方向的排布
- 计算盒在交叉轴方向的排

分行 

- 根据主轴尺寸，把元素分进行
- 若设置了no-wrap，则强行分配进第一 行

计算主轴方向

- 找出所有Flex元素 
- 把主轴方向的剩余尺寸按比例分配给这 些元素
- 若剩余空间为负数，所有flex元素为0， 等比压缩剩余元素

计算交叉轴方向 

- 根据每一行中最大元素尺寸计算行高 
- 根据行高flex-align和item-align，确 定元素具体位

## 7. CSS动画与绘制 | 动画 ##

Animation

- @keyframes定义 
- animation: 使用


    @keyframes mykf {
    	from {background: red;} 
    	to {background: yellow;} 
    }
    div { 
    	animation:mykf 5s infinite; 
    }



- animation-name 时间曲线
- animation-duration 动画的时长；
- animation-timing-function 动画的时间曲线；
- animation-delay 动画开始前的延迟；
- animation-iteration-count 动画的播放次数；
- animation-direction 动画的方向

	@keyframes mykf { 
	    0% { top: 0; transition:top ease} 
	    50% { top: 30px;transition:top ease-in } 
	    75% { top: 10px;transition:top ease-out } 
	    100% { top: 0; transition:top linear} 
	}

Transition

- transition-property 要变换的属性； 
- transition-duration 变换的时长；
- transition-timing-function 时间曲线； 
- transition-delay 延迟


## 9. CSS动画与绘制 | 绘制  ##

绘制

- 几何图形
	- border 
	- box-shadow 
	- border-radius
- 文字 
	- font
	- text-decoration 
- 位图 
	- background-image

应用技巧

- data uri + svg 
- data:image/svg+xml,<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg"><ellipse cx="300" cy="150" rx="200" ry="80" style="fill:rgb(200,100,50); stroke:rgb(0,0,100);stroke-width:2"/> </svg>