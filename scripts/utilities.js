//For Each function
var cycleEach = function(item,call){
	for(i=0; i < item.length; i++) {
		call(item[i]);
	};
};