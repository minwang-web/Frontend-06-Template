function unique(array){
    let map = new Map();
    let arr = [];

    array.forEach((element) => {
        if(!map.has(element)){
            map.set(element,element);
            arr.push(element);
        }        
    });
    return arr;
}

let array = [1,1,2,12,34,4,2,1,3,4];
console.log(unique(array));