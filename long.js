//服务器端文件
//创建web服务器
const express=require('express');
const bodyParser=require('body-parser');
//引入user文件
const userRouter=require('./routes/long_user.js');
//const productRouter=require('./routes/product.js');
const demo=require('./routes/demo.js');
const myPro=require('./routes/myPro.js');
const rootR=require('./routes/rootR.js');

//1.1 引入模块 cors
const cors = require("cors");
//创建web该服务器，挂载监听端口

var server=express();

server.use(cors({
	origin:["http://172.242.3.181:8080",
	"http://localhost:8080",
	"http://172.242.3.181:7777"],
	credentials:true
  }));
server.listen(7777);
//托管静态文件
server.use(express.static('./public'));
server.use(express.static('./ajax'));
server.use(express.static('./myPro'));
server.use(express.static('./rootR'));

server.use(bodyParser.urlencoded({
	extended:false
}));
//use路由器管理路由
//把用户路由器挂载到/user下，访问形式/user/detail
server.use('/long_user',userRouter);
//server.use('/product',productRouter);
server.use('/demo',demo);
server.use('/myPro',myPro);
server.use('/rootR',rootR);