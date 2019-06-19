(function($) {
	window.onload = function () {
		var Random = Mock.Random;//随机生成数据工具 
		var data = [];//存放虚拟数据
		for(var i=0;i<100000;i++){//10w条数据(つД`)
			var template = {
				name:Random.name()
			}
			data.push(template);
		}
		//生成数据
		Mock.mock('http://api.cn', 'get',data);
		//异步请求
		$.ajax({
			type:"get",
			url:"http://api.cn",
			dataType:"json",
			scriptCharset: 'GBK',//解决中文乱码
			success:function (res) {
				renderEl(res);
				//选择具体一项时给输入框赋值
				$(".options").on("click","li",function() {
					$(".select-input").val(res[$(".options li").index(this)].name);
					$(".select-input").focus();
				});
			},
			error:function (err) {
				console.log(err);
			}
		});
	}
	//用定时器实现异步渲染
	function renderEl (response) {
		var groups = group(response);
		for (var i=0;i<groups.length;i++) {
	    window.setTimeout(function () {
	      var group = groups[i];
	      var index = i + 1;
	      return function () {
	       //分批渲染
	        loadPart( group, index );
	      }
	    }(), 1);
		}
	}
	//把数据拆分
	function group (data) {
		var result = [];
		var groupItem;
		for (var i = 0; i < data.length; i++) {
	    if (i % 100 == 0) {//每组100条
	      groupItem != null && result.push(groupItem);
	      groupItem = [];
	    }
	    groupItem.push(data[i]);
	  }
	  result.push(groupItem);
	  return result;
	}
	var currIndex = 0;
	function loadPart (group,index) {
		var element = "";
		for (var i = 0; i < group.length; i++) {
		    var item = group[i];
		    element += "<li>"+item.name+"</li>";
		  }
	  while (index - currIndex == 1) {
	    $(".options").append(element);
	    currIndex = index;
	  }
	}
	//分批匹配字符串
	function matchStr(list) {
		var groups = group(list);
		for (var i=0;i<groups.length;i++) {
			window.setTimeout(function () {
				var group = groups[i];
	      return function () {
	        matchPart(group);
	      }
			}(),0)
		}
	}
	function matchPart(group,index) {
		var value = $('.select-input').val();
		$.each(group, function(index,item) {
			var $item = $(item);
			var eleText = $item.text();
			var regExp = new RegExp(value, "g");
	    if(KMP(eleText,value) != -1) {
	      item.style.display = "block";
	      //匹配到时并且输入框值不为空，就替换红色的字
	      if (value != "") {
	      	var newHtml = $item.text().replace(regExp, "<span style='color:#F93549' >"+value+"</span>");
		      $item.html(newHtml)
	      }
	      //文字替换为原来的
	      if (value == "") {
	      	//var newHtml = $item.text().replace(regExp, "<span style='color:white' >"+value+"</span>");
		      $item.html(eleText)
	      }
	    }else {
	    	//没有匹配到时不显示
	      item.style.display = 'none';
	    }
		});
	}
	//输入框值发生改变时
	function changeVal () {
		var value = $('.select-input').val();
		var list = $(".options li");
		matchStr(list);
	}
	//输入框值发生改变的时候执行函数，这里的事件用判断处理浏览器兼容性;
	if(navigator.userAgent.indexOf("compatible") > -1 && navigator.userAgent.indexOf("MSIE") > -1 && !isOpera){
		$(this).bind("propertychange",function(){
			changeVal();
		})
		}else{
		$(this).bind("input",function(){
			changeVal();
		})
	}
})(jQuery)


