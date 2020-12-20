//练习：不用正则表达式，在一个字符串中，找到字符”ab”
function finda(str){
    var finda = false;
	for(let i of str){
		if(i == "a"){
			finda =  true;
        }	
        else if(finda && i == "b"){
            return true;
        }
        else{
            finda = false;
        }	
	}
	return false;	
}

console.log(finda("tractabc"));