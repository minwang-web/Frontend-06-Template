学习笔记

## 排版 ##
### 根据浏览器属性进行排版 ###

在这一部分，重点就是把具体的width、height、left、right、top、bottom等属性抽象成了main cross 相关的属性

### 收集元素进行 ###

分行：

- 根据主轴尺寸，把元素分进行
- 若设置了no-wrap, 则强制分配进第一行

### 计算主轴 ###

计算主轴方向：

- 找出所有flex元素
- 把主轴方向的剩余尺寸按比例分配给这些元素
- 若剩余空间为负数，所有flex元素为0，等比例压缩剩余元素

### 计算交叉轴 ###

计算交叉轴方向：

- 根据每一行中最大元素尺寸计算行高
- 根据行高flex-align和item-align,确定元素具体的位置

## 渲染 ##

### 绘制单个元素 ###

- 绘制需要依赖一个图形环境
- 我们这里采用了npm包images [链接](https://www.npmjs.com/package/images)
- 绘制在一个viewport上进行
- 与绘制相关的属性：background-color、border、background-image等

###  绘制DOM树 ###

- 递归调用子元素的绘制方法完成DOM树的绘制
- 忽略一些不需要绘制的节点
- 实际浏览器中，文字绘制是难点，需要依赖字体库，我们这里忽略
- 实际浏览器中，还会对一些图层做compositing,我们这里忽略了