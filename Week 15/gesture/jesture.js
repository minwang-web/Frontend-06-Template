//手势
let element = document.documentElement;

let isListeningMouse = false;//避免重复绑定事件

element.addEventListener("mousedown",event=>{
    //console.log(event.button); //值有1，2，3，4，5表示按下鼠标哪个键
    let context = Object.create(null);
    contexts.set("mouse" + (1 << event.button), context);//(1 << event.button)是1，2，4，8，16，对应move中的buttons
    console.log("start", (1 << event.button));
    start(event, context);

    let mousemove = event => {
        //console.log(event.clientX, event.clientY)

        //event.buttons //mousemove有event.buttons用了掩码
        let button = 1;
        while(button <= event.buttons){
            
            if( button & event.buttons){
                //安位与运算

                //鼠标的中键和右键在start和move中刚好是反的，所以需要额外处理
                let key;
                if(button === 2){ 
                    //中键
                    key = 4;
                }  
                if(button === 4){
                    key = 2;
                }  
                else{
                    key = button;
                }      
                let context = contexts.get("mouse" + key);
                console.log("move", (button));
                move(event, context);
            }
            button = button << 1;//这就是循环了掩码的5位
        }
        
    }
    let mouseup = event => {
        console.log("end",event.button);
        let context = contexts.get("mouse" + (1 << event.button));
        end(event, context);
        contexts.delete("mouse" + (1 << event.button));

        if(event.buttons === 0){
            document.removeEventListener("mousemove",mousemove);
            document.removeEventListener("mouseup",mouseup);
            isListeningMouse = false;
        }
        
    }
    if(!isListeningMouse){
        document.addEventListener("mousemove",mousemove);
        document.addEventListener("mouseup",mouseup);
        isListeningMouse = true;
    }
})

let contexts = new Map();

//移动端，触屏事件，touchstart和move一定触发在同一个元素上
//所以touch事件的监听不需要像mouse事件一样mousedown之后才去监听
element.addEventListener("touchstart", event => {
    //console.log(event.changedTouches);
    //start，move，end 需要一个唯一的标识符去追踪它，
    //所有start，move，end会各有一个标识符，会用identifier去表示touch的惟一的ID

    for(let touch of event.changedTouches){
        //console.log("start",touch.clientX, touch.clientY);

        let context = Object.create(null);//创建context
        contexts.set(touch.identifier, context);
        start(touch, context);
    }
})
element.addEventListener("touchmove", event => {
    //console.log(event.changedTouches);
    for(let touch of event.changedTouches){
        //console.log("move",touch.clientX, touch.clientY)
        let context = contexts.get(touch.identifier);
        move(touch, context);
    }

})
element.addEventListener("touchend", event => {
    //console.log(event.changedTouches);
    for(let touch of event.changedTouches){
        //console.log("end",touch.clientX, touch.clientY)
        let context = contexts.get(touch.identifier);
        end(touch, context);
        contexts.delete(touch.identifier);//一定要在执行end事件之后删除
    }
})

//touch 事件比鼠标事件多了touchcancel，
//cancel就是手指touch的点的序列，是以一个异常的模式去结束的
//正常的一个序列就是一个start, 然后一堆move, 然后end
element.addEventListener("touchcancel", event => {
    //console.log(event.changedTouches);
    for(let touch of event.changedTouches){
        //console.log("cancel",touch.clientX, touch.clientY)
        let context = contexts.get(touch.identifier);
        cancel(touch, context);
        contexts.delete(touch.identifier);
    }
})

//这些变量鼠标点击的时候时全局的，但是触屏事件不是，需要存在context中
// let handler;
// let startX, startY;
// let isPan = false, isTap = true, isPress = false;

//这样的一种抽象，就不用去针对具体的鼠标还是touch事件去做处理
//只需要抽象的针对每一个点的start move end cancel去写逻辑就可以了
let start = (point, context) => {
    //console.log("start", point.clientX, point.clientY);
    context.startX = point.clientX, context.startY = point.clientY;
    context.points = [{
        t: Date.now,
        x: point.clientX,
        y: point.clientY
    }]

    context.isTap = true;
    context.isPan = false;
    context.isPress = false;

    context.handler = setTimeout(() => {
        context.isTap = false;
        context.isPan = false;
        context.isPress = true;
        console.log("press");
    },500)
}
let move = (point, context) => {
    let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
    if(!context.isPan && dx ** 2 + dy ** 2 > 100){
        context.isTap = true;
        context.isPan = false;
        context.isPress = false;
        console.log("panstart");
        clearTimeout(context.handler);
    }

    if(context.isPan){
        console.log(dx, dy);
        console.log("pan");
    }
    context.points = context.points.filter(point => Date.now() - point.t < 500);
    context.points.push({
        t: Date.now,
        x: point.clientX,
        y: point.clientY
    })

    //console.log("move", point.clientX, point.clientY);
    
}
let end = (point, context) => {
    if(context.isTap){
        console.log("tap");
        dispatch("tap", {});
        clearTimeout(context.handler);
    }
    if(context.isPan){
        console.log("panend");
    }
    if(context.isPress){
        console.log("pressend");
    }
    context.points = context.points.filter(point => Date.now() - point.t < 500);

    let d,v;
    if(!context.points.length){
        v = 0;
    }else{
        let d = Math.sqrt((point.clientX - context.point[0].x) ** 2 + 
            (point.clientY - context.point[0].y) ** 2);//距离
        let v = d / (Date.now() - context.points[0].t);//速度
    }
    
    if(v > 1.5){
        console.log("flick")
        context.isFlick = true;
    }else{
        context.isFlick = false;
    }
    
}
let cancel = (point, context) => { 
    clearTimeout(context.handler);   
    console.log("cancel", point.clientX, point.clientY);
}

//事件派发
function dispatch(type, properties){
    let event = new Event(type);//创建事件
    for(let name in properties){
        event[name] = properties[name];
    }
    element.dispatchEvent(event);
}