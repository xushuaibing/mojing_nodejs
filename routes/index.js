var express = require('express');
var router = express.Router();
var restUtil = require('./restUtil');
var os = require('os');
var conf = require('./conf');
var fs = require('fs'); //文件模块
const path = require('path');


/* GET home page. */
router.get('/', function(req, res, next) {
 res.render('index', { title: 'Express',mp4url:'http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4' });
 
});

/* GET home page. */
router.get('/test', function(req, res, next) {
 res.send('HellowWorld');
});

router.get('/wannianli', function(req, res,next) {
	var date = req.query.date;
	var path = "/calendar/day?date="+date+"&key="+conf.WanNianLi.key+"";	
    var promise = restUtil.get({
        hostname : "v.juhe.cn",       
        path : path
    });
    promise.then(function(data){
        res.send(data);
    },function(err){
        next(err);
    });
});

router.get('/weather', function(req, res,next) {
	var date = req.query.city;
	var path = "/onebox/weather/query?cityname=%E9%83%91%E5%B7%9E&key="+conf.Weather.key+"";	
    var promise = restUtil.get({
        hostname : "op.juhe.cn",       
        path : path
    });
    promise.then(function(data){    	
        res.send(data);
    },function(err){
        next(err);
    });
});

router.get('/toutiao', function(req, res,next) {
	var type = req.query.type;
	var path = "/toutiao/index?type="+type+"&key="+conf.TouTiao.key+"";	
    var promise = restUtil.get({
        hostname : "v.juhe.cn",       
        path : path
    });
    promise.then(function(data){    	
        res.send(data);
    },function(err){
        next(err);
    });
});


router.get('/todayVideo', function(req, res,next) {  
  var path = "/todayVideo"; 
    var promise = restUtil.get({
        hostname : "api.apiopen.top",       
        path : path
    });
    promise.then(function(data){   
      if(data != null && data.code == 200){
          var json = data.result;
          json.forEach(function(temp){
              if(temp.type == "autoPlayFollowCard" || temp.type == "followCard" ){
                var content = temp.data.content;
                if(content.type == "video"){
                  var videotemp = content.data;
                  var videoTitle = content.data.title;
                  var videoPlayUrl = content.data.playUrl;
                  console.log(videoPlayUrl);
                  res.write(videoPlayUrl);
                }

              }
          });
      }
           console.log(data);
        res.send(data);
    },function(err){
        next(err);
    });
});

router.get('/html', function(req, res,next) {       	
        res.writeHead(200,{'Content-Type':'html'});
        res.write('<!DOCTYPE html>'+
                  	'<html>'+
                  	'<head>'+
                  	'<meta charset="utf-8" />'+
                  	'<meta name="referrer" content="no-referrer"/>'+
                  	'<title>视频预览</title>'+
                  	'</head>'+
                  	'<body>'+
                  		'<div style = "width:100%">'+
                  			'<video autoplay="autoplay" width="100%"> '   +     
				  				'<source src="http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4" type="video/mp4" />'+
							'</video>'+
						'</div>'+
					'</body>'+
                  	'</html>');     
        res.end();    
});

router.get('/ipAddress', function(req, res,next) { 
  var host = '127.0.0.1:3000';
  var interfaces = os.networkInterfaces();
   for (var devName in interfaces) {
       var iface = interfaces[devName];
       for (var i = 0; i < iface.length; i++) {
         var alias = iface[i];               
         if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
               
             host = alias.address;
             break; 
         }
      }
      if(host.indexOf('127.0.0.1') == -1){
        break;
      }
   }   
    host = host+":"+conf.MainService.port;
    res.end(host);
});

router.get('/wenhou', function(req, res,next) { 
  var wenHouStr = '哈哈哈哈哈哈哈哈哈^v^';
  var jsonfile = fs.readFileSync('../data/wenhou.json').toString();
  jsonfile = JSON.parse(jsonfile);
  var wenHouDate = jsonfile.date;
  wenHouDate.forEach(function(data){
    var now = new Date();
    var shi = now.getHours();
    var fen = now.getMinutes();
    if(shi >= data.qi && shi < data.zhi){
      wenHouStr = data.str +"好哇！";
      var wenhouL = data.wenhou.length;
      //console.log(wenhouL);
      var inx = parseInt(Math.random()*(wenhouL-1),10);
      //console.log(inx);
      wenHouStr += data.wenhou[inx];
    }    
  });  
  res.end(wenHouStr);
});

