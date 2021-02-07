
const TICK = Symbol("tick");
const TICK_HANDLER = Symbol("tick-handler");
const ANIMATIONS = Symbol("animations");
const START_TIME = Symbol("add-time");
const PAUSE_START = Symbol("pause-start");//暂停开始
const PAUSE_TIME = Symbol("pause-time");//暂停时间

export class Timeline{
    constructor(){ 
        this.state = "Inited";      
        this[ANIMATIONS] = new Set();
        this[START_TIME] = new Map();
    }
    start(){
        if( this.state !== "Inited"){
            return;
        }
        this.state = "started";
        let startTime = Date.now();
        this[PAUSE_TIME] = 0;
        this[TICK] = () =>{
           // console.log("tick");
           //let t = Date.now() - startTime;
           let now = Date.now();
           for(let animation of this[ANIMATIONS]){
               let t;
               if(this[START_TIME].get(animation) < startTime){
                   t = now - startTime - this[PAUSE_TIME] - animation.delay ;
               }
               else{
                   t = now - this[START_TIME].get(animation) - this[PAUSE_TIME] - animation.delay;
               }
               
               if(animation.duration < t){
                   this[ANIMATIONS].delete(animation);
                   t = animation.duration;
               }
               if(t > 0){
                   animation.receive(t);
               }
           }
           //暂停
            this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);
        }
        this[TICK]();
    }
    //暂停
    pause(){
        if( this.state !== "started"){
            return;
        }
        this.state = "pause";
        this[PAUSE_START] = Date.now();
        cancelAnimationFrame(this[TICK_HANDLER]);//彻底停下动画
    }
    //播放
    resume(){
        if(this.state !== "pause"){
            return;
        }
        this.state = "started";
        this[PAUSE_TIME] += Date.now() - this[PAUSE_START];
        this[TICK]();
    }
    //重置
    reset(){
        this.pause();
        this.state = "inited";
        let startTime = Date.now();
        this[PAUSE_TIME] = 0;
        
        this[ANIMATIONS] = new Set();
        this[START_TIME] = new Map();

        this[PAUSE_START] = 0;

        this[TICK_HANDLER] = null;

    }
    add(animation,startTime){
        if(arguments.length < 2){
            startTime = Date.now();
        }
        this[ANIMATIONS].add(animation);
        this[START_TIME].set(animation,startTime);
    }
}

export class Animation{
    constructor(object,property,startValue,endValue,duration,delay,timingFunction,template){
        timingFunction = timingFunction || (v => v);
        template = template || (v => v)
        this.object = object;
        this.property = property;
        this.startValue = startValue;
        this.endValue = endValue;
        this.duration = duration;
        this.delay = delay;
        this.timingFunction = timingFunction;//关于0-1的time，返回0-1的progress的函数
        this.template = template;
    }
    receive(time){
        //console.log(time);
        let range = (this.endValue - this.startValue);
        let progress = this.timingFunction(time / this.duration);//进展
        this.object[this.property] = this.template(this.startValue + range * progress);
    }
}