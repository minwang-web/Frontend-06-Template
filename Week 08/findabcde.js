//不准使用正则表达式，纯粹用 JavaScript 的逻辑实现：在一个字符串中，找到字符“abcdef”
function finda(str){
    var finda = false;
    var findb = false;
    var findc = false;
    var findd = false;
    var finde = false;
    var findf = false;
	for(let i of str){
		if(i == "a"){
			finda =  true;
        }	
        else if(finda && i == "b"){
            findb = true;
        }        	
        else if(findb && i == "c"){
			findc =  true;
        }
        else if(findc && i == "d"){
			findd =  true;
        }
        else if(findd && i == "e"){
			finde =  true;
        }
        else if(finde && i == "f"){
			return true;
        }
        else{
            finda = false;
            findb = false;
            findc = false;
            findd = false;
            finde = false;
        }	
	}
	return false;	
}

console.log(finda("tractabcdef"));