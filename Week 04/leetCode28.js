////leetcode 28题//////
// 给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。
//当 needle 是空字符串时我们应当返回 0 。

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    //当 needle 是空字符串时我们应当返回 0
    if(needle.length === 0)
        return 0;
    let table = new Array(needle.length).fill(0);
    {
		//查字符串有没有自重复,j表示重复数
		let i = 1,j = 0;
		while(i < needle.length){
			if(needle[i] === needle[j]){
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
        console.log(table)
	}    
   {
        let i = 0,j=0;
        var maxIndex = 0;
        while(i<haystack.length){
            if(haystack[i] === needle[j]){
                ++i,++j;
                //全匹配到最后一位时,记录匹配到最后一位时的下标
                //注意：由于下标时从0开始的，我们计算第一个位置时需要用终止位置减去匹配字符的长度，所以这里记录加了1的i
                //能匹配到最后一位数已经有正确结果了，直接返回值
                if(j === needle.length){
                    maxIndex = i;
                    return maxIndex - needle.length;
                }
            }
            else{
                //这里用到自匹配模块的table,非常重要
                //如果有重复时，没有全匹配到needle字符串时，
                //不用从needle的第一个字符开始匹配;
                if(j > 0){
                    j = table[j];
                }
                else{
                    ++i;
                }
            }
        }
        return -1; 
    } 
};

console.log(strStr("mississississippi","ississip"));