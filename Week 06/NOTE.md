
# 本周总结和练习 #
## JS语言通识 ##
### 参考链接 ###
https://www.cnblogs.com/yanit1729/p/13267702.html
https://www.cnblogs.com/huilixieqi/p/13749310.html
https://www.yuque.com/wendraw/fe/general-knowledge-programming-lang#UsuzZ
### 语言分类 ###

#### 1、非形式语言 ####

没有特定的规则，会有各种的演化方式。如，中文、英文、阿拉伯文。

#### 2、形式语言 ####

在数学，计算机科学和语言学中，形式语言是用精确的数学或机器可处理的公式定义的语言。

形式语言是由单词组成的，这些单词的字母取自字母表（就是人为定义的的一个字符集合），并根据一组特定的规则来组织。

与自然语言一样，形式语言一般也分为两个方面：「语法」和「语义」。其中语法又叫做「文法」或者「形式文法」。

文法是形式语言中字符串的一套产生式规则，这些规则描述了如何用语言的字母表生产复合语法的有效字符串。


### 乔姆斯基谱系 ###

乔姆斯基谱系是计算机科学中刻画「形式文法」表达能力的一个分类谱系，是由诺姆·乔姆斯基于 1965 年提出的。它包括四个层次：

- 0 型：无限制文法

不是真正的无限制，还是有严格的定义，包括所有的文法。表现形式：? ::= ?

意思就是等号左右两边是没有限制的，可以写任何东西，有任意多个，如：
```
<a><b> ::= "c"<d><e>
```

- 1 型：上下文相关文法

就是一个词放在不同的上下文会有不同的语义。表现形式：```?<A>? ::= ?<B>?```

虽然产生式两边可以有多个，但是只有可以非终结符可以变化。如：```"a"<b>"c" ::= "a""x""c"```，就是在 "a""c" 之间 "x" 会被解析为``` <b>```。

- 2 型：上下文无关文法

就是放在不同的上下文表达的是同一个意思。表现形式：```<A> ::= ?```

等号左边只能有一个非终结符，就可以理解为``` <A>``` 不管放在哪里都是表示右边这些字符。

-  3 型：正则文法

简单概括，就是能用正则表达式解析的文法。表现形式：```<A> ::= <A>?```

*注意：这种类型在正则文法``` <A>::=?<A>``` 是非法表达式*

意思就是正则文法只允许左递归，我们通常的递归符号「+*」之类的都只能跟在字符的后边。表示对前面的字符重复的次数。

现代编程语言都会将所有「文法」分成「词法」和「语法」，解析器在解释时先用正则表达式进行一遍粗略的处理，将语言变成单个的词，最后将这个词去进行语法分析。

其实大部分编程语言都是 2 型的文法，主要是就是看语法里有没有让其降为 0 型、1 型的情况。

### 产生式（Production) ###

#### 知识点 ####
在介绍具体的文法前需要先学习一下「产生式」，产生式是一种描述上下文无关文法的表示方法。通俗点理解，就是定义语言中可以使用的文法。

用的最多的产生式是巴科斯范式(Backus–Naur form)（BNF）。不过在具体应用时都会有自己的修改，比如 ECMA 标准有很多自创的规则。


BNF 的主要有以下规则： 

-  用尖括号括起来的名称来表示语法结构名
-  语法结构分成「基础结构」和需要用其他语法结构定义的「复合结构」。
-  基础结构称为「终结符」
-  复合结构称为「非终结符」
-  引号和中间的字符表示终结符（是一个基本符号，不能被分为更小的单位，比如，在 JS 中 '0', 'a' 等字符就是终结符）
-  可以有括号
-  * 表示重复多次
-  ｜表示或
-  + 表示至少一次

产生式的形式描述及语义–巴斯克范式BNF:

- 符号::=表示“定义为”
- 符号|表示“或者是”
- 符号[]表示可缺省
- <产生式>::= <前提><结论>
- <前提>::=<简单条件>|<复合条件>
- <结论>::=<事实>|<操作>
- <复合条件>::=<简单条件>AND<简单条件>[AND<简单条件>...|<简单条件>OR<简单条件>]
- <操作>::=<操作名>[(<变元>,...)]

四则远算是：1 + 2 * 3

```
<MultiplicativeExpression>::<Number>|<MultiplicativeExpression> "*" <Number>|<MultiplicativeExpression> "/" <Number>
```
```
<AddtiveExpression>::=<MultiplicativeExpression> |<AddtiveExpression> "+" <MultiplicativeExpression> |<AddtiveExpression> "-" <MultiplicativeExpression> |
```

