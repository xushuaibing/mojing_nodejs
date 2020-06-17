function show() {
        var d = new Date();
        //获取年份
        //var nian=d.getYear();//2016  //16
        var nian = d.getFullYear();//2016
        //获取月
        var yue = d.getMonth() + 1;//6   july 7月   0-11
        //获取星期几
        // var xq=d.getDay();//5    0-6    0:星期天
        // var xqs="**";
        // switch (xq) {
        // 	case 0:
        // 		xqs="天";
        // 		break;
        // 	case 1:
        // 		xqs="一";
        // 		break;
        // 	case 2:
        // 		xqs="二";
        // 		break;
        // 	case 3:
        // 		xqs="三";
        // 		break;
        // 	case 4:
        // 		xqs="四";
        // 		break;
        // 	case 5:
        // 		xqs="五";
        // 		break;
        // 	case 6:
        // 		xqs="六";
        // 		break;
        //
        // }
        //获取几号
        var dd = d.getDate();//1    1-31
        //获取小时
        var h = d.getHours();// 16下午4点     24小时制
        //获取分钟
        var m = d.getMinutes();//31分
        if (m <= 9) {
            m = "0" + m;
        }
        if (dd <= 9) {
            dd = "0" + dd;
        }
        if(h<=9){
            h = "0" + h;
        }
        //获取描述
        var s = d.getSeconds();//50秒
        if (s <= 9) {
            s = "0" + s;
        }

        document.getElementById("time").innerHTML = "<span style='font-size: 80px'>" + h + " : " + m + "</span>" +
            "<span style='font-size: 30px' class='blink'> " + s + "</span><br/>" +
            "<span style='font-size: 32px'>" + nian + "年" + yue + "月" + dd + "日</span>";
    }

    setInterval("show()", 1000);

     function getwannianli() {
        var d = new Date();
        //获取年份
        //var nian=d.getYear();//2016  //16
        var nian = d.getFullYear();//2016
        //获取月
        var yue = d.getMonth() + 1;//6   july 7月   0-11
        //获取几号
        var dd = d.getDate();//1    1-31\
        var date = nian + "-" + yue + "-" + dd;
        $.ajax({
            url: "/wannianli",
            data: {date: date},
            success: function (data) {     
                var json = JSON.parse(data);
                var html = "<div class='wandiv'>" +
                    "<span>" + json.result.data.lunarYear + " </span><span class='todayweatherspanval'>" + json.result.data.animalsYear + "</span><br/>" +
                    "<span>" + json.result.data.lunar + "</span><span> " + json.result.data.weekday + "</span>" +
                    "</div>" +
                    "<div class='wandiv1'>" +
                    "<span class='todayweatherspanval'>忌</span><span class='wanspanval'>：" + json.result.data.avoid + "</span><br/>" +
                    "<span class='todayweatherspanval'style='margin-top: 2px'>宜</span><span class='wanspanval'>：" + json.result.data.suit + "</span>" +
                    "</div>";
                $("#nongli").html(html);
            }
        });
    }