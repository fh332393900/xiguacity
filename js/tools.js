/**
 * 计算返回子串str的next数组
 * */
function getNext(str) {
	var len = str.length,
	next = new Array(len).fill(0); //默认下一跳回到0
	for(var i = 0; i < len; i++) {
		var subStr = str.slice(0, i);
		for(var j = 0; j < i - 1; j++) {
			//判断前缀和后缀的情况，存储当j位不匹配时，下一跳的位置，自动更新保证最大值
			if(subStr.slice(0, j + 1) === subStr.slice(i - j - 1)) {
				next[i] = j + 1;
			}
		}
	}
	return next;
}
/**
 * @param sourceStr 主字符串
 * @param searchStr 模式字符串
 * */
function KMP(sourceStr, searchStr) {
	var sourceLen = sourceStr.length,
	searchLen = searchStr.length,
	next = getNext(searchStr);
	//i为源字符串的指针，j为目标字符串的指针
	var i = 0,
			j = 0;
	while(i < sourceLen && j < searchLen) {
		if(sourceStr[i] === searchStr[j]) {
			++i;
			++j;
		} else {
			//这里用于判断当前指针的位置，如果指针已经在0了，表示模式字符串的第一位都不匹配，主字符串的指针往后移一位
			if(j === 0) {
				++i;
				continue;
			}
			j = next[j];
		}
	}
	if(j === searchLen) {
		return i - j;
	} else {
		return -1;
	}
}