router.get('/addDaiBan', function(req, res,next) { 
    var daiban = req.query.daiban;
    fs.readFile('../data/daiban.json',function(err,data){
        if(err){
                return console.error(err);
            }
        var person = data.toString();//将二进制的数据转换为字符串
        person = JSON.parse(person);//将字符串转换为json对象
        var params = {"no":person.data.length + 1,"text":daiban};
        person.data.push(params);//将传来的对象push进数组对象中
        person.total = person.data.length;//定义一下总条数，为以后的分页打基础
        var pstr = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
            fs.writeFile('../data/daiban.json',pstr,function(err){
                if(err){
                    console.error(err);
                }
                console.log('----------新增成功-------------');
            })
        });

    res.end();
});

router.get('/deleteDaiBan', function(req, res,next) {
    var no = req.query.no;
    fs.readFile('../data/daiban.json',function(err,data){
        if(err){
            return console.error(err);
        }
        var person = data.toString();//将二进制的数据转换为字符串
        person = JSON.parse(person);//将字符串转换为json对象
        //把数据读出来删除
        for(var i = 0; i < person.data.length;i++){
            if(no == person.data[i].no){
                console.log(person.data[i])
                person.data.splice(i,1);
            }
        }
        person.total = person.data.length;//定义一下总条数，为以后的分页打基础
        var pstr = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
        fs.writeFile('../data/daiban.json',pstr,function(err){
            if(err){
                console.error(err);
            }
            console.log('----------删除成功-------------');
        })
    });

    res.end();
});

router.get('/deleteAllDaiBan', function(req, res,next) {
    fs.readFile('../data/daiban.json',function(err,data){
        if(err){
            return console.error(err);
        }
        var person = data.toString();//将二进制的数据转换为字符串
        person = JSON.parse(person);//将字符串转换为json对象
        person.data.splice(0);
        person.total = person.data.length;//定义一下总条数，为以后的分页打基础
        var pstr = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
        fs.writeFile('../data/daiban.json',pstr,function(err){
            if(err){
                console.error(err);
            }
            console.log('----------删除成功-------------');
        })
    });

    res.end();
});

router.get('/showDaiBan', function(req, res,next) {

    var person = fs.readFileSync('../data/daiban.json').toString();

    res.end(person);
});

router.get('/addLiuYan', function(req, res,next) {
    var liuyan = req.query.liuyan;
    fs.readFile('../data/liuyan.json',function(err,data){
        if(err){
            return console.error(err);
        }
        var person = data.toString();//将二进制的数据转换为字符串
        person = JSON.parse(person);//将字符串转换为json对象
        var params = {"no":person.data.length + 1,"text":liuyan};
        person.data.push(params);//将传来的对象push进数组对象中
        person.total = person.data.length;//定义一下总条数，为以后的分页打基础
        var pstr = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
        fs.writeFile('../data/liuyan.json',pstr,function(err){
            if(err){
                console.error(err);
            }
            console.log('----------新增成功-------------');
        })
    });

    res.end();
});

router.get('/deleteLiuYan', function(req, res,next) {
    var no = req.query.no;
    fs.readFile('../data/liuyan.json',function(err,data){
        if(err){
            return console.error(err);
        }
        var person = data.toString();//将二进制的数据转换为字符串
        person = JSON.parse(person);//将字符串转换为json对象
        //把数据读出来删除
        for(var i = 0; i < person.data.length;i++){
            if(no == person.data[i].no){
                console.log(person.data[i])
                person.data.splice(i,1);
            }
        }
        person.total = person.data.length;//定义一下总条数，为以后的分页打基础
        var pstr = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
        fs.writeFile('../data/liuyan.json',pstr,function(err){
            if(err){
                console.error(err);
            }
            console.log('----------删除成功-------------');
        })
    });

    res.end();
});

router.get('/deleteAllLiuYan', function(req, res,next) {
    fs.readFile('../data/liuyan.json',function(err,data){
        if(err){
            return console.error(err);
        }
        var person = data.toString();//将二进制的数据转换为字符串
        person = JSON.parse(person);//将字符串转换为json对象
        person.data.splice(0);
        person.total = person.data.length;//定义一下总条数，为以后的分页打基础
        var pstr = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
        fs.writeFile('../data/liuyan.json',pstr,function(err){
            if(err){
                console.error(err);
            }
            console.log('----------删除成功-------------');
        })
    });

    res.end();
});

router.get('/showLiuYan', function(req, res,next) {

    var person = fs.readFileSync('../data/liuyan.json').toString();

    res.end(person);
});

 

module.exports = router;
