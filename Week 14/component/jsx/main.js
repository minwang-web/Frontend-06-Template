/*移到framwork.js中
function createElement(type,atttributes,...children){
    let element;
    if(typeof type === "string"){
        //string表示是原生的元素
        //element = document.createElement(type);
        element = new ElementWrapper(type);
    }else{
        element = new type;//不是原生元素，转成实例
    }
        

    for(let name in atttributes){
        element.setAttribute(name,atttributes[name]);
    }
    for(let child of children){
        //对child的类型进行判断
        if(typeof child === "string"){
            //child = document.createTextNode(child);//将其换成textnode
            child = new TextWrapper(child);//将其换成textnode
        }
        element.appendChild(child);
    }
    return element;
}

//把普通的div也转成有mountTo的形式
class ElementWrapper{
    constructor(type){
        this.root = document.createElement(type);
    }
    setAttribute(name, value){
        this.root.setAttribute(name, value);
    }
    appendChild(child){
        //this.root.appendChild(child);
        child.mountTo(this.root);
    }
    mountTo(parent){
        parent.appendChild(this.root);
    }
}

class TextWrapper{
    constructor(content){
        this.root = document.createTextNode(content);
    }
    setAttribute(name, value){
        this.root.setAttribute(name, value);
    }
    appendChild(child){
        //this.root.appendChild(child);
        child.mountTo(this.root);
    }
    mountTo(parent){
        parent.appendChild(this.root);
    }
}
*/

//引入Component, createElement
import {Component, createElement} from "./framework.js"

//标签是大写的时候
class Carousel extends Component{
    constructor(){
        super();
        this.attrbutes = Object.create(null);
    }
    setAttribute(name, value){
        this.attrbutes[name] = value;
    }    
    render(){
        //console.log(this.attrbutes.src);//检查有没有取到图片
        this.root = document.createElement("div");
        this.root.classList.add("carousel");//增加class
        
        for(let record of this.attrbutes.src){
            //let child = document.createElement("img");
            //child.src = record;
            //将img换成div
            let child = document.createElement("div");
            child.style.backgroundImage = `url('${record}')`;
            //child.style.display = "none";
            this.root.appendChild(child);
        }

        let position = 0;
        //鼠标控制播放--拖拽
        //监听鼠标的mousedow、mousemove、mouseup事件
        this.root.addEventListener("mousedown", event =>{
            console.log("mousedown");
            //起始点
            let startX = event.clientX;
            //let startY = event.clientY;

            let children = this.root.children;

            let move = event => {
                console.log("mousemove");
                let x = event.clientX - startX;
                //let y = event.clientY -startY;
                /*for(let child of children){
                    child.style.transition = "none";//关闭transition
                    child.style.transform = `translateX(${-position * 500 + x}px)`;
                }*/
                let current = position - ((x - x % 500)/500);
                for(let offset of [-1,0,1]){
                    let pos = current + offset;
                    pos = (pos + children.length)%children.length;
                    children[pos].style.transition = "none";
                    children[pos].style.transform = `translateX(${-pos * 500 + offset * 500 + x % 500}px)`;

                }           
            }
            let up = event =>{
                console.log("mouseup");
                let x = event.clientX - startX;
                position = position - Math.round(x/500);//让x为离500较近的值
                for(let offset of [0,Math.sign(Math.round(x/500) - x + 250 * Math.sign(x))]){
                    let pos = position + offset;
                    pos = (pos + children.length)%children.length;
                    children[pos].style.transition = "";
                    children[pos].style.transform = `translateX(${-pos * 500 + offset * 500}px)`;

                }  
                document.removeEventListener("mousemove",move);
                document.removeEventListener("mouseup",up);
            }
            //document监听有一个好处，即使是已处理浏览器范围外，也能监听到这个事件触发他们
            document.addEventListener("mousemove",move);
            document.addEventListener("mouseup",up);
        })

        

        /*自动播放//let current = 0;
        let currentIndex = 0;//轮播记数
        setInterval(()=>{
            let children = this.root.children;
            let nextIndex = (currentIndex + 1) % children.length;//下一张
            //++current;
            //current = current % children.length;//播到最后一张反向回到第一张

            let current = children[currentIndex];
            let next = children[nextIndex];

            next.style.transition = "none";//不希望next的移动有动画
            next.style.transform = `translateX(${100 - nextIndex * 100 }%)`;
            //for(let child of children) {
              //  child.style.transform = `translateX(-${current * 100}%)`;
            //}

            setTimeout(()=>{
                next.style.transition = "";
                current.style.transform = `translateX(${-100 - currentIndex * 100 }%)`;
                next.style.transform = `translateX(${ - nextIndex * 100 }%)`;
                currentIndex = nextIndex;
            },16);//16毫秒刚好是浏览器中一帧的时间         

        },3000)*/        

        return this.root;
    }
    mountTo(parent){
        parent.appendChild(this.render());
    }

}

/*基础练习
let a = <div id="a">
    <span>a</span>
    <span>b</span>
    <span>c</span>
    Hellow world!
    </div>



    //document.body.appendChild(a);

    a.mountTo(document.body);
*/

//轮播图
let d = [
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
]

let a = <Carousel src={d}/>
a.mountTo(document.body);