#### 产生式的应用 ####
用 BNF 定义的一个支持十进制数的语言，并且支持括号、四则运算和逻辑运算。

第一个产生式是单个的数字，只能是 0 ～ 9。
```
<Number> ::= "0" | "1" | "2" | ... | "9"
```

第二个产生式是十进制数字，不能以 0 开头。
```
<DecimalNumber> ::= "0" | (("1" | "2" | ... | "9") <Number>*)
```

第三个产生式是最基本的表达式，不带括号时只能是一个数字，带括号时中间可以放一个逻辑运算。
```
<PrimaryExpression> ::= <DecimalNumber> |
    "(" <LogicalExpression> ")"
```

第四个产生式是乘法表达式，第一行是说乘法表达式中的基本单元是 PrimaryExpression，这就意味着 () 的优先级比乘除高。 和 / 的表达式都叫做乘法表达式，并且是左结合的（也就是说有连  / 的时候从左边开始两两组合先计算）。
```
<MultiplicationExpression> ::= <PrimaryExpression> | 
    <MultiplicationExpression> "*" <PrimaryExpression> | 
    <MultiplicationExpression> "/" <PrimaryExpression>
```

第五个产生式是加法表达式，第一行是说最基本单元是乘法表达式，这就意味着乘除的优先级比加减高。然后 + - 的表达式都叫做加法表达式，并且是左结合的。
```
<AdditionExpression> ::= <MultiplicationExpression> | 
    <AdditionExpression> "+" <MultiplicationExpression> | 
    <AdditionExpression> "-" <MultiplicationExpression>
```

第六个产生式是逻辑运算表达式，第一行是说最基本单元是加法表达式，也就是加减的优先级比 || && 高。然后有 || && 的表达式都叫做逻辑运算表达式，并且是左结合的。
```
<LogicalExpression> ::= <AdditionExpression> | 
    <LogicalExpression> "||" <AdditionExpression> |
    <LogicalExpression> "&&" <AdditionExpression>
```

#### 练习1：编写带括号的四则运算产生式 ####
```
<PrimaryExpression> ::=<Number>| "(" <AdditiveExpression> ")"|
```
```
<AddtiveExpression>::=<MultiplicativeExpression> |<AddtiveExpression> "+" <MultiplicativeExpression> |<AddtiveExpression> "-" <MultiplicativeExpression> |
```
```
<MultiplicativeExpression>::=<Number> |<MultiplicativeExpression> "*" <Number> |<MultiplicativeExpression> "/" <Number> |
```

#### 练习2：尽可能寻找你知道的计算机语言，尝试把它们分类 ####
形式语言-用途 

- 数据描述语言: JSON 、HTML、XAML、SQL、CSS 
- 编程语言： C++、C、Java、C#、Python、Ruby、Perl、Lisp、T-SQL、Clojure、Haskel、JavaScript       

形式语言-表达方式
 
- 声明式语言: JSON 、HTML、XAML、SQL、CSS 、Lisp、Clojure、Haskel
- 命令型语言： C++、C、Java、C#、Python、Ruby、Perl、T-SQL、JavaScript

## JS类型 ##
- Undefined
- Null
- Boolean
- String
- Number
- Symbol
- Object

### 1 基本类型 ###

Number、Boolean、String、NULL、Undefined、以及ES6的Symbol

### 2 引用类型 ###

Object、Array、Function、Date

### 在内存中位置的不同 ###

基本类型：占用空间固定，保存在栈中；

引用类型：占用空间不固定，保存在堆中；

栈（stack）为自动分配的内存空间，它由系统自动释放；使用一级缓存，被调用时通常处于存储空间中，调用后被立即释放。

堆（heap）则是动态分配的内存，大小不定也不会自动释放。使用二级缓存，生命周期与虚拟机的GC算法有关。

当一个方法执行时，每个方法都会建立自己的内存栈，在这个方法内定义的变量将会逐个放入这块栈内存里，随着方法的执行结束，这个方法的内存栈也将自然销毁了。因此，所有在方法中定义的变量都是放在栈内存中的；栈中存储的是基础变量以及一些对象的引用变量，基础变量的值是存储在栈中，而引用变量存储在栈中的是指向堆中的数组或者对象的地址，这就是为何修改引用类型总会影响到其他指向这个地址的引用变量。

当我们在程序中创建一个对象时，这个对象将被保存到运行时数据区中，以便反复利用（因为对象的创建成本通常较大），这个运行时数据区就是堆内存。堆内存中的对象不会随方法的结束而销毁，即使方法结束后，这个对象还可能被另一个引用变量所引用（方法的参数传递时很常见），则这个对象依然不会被销毁，只有当一个对象没有任何引用变量引用它时，系统的垃圾回收机制才会在核实的时候回收它。

