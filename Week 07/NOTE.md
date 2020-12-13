
## JS表达式 ##

### 什么是表达式语句? ###
表达式语句实际就是表达式，是由运算符连接变量或直接量构成的

一般来说，表达式语句通常是函数调用，赋值，自增，自减，否则表达式计算结果没有任何意义

但从语法上来说，任何合法的表达式语句都可以当作表达式语句使用。

### 有哪些表达式? ###

- PrimaryExpression 主要表达式
- MemberExpression 成员表达式
- NewExpression NEW 表达式
- CallExpression 函数调用表达式
- LeftHandSideExpression 左值表达式
- AssignmentExpression 赋值表达式
- Expression 表达式


- 更新表达式 UpdateExpression
- 一元运算表达式 UnaryExpression
- 乘方表达式 ExponentiationExpression
- 乘法表达式 MultiplicativeExpression
- 加法表达式 AdditiveExpression
- 移位表达式 ShiftExpression
- 关系表达式 RelationalExpression
- 相等表达式 EqualityExpression
- 位运算表达式
- 逻辑与表达式和逻辑或表达式
- 条件表达式 ConditionalExpression

### PrimaryExpression 主要表达式 ###
表达式的原子项：Primary Expression。它是表达式的最小单位，它所涉及的语法结构也是优先级最高的。

Primary Expression 包含了各种“直接量”，直接量就是直接用某种语法写出来的具有特定类型的值。我们已经知道，在运行时有各种值，比如数字 123，字符串 Hello world，所以通俗地讲，直接量就是在代码中把它们写出来的语法。

用 null 关键字获取 null 值，这个用法就是 null 直接量;

### MemberExpression 成员表达式 ###
Member Expression 通常是用于访问对象成员的。它有几种形式：

    a.b;
    a["b"];
    new.target;
    super.b;

前面两种用法是用标识符的属性访问和用字符串的属性访问。new.target 是个新加入的语法，用于判断函数是否是被 new 调用。super 则是构造函数中，用于访问父类的属性的语法。

Member Expression 最初设计是为了属性访问的，不过从语法结构需要，以下两种在 JavaScript 标准中当做 Member Expression：

    //反引号
    f`a${b}c`;

这是一个是带函数的模板，这个带函数名的模板表示把模板的各个部分算好后传递给一个函数。

    //带参数列表的new 运算
    new Cls();

注意，不带参数列表的 new 运算优先级更低，不属于 Member Expression。


### NewExpression NEW 表达式 ###

Member Expression 加上 new 就是 New Expression（当然，不加 new 也可以构成 New Expression，JavaScript 中默认独立的高优先级表达式都可以构成低优先级表达式）。

注：这里的 New Expression 特指没有参数列表的表达式。


### CallExpression 函数调用表达式 ###

除了 New Expression，Member Expression 还能构成 Call Expression。它的基本形式是 Member Expression 后加一个括号里的参数列表，或者我们可以用上 super 关键字代替 Member Expression。

### LeftHandSideExpression 左值表达式 ###

New Expression 和 Call Expression 统称 LeftHandSideExpression，左值表达式。

直观地讲，左值表达式就是可以放到等号左边的表达式

左值表达式最经典的用法是用于构成赋值表达式

### AssignmentExpression 赋值表达式 ###

AssignmentExpression 赋值表达式也有多种形态，最基本的当然是使用等号赋值：

    a = b
    a = b = c = d

连续赋值，是右结合的：
    
    a = (b = (c = d))


赋值表达式的使用，还可以结合一些运算符：

    a += b;
    a = a + b;

能有这样用的运算符有下面这几种：
*=、/=、%=、+=、-=、<<=、>>=、>>>=、&=、^=、|=、**=

### Expression 表达式 ###

赋值表达式可以构成 Expression 表达式的一部分。在 JavaScript 中，表达式就是用逗号运算符连接的赋值表达式。

在 JavaScript 中，比赋值运算优先级更低的就是逗号运算符了。我们可以把逗号可以理解为一种小型的分号。

    a = b, b = 1, null;

逗号分隔的表达式会顺次执行，就像不同的表达式语句一样。“整个表达式的结果”就是“最后一个逗号后的表达式结果”。比如我们文中的例子，整个“a = b, b = 1, null;”表达式的结果就是“，”后面的null。


### 更新表达式 UpdateExpression ###

左值表达式搭配 ++ -- 运算符，可以形成更新表达式。

    -- a;
    ++ a;
    a --；
    a ++；

### 一元运算表达式 UnaryExpression ###

更新表达式搭配一元运算符，可以形成一元运算表达式：

    delete a.b;
    void a;
    typeof a;
    - a;
    ~ a;
    ! a;
    await a;

