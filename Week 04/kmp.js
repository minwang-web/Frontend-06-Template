/////判断source中是否有pattern////
function kmp(source, pattern){
	//计算table
	let table = new Array(pattern.length).fill(0);//table默认填0
    //i,j作为局部变量，准备好table表格
	{
		//查字符串有没有自重复,j表示重复数
		let i = 1,j = 0;
		while(i < pattern.length){
			if(pattern[i] === pattern[j]){
				++j, ++i;
				table[i] = j;
			}
			else{
				if(j > 0)
					j = table[j];
				else{
					++i;
				}
			}
		}
	}
    //开始匹配
	{
		let i = 0,j = 0;
		while(i < source.length){
			if(pattern[j] === source[i]){
				++i,++j;			
			}else{
				if(j > 0)
					j = table[j];
				else{
					++i;
				}
			}		
			
			if(j === pattern.length)
			   return true;
		}	
		return false;		
	}
}

console.log(kmp("mississippi","issip"));