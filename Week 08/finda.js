//练习：在一个字符串中，找到字符”a”
function finda(str){
	for(let i of str){
		if(i == "a"){
			return true;
		}		
	}
	return false;	
}

console.log(finda("tract"));