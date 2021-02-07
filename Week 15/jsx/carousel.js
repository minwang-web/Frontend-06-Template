
import {Component} from "./framework.js"

export class Carousel extends Component{
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
            //将img换成div
            let child = document.createElement("div");
            child.style.backgroundImage = `url('${record}')`;
            this.root.appendChild(child);
        }

        let position = 0;
        //鼠标控制播放--拖拽
        //监听鼠标的mousedow、mousemove、mouseup事件
        this.root.addEventListener("mousedown", event =>{
            console.log("mousedown");
            //起始点
            let startX = event.clientX;
            let children = this.root.children;

            let move = event => {
                console.log("mousemove");
                let x = event.clientX - startX;
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
        return this.root;
    }
    mountTo(parent){
        parent.appendChild(this.render());
    }

}