/*布局/排版*/


function getStyle(element) {
    if (!element.style) {
        element.style = {}
    }

    for (let prop in element.computedStyle) {
        var p = element.computedStyle.value;
        element.style[prop] = element.computedStyle[prop].value;

        if (element.style[prop].toString().match(/px$/)) {
            element.style[prop] = parseInt(element.style[prop])
        }

        if (element.style[prop].toString().match(/^[0-9\.] +$/)) {
            element.style[prop] = parseInt(element.style[prop])
        }
    }
    return element.style;
}

function layout(element) {
    ////////预处理,准备工作begin/////
    if (!element.computedStyle) {
        return;
    }

    var elementStyle = getStyle(element);

    if (elementStyle.display !== "flex") {
        return
    }

    var items = element.children.filter(e => e.type === "element");
    
    items.sort((a, b) => {
        return (a.order || 0) - (b.order || 0)
    })

    var style = elementStyle;

    ["width", "height"].forEach(size => {
        if (style[size] === "auto" || style[size] === '') {
            style[size] = null;
        }
    });

    if (!style.flexDirection || style.flexDirection === 'auto') {
        style.flexDirection = 'row'
    }
    if (!style.alignItems || style.alignItems === 'auto') {
        style.alignItems = 'stretch'
    }
    if (!style.justifyContent || style.justifyContent === 'auto') {
        style.justifyContent = 'flex-start'
    }
    if (!style.flexWrap || style.flexWrap === 'auto') {
        style.flexWrap = 'nowrap'
    }
    if (!style.alignContent || style.alignContent === 'auto') {
        style.alignContent = 'stretch'
    }

    var mainSize, mainStart, mainEnd, mainSign, mainBase,
        crossSize, crossStart, crossEnd, crossSign, crossBase;
    if (style.flexDirection === "row") {
        mainSize = "width";//mainSize主轴尺寸
        mainStart = "left";
        mainEnd = "right";
        mainSign = +1;//符号mainSign：+1 or -1
        mainBase = 0;

        crossSize = "height";
        crossStart = 'top';
        crossEnd = "bottom";
    }

    if (style.flexDirection === "row-reverse") {
        mainSize = "width";
        mainStart = "right";
        mainEnd = "right";
        mainSign = -1;
        mainBase = style.width;

        crossSize = "height";
        crossStart = 'top';
        crossEnd = "bottom";
    }

    if (style.flexDirection === "column") {
        mainSize = "height";
        mainStart = "top";
        mainEnd = "bottom";
        mainSign = +1;
        mainBase = 0;

        crossSize = "width";
        crossStart = 'left';
        crossEnd = "right";
    }
    if (style.flexDirection === "column-reverse") {
        mainSize = "height";
        mainStart = "top";
        mainEnd = "bottom";
        mainSign = -1;
        mainBase = style.height;

        crossSize = "width";
        crossStart = 'left';
        crossEnd = "right";
    }

    if (style.flexWrap === "wrap-reverse") {
        var tmp = crossStart;
        crossStart = crossEnd;
        crossEnd = tmp;
        crossSign = -1;
    } else {
        crossBase = 0;
        crossSign = 1;
    }
    //////准备工作end///////////////

    //父元素没有设置主轴尺寸，由子元素将其撑开的情况，这种情况，无论如何子元素都能排进同一行中去
    var isAutoMainSize = false;
    if (!style[mainSize]) {
        elementStyle[mainSize] = 0;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (itemStyle[mainSize] !== null || itemStyle[mainSize]) {
                elementStyle[mainSize] = elementStyle[mainSize]
            }
        }
        isAutoMainSize = true
    }

    /////////分行begin///////////////
    let flexLine = [];
    let flexLines = [flexLine];

    let mainSpace = elementStyle[mainSize];//剩余空间
    let crossSpace = 0;
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let itemStyle = getStyle(item);
        if (itemStyle[mainSize] === null) {
            itemStyle[mainSize] = 0;
        }

        //注：这里是指flex属性，可升缩
        if (itemStyle.flex) {
            flexLine.push(item);
        } else if (style.flexWrap === "nowrap" && isAutoMainSize) {
            mainSpace -= itemStyle[mainSize];
            if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);//行高，取子元素高度的最大值
            }
            flexLine.push(item);
        } else {
            //换行
            if (itemStyle[mainSize] > style[mainSize]) {
                itemStyle[mainSize] = style[mainSize]
            }

            if (mainSpace < itemStyle[mainSize]) {
                flexLine.mainSpace = mainSpace;//保存主轴剩余空间
                flexLine.crossSpace = crossSpace;//交叉轴剩余空间
                flexLine = [item];//创建新行
                flexLines.push(flexLine);
                mainSpace = style[mainSize];
                crossSpace = 0;
            } else {
                flexLine.push(item);
            }
            if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
            }
            mainSpace -= itemStyle[mainSize];
        }
    }
    flexLine.mainSpace = mainSpace; 
    //console.log(items);
    /////////分行end///////////////


    ///////计算主轴的尺寸begin///////////////
    if (style.flexWrap === "nowrap" || isAutoMainSize) {
        flexLine.crossSpace = (style[crossSize] !== undefined) ? style[crossSize] : crossSpace;
    } else {
        flexLine.crossSpace = crossSpace;
    }

    //mainSpace < 0只会发生在单行的情况
    if (mainSpace < 0) {
        //此时会进行等比压缩
        var scale = style[mainSize] / (style[mainSize] - mainSpace);
        var currentMain = mainBase;
        for (var i = 0; i < items.length; i++) {
            var item = [i];
            var itemStyle = getStyle(item);

            if (itemStyle.flex) {
                itemStyle[mainSize] = 0;
            }

            itemStyle[mainSize] = itemStyle[mainSize] * scale;

            itemStyle[mainStart] = currentMain;
            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
            currentMain = itemStyle[mainEnd];
        }
    } else {
        //对每一个flex做处理
        flexLines.forEach(function(items) {

            var mainSpace = items.mainSpace;
            var flexTotal = 0;
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var itemStyle = getStyle(item);

                if ((itemStyle.flex !== null) && itemStyle[crossSize] !== (void 0)) {
                    flexTotal += itemStyle.flex;
                    continue;
                }
            }

            if (flexTotal > 0) {
                //有flex 元素，需要均匀分给每一个flex元素
                var currentMain = mainBase;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var itemStyle = getStyle(item);
                    if (itemStyle.flex) {
                        itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
                    }

                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                    currentMain = itemStyle[mainEnd];
                }
            } else {
                //没有flex元素，需要用justifycontent
                if (style.justifyContent === 'flex-start') {
                    var currentMain = mainBase;
                    var step = 0;
                }
                if (style.justifyContent === 'flex-end') {
                    var currentMain = mainBase / 2 * mainSign + mainBase;
                    var step = 0;
                }
                if (style.justifyContent === 'space-between') {
                    var step = mainSpace / (items.length - 1) * mainSign;
                    var currentMain = mainBase;
                }
                if (style.justifyContent === 'space-around') {
                    var step = mainSpace / items.length * mainSign;
                    var currentMain = step / 2 + mainBase;
                }

                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    itemStyle[mainStart, currentMain];
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                    currentMain = itemStyle[mainEnd] + step
                }
            }
        });
    }
    ///////计算主轴的尺寸end///////////////

    ///////计算交叉轴的尺寸begin//////////////
    var crossSpace;

    if (!style[crossSize]) {
        crossSpace = 0;
        elementStyle[crossSize] = 0;
        for (let i = 0; i < flexLines.length; i++) {
            elementStyle[crossSize] = elementStyle[crossSize] + flexLines[i].crossSpace;
        }
    } else {
        crossSpace = style[crossSize];
        for (let i = 0; i < flexLines.length; i++) {
            crossSpace -= flexLines[i].crossSpace
        }
    }

    if (style.flexWrap === "wrap-reverse") {
        crossBase = style[crossSize];
    } else {
        crossBase = 0;
    }

    var lineSize = style[crossSize] / flexLines.length;

    var step;
    if (style.alignContent === "flex-start") {
        crossBase += 0;
        step = 0;
    }
    if (style.alignContent === "flex-end") {
        crossBase += crossSign * crossSpace;
        step = 0;
    }
    if (style.alignContent === "center") {
        crossBase += crossSign * crossSpace / 2;
        step = 0;
    }
    if (style.alignContent === "space-between") {
        crossBase += 0;
        step = crossSpace / (flexLines.length - 1);
    }
    if (style.alignContent === "space-around") {
        step = crossSpace / (flexLines.length);
        crossBase += crossSign * step / 2;
    }
    if (style.alignContent === "stretch") {
        crossBase += 0;
        step = 0;
    }
    flexLines.forEach(function(items) {
        var lineCrossSize = style.alignContent === 'stretch' ?
            items.crossSpace + crossSpace / flexLines.length :
            items.crossSpace;
        for (let i = 0; i < items.length; i++) {
            var item = items[i];
            var itemStyle = getStyle(item);
            var align = itemStyle.alignSelf || style.alignItems;

            if (item === null) {
                itemStyle[crossSize] = (align === 'stretch') ?
                    lineCrossSize : 0
            }

            if (align === "flex-start") {
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }

            if (align === 'flex-end') {
                itemStyle[crossEnd] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2;
                itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize]
            }
            if (align === 'center') {
                itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }
            if (align === 'stretch') {
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) ? itemStyle[crossSize] : lineCrossSize);
                itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart])

            }

        }
        crossBase += crossSign * (lineCrossSize + step);
    });
    console.log(items);
    ///////计算交叉轴的尺寸end//////////////
}

module.exports = layout;