### String ###

参考链接：https://www.cnblogs.com/doublenet/p/5616451.html

#### javascript的字符集： ####
javascript程序是使用Unicode字符集编写的。Unicode是ASCII和Latin-1的超集，并支持地球上几乎所有的语言。ECMAScript3要求JavaScript必须支持Unicode2.1及后续版本，ECMAScript5则要求支持Unicode3及后续版本。所以，我们编写出来的javascript程序，都是使用Unicode编码的。

#### UTF-8 ####
UTF-8（UTF8-bit Unicode Transformation Format）是一种针对Unicode的可变长度字符编码，也是一种前缀码。

它可以用来表示Unicode标准中的任何字符，且其编码中的第一个字节仍与ASCII兼容，这使得原来处理ASCII字符的软件无须或只须做少部分修改，即可继续使用。因此，**它逐渐成为电子邮件、网页及其他存储或发送文字的应用中，优先采用的编码。**

目前大部分的网站，都是使用的UTF-8编码。

#### 将javascript生成的Unicode编码字符串转为UTF-8编码的字符串 ####

如标题所说的应用场景十分常见，例如发送一段二进制到服务器时，服务器规定该二进制内容的编码必须为UTF-8。这种情况下，我们必须就要通过程序将javascript的Unicode字符串转为UTF-8编码的字符串。

#### 转换方法 ####
转换之前我们必须了解Unicode的编码结构是固定的。
不信可以试一试 String 的 charCodeAt 这个方法，看看返回的 charCode 占几个字节。

    英文占1个字符，汉字占2个字符

然而，UTF-8的编码结构长度是**根据某单个字符的大小**来决定长度有多少。
下面为单个字符的大小占用几个字节。单个unicode字符编码之后的最大长度为6个字节。
    
    1个字节：Unicode码为0 - 127
    2个字节：Unicode码为128 - 2047
    3个字节：Unicode码为2048 - 0xFFFF
    4个字节：Unicode码为65536 - 0x1FFFFF
    5个字节：Unicode码为0x200000 - 0x3FFFFFF
    6个字节：Unicode码为0x4000000 - 0x7FFFFFFF

因为英文和英文字符的Unicode码为0 - 127，所以英文在Unicode和UTF-8中的长度和字节都是一致的，只占用1个字节。这也就是为什么UTF8是Unicode的超集！

现在我们再来讨论汉字，因为汉字的unicode码区间为0x2e80 - 0x9fff, 所以汉字在UTF8中的长度最长为3个字节。

### 练习3：写一段 JS 的函数，把一个 string 它代表的字节给它转换出来，用 UTF8 对 string 进行遍码。 ###

**详见strUTF.js文件**

### JS对象 ###

参考链接：https://blog.csdn.net/qq_40917619/article/details/107234827

可以把对象分成两类宿主对象和内置对象。

**宿主对象（host Objects）**：由 JavaScript 宿主环境提供的对象，它们的行为完全由宿主环境决定。

**内置对象（Built-in Objects）**：由 JavaScript 语言提供的对象。

- 固有对象（Intrinsic Objects ）：由标准规定，随着 JavaScript 运行时创建而自动创建的对象实例。
- 原生对象（Native Objects）：可以由用户通过 Array、RegExp 等内置构造器或者特殊语法创建的对象。
- 普通对象（Ordinary Objects）：由{}语法、Object 构造器或者 class 关键字定义类创建的对象，它能够被原型继承。

#### 宿主对象 ####

JavaScript 宿主对象千奇百怪，但是前端最熟悉的无疑是浏览器环境中的宿主了。在浏览器环境中，我们都知道全局对象是 window，window 上又有很多属性，如 document。实际上，这个全局对象 window 上的属性，一部分来自 JavaScript 语言，一部分来自浏览器环境。JavaScript 标准中规定了全局对象属性，W3C 的各种标准中规定了 Window 对象的其它属性。宿主对象也分为固有的和用户可创建的两种，比如 document.createElement 就可以创建一些 DOM 对象。宿主也会提供一些构造器，比如我们可以使用 new Image 来创建 img 元素，

#### 内置对象·固有对象 #### 

固有对象是由标准规定，随着 JavaScript 运行时创建而自动创建的对象实例。固有对象在任何 JavaScript 代码执行前就已经被创建出来了，它们通常扮演者类似基础库的角色。我们前面提到的“类”其实就是固有对象的一种。ECMA 标准为我们提供了一份固有对象表，里面含有 150+ 个固有对象。

