export function createElement(type,atttributes,...children){
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
export class Component{
    constructor(type){
       // this.root = this.render();
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
class ElementWrapper extends Component{
    constructor(type){
        this.root = document.createElement(type);
    }    
}

class TextWrapper extends Component{
    constructor(content){
        this.root = document.createTextNode(content);
    }
} 