### 乘方表达式 ExponentiationExpression ###

** 运算是右结合的，这跟其它正常的运算符（也就是左结合运算符）都不一样。
    
    4 ** 3 ** 2
    //等价于
    4 ** (3 ** 2)

### 乘法表达式 MultiplicativeExpression ###

乘方表达式可以构成乘法表达式，用乘号或者除号、取余符号连接就可以了

### 加法表达式 AdditiveExpression ###

加法表达式是由乘法表达式用加号或者减号连接构成的。

### 移位表达式 ShiftExpression ###

移位表达式由加法表达式构成，移位是一种位运算，分成三种：

    << 向左移位
    >> 向右移位
    >>> 无符号向右移位、
    
移位运算把操作数看做二进制表示的整数，然后移动特定位数。所以左移 n 位相当于乘以 2 的 n 次方，右移 n 位相当于除以 2 取整 n 次。

普通移位会保持正负数。无符号移位会把减号视为符号位 1，同时参与移位

### 关系表达式 RelationalExpression ###

移位表达式可以构成关系表达式，这里的关系表达式就是大于、小于、大于等于、小于等于等运算符号连接，统称为关系运算。

注： <= 并不等价于 < 或 ==

### 相等表达式 EqualityExpression ###

在语法上，相等表达式是由关系表达式用相等比较运算符（如 ==）连接构成的

相等表达式由四种运算符和关系表达式构成：
    ==
    !=
    ===
    !==

### 位运算表达式 ###

位运算表达式含有三种：

- 按位与表达式 BitwiseANDExpression

- 按位异或表达式 BitwiseANDExpression

- 按位或表达式 BitwiseORExpression

按位与表达式由按位与运算符（&）连接按位异或表达式构成，按位与表达式把操作数视为二进制整数，然后把两个操作数按位做与运算。

按位异或表达式由按位异或运算符（^）连接按位与表达式构成，按位异或表达式把操作数视为二进制整数，然后把两个操作数按位做异或运算。异或两位相同时得 0，两位不同时得 1。

异或运算有个特征，那就是两次异或运算相当于取消。所以有一个异或运算的小技巧，就是用异或运算来交换两个整数的值。

    let a = 102, b = 324;
    a = a ^ b;
    b = a ^ b;
    a = a ^ b;
    console.log(a, b);

按位或表达式由按位或运算符（|）连接相等表达式构成，按位或表达式把操作数视为二进制整数，然后把两个操作数按位做或运算。

### 逻辑与表达式和逻辑或表达式 ###

逻辑与表达式由按位或表达式经过逻辑与运算符连接构成，逻辑或表达式则由逻辑与表达式经逻辑或运算符连接构成。

这里需要注意的是，这两种表达式都不会做类型转换，所以尽管是逻辑运算，但是最终的结果可能是其它类型。

### 条件表达式 ConditionalExpression ###

条件表达式由逻辑或表达式和条件运算符构成，条件运算符又称三目运算符，它有三个部分，由两个运算符?和:配合使用。

### 练习1：完成 StringToNumber 和 NumberToString 两个函数 ###

    function NumberToString(num, base){
    if(num === 0) return '0';
    if(base === 10) return String(num);
    let prefix = {
    2:"0b",
    8:"0o",
    16:"0x",
    }[base];
    
    let str = num.toString(base);
    return prefix + str;
    }
    
    function StringToNumber(str){
    //十六进制
    if(str.startsWith("0x") || str.startsWith("0X")){
    return parseInt(str.substring(2), 16);
    }
    if(str.startsWith("0o")){
    return parseInt(str.substring(2), 8);
    }
    if(str.startsWith("0b")){
    return parseInt(str.substring(2), 2);
    }
    return parseInt(str, 10);
    }
    
    console.log(NumberToString(1457,8));
    console.log(StringToNumber('1457'));

### JS语句 ###

### 自增自减 ###

自增：

a++: 表示的是a=a+1 先赋值后运算

++a: 表示的是a=a+1 先运算后赋值


自减

a-- : 表示先赋值后运算

--a : 表示先运算后赋值

### 选择结构 ###

1、顺序结构：是JavaScript中最基本的结构，说白了就是按照从上到 下、从左到右的顺序执行

2、选择结构 ：按照给定的逻辑条件来决定执行的顺序，有单向选择、 双向选择和多向选择之分，但是程序在执行过程中都只是执行其中的一条分支。有以下几种方法

（1）if语句;

（2）if……else语句;

（3）if……else if……语句;

（4）if语句的嵌套;

（5）switch语句;

3、循环结构：即根据代码的逻辑条件来判断是否重复执行某一段程序。若逻辑 条件为true，则进入循环重复执行；若逻辑条件为false，则退出循环。三种方法：