#### 内置对象·原生对象 ####

我们把 JavaScript 中，能够通过语言本身的构造器创建的对象称作原生对象。在 JavaScript 标准中，提供了 30 多个构造器。按照我的理解，按照不同应用场景，我把原生对象分成了以下几个种类:

- 基本类型：Boolean, String, Number, Symbol, Object
- 基础功能和数据结构：Array, Date, RegExp, Promise, Proxy, Map, WeakMap, Set, WeakSet, Function
- 错误类型：Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError
- 二进制操作：ArrayBuffer, ShareArrayBuffer, DateView
- 带类型的数组：Float32Array, Float64Array, Int8Array, Int16Array, Int32Array, UInt8Array, UInt16Array, UInt32Array, UInt8ClampedArray

通过这些构造器，我们可以用 new 运算创建新的对象，所以我们把这些对象称作原生对象。几乎所有这些构造器的能力都是无法用纯 JavaScript 代码实现的，它们也无法用 class/extend 语法来继承。这些构造器创建的对象多数使用了私有字段, 例如：
Error: [[ErrorData]]

Boolean: [[BooleanData]]

Number: [[NumberData]]

Date: [[DateValue]]

RegExp: [[RegExpMatcher]]

Symbol: [[SymbolData]]

Map: [[MapData]]

这些字段使得原型继承方法无法正常工作，所以，我们可以认为，所有这些原生对象都是为了特定能力或者性能，而设计出来的“特权对象”。

#### 用对象来模拟函数与构造器：函数对象与构造器对象 ####

我在前面介绍了对象的一般分类，在 JavaScript 中，还有一个看待对象的不同视角，这就是用对象来模拟函数和构造器。事实上，JavaScript 为这一类对象预留了私有字段机制，并规定了抽象的函数对象与构造器对象的概念。

函数对象的定义是：具有[[call]]私有字段的对象，构造器对象的定义是：具有私有字段[[construct]]的对象。

JavaScript 用对象模拟函数的设计代替了一般编程语言中的函数，它们可以像其它语言的函数一样被调用、传参。任何宿主只要提供了“具有[[call]]私有字段的对象”，就可以被 JavaScript 函数调用语法支持。

我们可以这样说，任何对象只需要实现[[call]]，它就是一个函数对象，可以去作为函数被调用。而如果它能实现[[construct]]，它就是一个构造器对象，可以作为构造器被调用。

对于为 JavaScript 提供运行环境的程序员来说，只要字段符合，我们在上文中提到的宿主对象和内置对象（如 Symbol 函数）可以模拟函数和构造器。

当然了，用户用 function 关键字创建的函数必定同时是函数和构造器。不过，它们表现出来的行为效果却并不相同。

对于宿主和内置对象来说，它们实现[[call]]（作为函数被调用）和[[construct]]（作为构造器被调用）不总是一致的。

对于用户使用 function 语法或者 Function 构造器创建的对象来说，[[call]]和[[construct]]行为总是相似的，它们执行同一段代码。

###  练习4：用 JavaScript 去设计狗咬人的代码  ###

**详见humanAndDog.js文件**

#### 练习5：找出 JavaScript 标准里面所有具有特殊行为的对象 ####

- Array：Array 的 length 属性根据最大的下标自动发生变化。
- Object.prototype：作为所有正常对象的默认原型，不能再给它设置原型了。
- String：为了支持下标运算，String 的正整数属性访问会去字符串里查找。
- Arguments：arguments 的非负整数型下标属性跟对应的变量联动。
- 模块的 namespace 对象：特殊的地方非常多，跟一般对象完全不一样，尽量只用于 import 吧。
- 类型数组和数组缓冲区：跟内存块相关联，下标运算比较特殊。
- bind 后的 function：跟原来的函数相关联。
- 
- window对象：在全局作用域中声明的变量、函数都是window对象的属性和方法。
- this对象：this对象是在运行时基于函数的执行环境绑定的：在全局函数中，this等于window；当函数被作为某个对象的方法调用时，this等于那个对象。  
**特别注意：匿名函数的执行环境具有全局性，因此匿名函数中的this对象通常指向window对象!!!**

- Global对象：  
1)所有在全局作用域内定义的属性和方法，都是Global对象的属性。  
2)Global对象不能直接使用，也不能用new运算符创建。  
3)Global对象在JavaScript引擎被初始化时创建，并初始化其方法和属性。  
4)浏览器把Global对象作为window对象的一部分实现了，因此，所有的全局属性和函数都是window对象的属性和方法。 