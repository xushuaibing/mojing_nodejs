 function getweather() {
        var city = "郑州";
        var weatherhtml = "";
        $.ajax({
            url: "/weather",
            data: {city: city},
            success: function (data) {
                data = JSON.parse(data);
                weatherhtml += "" +
                    "<div class='row'>" +
                    "<div class='col-sm-12 col-md-12 col-xs-12 col-lg-12'>" +
                    "<img src='/wathericon/" + data.result.data.realtime.weather.img + ".png' alt='' width='64px' >" +
                    "<h3 style='display: inline-table'> " + data.result.data.realtime.weather.info + "</h3>&nbsp;&nbsp;" +
                    "<span class='todayweatherspan'>温度：<span class='todayweatherspanval'>" + data.result.data.realtime.weather.temperature + "℃</span></span>" +
                    "<span class='todayweatherspan'> 湿度：<span class='todayweatherspanval'>" + data.result.data.realtime.weather.humidity + "</span></span><br/>" +
                    "<div class='todaywdiv'><span class='todayweatherspan'> pm10：<span class='todayweatherspanval'>" + data.result.data.pm25.pm25.pm10 + "</span></span>" +
                    "<span class='todayweatherspan'> pm2.5：<span class='todayweatherspanval'>" + data.result.data.pm25.pm25.pm25 + "</span> <span class='todayweatherspanval'>" + data.result.data.pm25.pm25.quality + "</span></span><br/>" +
                    "</div><span class='todaywindspan'>" +
                    "最低温度：<span class='todayweatherspanval'>" + data.result.data.weather[0].info.night[2] + "℃</span>&nbsp;&nbsp;&nbsp;&nbsp;" +
                    " 最高温度：<span class='todayweatherspanval'>" + data.result.data.weather[0].info.day[2] + "℃</span></span><br/>" +
                    " <span class='todaywindspan1'>风：<span class='todayweatherspanval'>" + data.result.data.realtime.wind.direct + " " + data.result.data.realtime.wind.power + "</span>" +
                    "</span></span>" +
                    "<p class='todayweather'><span style='color:#31b0d5;'>穿衣建议：</span>" + data.result.data.life.info.chuanyi + "</p>" +
                    "<p class='todayweather'><span style='color:#31b0d5;'>运动建议：</span>" + data.result.data.life.info.yundong + "</p>" +
                    "<p class='todayweather'><span style='color:#31b0d5;'>防晒建议：</span>" + data.result.data.life.info.ziwaixian + "</p>" +
                    "</div>" +
                    "</div>" +
                    "<div class='row' style='margin-top:40px'>" +
                    "<div class='col-sm-3 col-md-3 col-xs-3 col-lg-3 weatherdiv'>" +
                    "<img src='/wathericon/" + data.result.data.weather[1].info.day[0] + ".png' alt='' width='44px' >" +
                    "<p class='weathp' style='margin-top:10px '>" + data.result.data.weather[1].info.day[1] + "/" + data.result.data.weather[1].info.night[1] + "</p>" +
                    "<p class='weathp'>" + data.result.data.weather[1].info.night[2] + "~" + data.result.data.weather[1].info.day[2] + "℃</p>" +
                    "<p class='weathp'>" + data.result.data.weather[1].info.day[3] + "<br/>" + data.result.data.weather[1].info.day[4] + "</p>" +
                    "<p class='weathp'>" + data.result.data.weather[1].date.substr(5, 6) + "</p>" +
                    "<p class='weathp'>周 " + data.result.data.weather[1].week + "</p>" +
                    "</div>" +
                    "<div class='col-sm-3 col-md-3 col-xs-3 col-lg-3 weatherdiv'>" +
                    "<img src='/wathericon/" + data.result.data.weather[2].info.day[0] + ".png' alt='' width='44px' >" +
                    "<p class='weathp' style='margin-top:10px '>" + data.result.data.weather[2].info.day[1] + "/" + data.result.data.weather[2].info.night[1] + "</p>" +
                    "<p class='weathp'>" + data.result.data.weather[2].info.night[2] + "~" + data.result.data.weather[2].info.day[2] + "℃</p>" +
                    "<p class='weathp'>" + data.result.data.weather[2].info.day[3] + "<br/>" + data.result.data.weather[2].info.day[4] + "</p>" +
                    "<p class='weathp'>" + data.result.data.weather[2].date.substr(5, 6) + "</p>" +
                    "<p class='weathp'>周 " + data.result.data.weather[2].week + "</p>" +
                    "</div>" +
                    "<div class='col-sm-3 col-md-3 col-xs-3 col-lg-3 weatherdiv'>" +
                    "<img src='/wathericon/" + data.result.data.weather[3].info.day[0] + ".png' alt='' width='44px' >" +
                    "<p class='weathp' style='margin-top:10px '>" + data.result.data.weather[3].info.day[1] + "/" + data.result.data.weather[3].info.night[1] + "</p>" +
                    "<p class='weathp'>" + data.result.data.weather[3].info.night[2] + "~" + data.result.data.weather[3].info.day[2] + "℃</p>" +
                    "<p class='weathp'>" + data.result.data.weather[3].info.day[3] + "<br/>" + data.result.data.weather[3].info.day[4] + "</p>" +
                    "<p class='weathp'>" + data.result.data.weather[3].date.substr(5, 6) + "</p>" +
                    "<p class='weathp'>周 " + data.result.data.weather[3].week + "</p>" +
                    "</div>" +
                    "<div class='col-sm-3 col-md-3 col-xs-3 col-lg-3 weatherdiv none'>" +
                    "<img src='/wathericon/" + data.result.data.weather[4].info.day[0] + ".png' alt='' width='44px' >" +
                    "<p class='weathp' style='margin-top:10px '>" + data.result.data.weather[4].info.day[1] + "/" + data.result.data.weather[4].info.night[1] + "</p>" +
                    "<p class='weathp'>" + data.result.data.weather[4].info.night[2] + "~" + data.result.data.weather[4].info.day[2] + "℃</p>" +
                    "<p class='weathp'>" + data.result.data.weather[4].info.day[3] + "<br/>" + data.result.data.weather[4].info.day[4] + "</p>" +
                    "<p class='weathp'>" + data.result.data.weather[4].date.substr(5, 6) + "</p>" +
                    "<p class='weathp'>周 " + data.result.data.weather[4].week + "</p>" +
                    "</div>" +
                    "</div>" +
                    "<div class='row'>" +
                    "<div class='col-sm-12 col-md-12 col-xs-12 col-lg-12 rigthtext'>" +
                    "发布时间：" + data.result.data.realtime.time + "" +
                    "</div>" +
                    "</div>";

                $("#t_w_div").html(weatherhtml);
                laber = new Array();
                lineMinData = new Array();
                lineMaxData = new Array();
                for (var i = 0; i < data.result.data.weather.length; i++) {
                    laber.push("星期" + data.result.data.weather[i].week);
                    lineMinData.push(data.result.data.weather[i].info.night[2]);
                    lineMaxData.push(data.result.data.weather[i].info.day[2]);
                }
                wlaber = new Array();
                wlineMinData = new Array();
                wlineMaxData = new Array();
                for (var j = 0; j < data.result.data.f3h.temperature.length; j++) {
                    wlaber.push(data.result.data.f3h.temperature[j].jg.substr(6, 4));
                    wlineMinData.push(data.result.data.f3h.temperature[j].jb);
                    wlineMaxData.push(data.result.data.f3h.precipitation[j].jf);
                }
                zhexian();
            }
        });
    }
    setInterval("getweather()", 1800000);