（1）while语句；

（2）do……while语句；

（3）for语句

## JS 结构化 Structure ##

参考链接：https://www.cnblogs.com/ssaylo/p/13099263.html

### 事件循环&宏任务&微任务 ###

- 事件循环是什么？

事件循环是浏览器执行任务的机制，它会不断循环判断消息队列中是否有任务，队列中的任务都是指宏任务，而宏任务中包含微任务队列，在宏任务结束前后执行微任务队列，直到微任务队列中为空才结束这个宏任务。

- 宏任务是什么？

 渲染事件（如解析 DOM、计算布局、绘制）；

 用户交互事件（如鼠标点击、滚动页面、放大缩小等）；

 JavaScript 脚本执行事件；网络请求完成、文件读写完成事件。 为了协调这些任务有条不紊地在主线程上执行，页面进程引入了消息队列和事件循环机制，渲染进程内部会维护多个消息队列，比如延迟执行队列和普通的消息队列。然后主线程采用一个 for 循环，不断地从这些任务队列中取出任务并执行任务。我们把这些消息队列中的任务称为宏任务。

- 微任务是什么？

微任务就是一个需要异步执行的函数，执行时机是在主函数执行结束之后、当前宏任务结束之前。

微任务和宏任务是绑定的，每个宏任务在执行时，会创建自己的微任务队列。

微任务的执行时长会影响到当前宏任务的时长。比如一个宏任务在执行过程中，产生了 100 个微任务，执行每个微任务的时间是 10 毫秒，那么执行这 100 个微任务的时间就是 1000 毫秒，也可以说这 100 个微任务让宏任务的执行时间延长了 1000 毫秒。所以你在写代码的时候一定要注意控制微任务的执行时长。

在一个宏任务中，分别创建一个用于回调的宏任务和微任务，无论什么情况下，微任务都早于宏任务执行。

*其实所有的JS代码都是一个微任务，只是哪些微任务构成了一个宏任务；执行在JS引擎里的就是微任务，执行在JS引擎之外的就是宏任务，循环宏任务的工作就是事件循环。*

*事件循环不属于JavaScript引擎实现的东西，而是由浏览器或node js宿主环境实现的*

*script标签、UI交互、setTimeout、setInterval都会创建宏任务*

*一个宏任务只存在一个微任务队列，微任务根据入队时间顺序执*

*Promise的then方法以及async函数里的await会将一个微任务入队*


### 作业：尝试找出 JavaScript 引擎里面 Realm 所有的对象，使用一个 JS 数据可视化的框架去做一个可视化 ###
    
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>紧凑树</title>
    <style>::-webkit-scrollbar{display:none;}html,body{overflow:hidden;margin:0;}</style>
    </head>
    <body>
    <div id="mountNode"></div>
    <script>/*Fixing iframe window.innerHeight 0 issue in Safari*/document.body.clientHeight;</script>
    <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.1.1/build/g6.js"></script>
    <script src="https://gw.alipayobjects.com/os/antv/assets/lib/jquery-3.2.1.min.js"></script>
    <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.hierarchy-0.5.0/build/hierarchy.js"></script>
    <script>
      $.getJSON('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json', function(data) {
    var graph = new G6.TreeGraph({
      container: 'mountNode',
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: 2,
      modes: {
    default: [{
      type: 'collapse-expand',
      onChange: function onChange(item, collapsed) {
    var data = item.get('model').data;
    data.collapsed = collapsed;
    return true;
      }
      }, 'drag-canvas', 'zoom-canvas']
      },
      defaultNode: {
    size: 16,
    anchorPoints: [[0, 0.5], [1, 0.5]],
    style: {
      fill: '#40a9ff',
      stroke: '#096dd9'
    }
      },
      defaultEdge: {
    shape: 'cubic-horizontal',
    style: {
      stroke: '#A3B1BF'
    }
      },
      layout: {
    type: 'compactBox',
    direction: 'LR',
    getId: function getId(d) {
      return d.id;
    },
    getHeight: function getHeight() {
      return 16;
    },
    getWidth: function getWidth() {
      return 16;
    },
    getVGap: function getVGap() {
      return 10;
    },
    getHGap: function getHGap() {
      return 100;
    }
      }
    });
    
    graph.node(function(node) {
      return {
    size: 26,
    style: {
      fill: '#40a9ff',
      stroke: '#096dd9'
    },
    label: node.id,
    labelCfg: {
      position: node.children && node.children.length > 0 ? 'left' : 'right'
    }
      };
    });
    
    graph.data(data);
    graph.render();
    graph.fitView();
      });
    </script>
    </body>
    </html>
