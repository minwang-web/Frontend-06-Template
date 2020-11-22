/*wildcard: ab*c?d*abc*a?d
考虑两种情况:只有*和只有?
*/

function find(source, pattern){
    let startCount = 0;
    //判断有几个“*”
    for(let i = 0; i < pattern.length; i++){
        if(pattern[i] === "*"){
            startCount++
        }
    }
    //处理没有“*”的情况
    if(startCount === 0){
        for(let i = 0;i < pattern.length; i ++){
            //“?”可以匹配任何字符
            if(pattern[i] !== source[i] && pattern[i] !== "?"){
                return false;
            }
        }
    }

    let i = 0;
    let lastIndex = 0;
    //匹配完第一个*"之前的字符
    for(i = 0; pattern[i] !== "*"; i++){
        if(pattern[i] != source[i] && pattern[i] !== "?")
            return false;
    }
    //i已经是第一个"*"对应的下标

    lastIndex = i;

    for(let j = 0; j < startCount - 1; j++){
        i++;//"*"的下一个字符
        let subPattren = "";//"*"后的字符串
        while(pattern[i] !== "*"){
            subPattren += pattern[i];
            i++;
        }

        //"\\s\\S"大小写的s在一起表示整个字符集
        let reg = new RegExp(subPattren.replace(/\?/g, "[\\s\\S]"), "g");
        //正则的lastIndex属性用于规定下次匹配的起始位置。
        reg.lastIndex = lastIndex;
        //exec() 方法用于检索字符串中的正则表达式的匹配
        console.log(reg.exec(source));

        if(!reg.exec(source)){
            return false;
        }

        lastIndex = reg.lastIndex;
    }

    for(let j = 0; j <= source.length - lastIndex && pattern[pattern.length - j] != "*";j++){
        if(pattern[pattern.length - j] !== source[source.length - j] && pattern[pattern.length - j] !== "?" )
        {
            return false;
        }
    }
    return true;
}

console.log(find("acdcb", "a*c?b"));
