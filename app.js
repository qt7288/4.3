//app_server_00/app.js
//0:下载mysql express模块
//1:引入二个模块 mysql express
const mysql = require("mysql");
const express = require("express");
//1.1 引入模块 cors

const cors = require("cors");

//2:创建连接池 很大提高效率方法
var pool = mysql.createPool({
  host     : process.env.MYSQL_HOST,
  port     : process.env.MYSQL_PORT,
  user     : process.env.ACCESSKEY,
  password : process.env.SECRETKEY,
  database : 'app_' + process.env.APPNAME,
  connectionLimit:3
});
//3:创建express对象
var server = express();
//3.1 配置允许访问列 脚手架8080
server.use(cors({
  origin:["http://127.0.0.1:8080",
  // "http://localhost:8080",
  "http://172.242.3.181:8080",
  "http://172.242.3.181:7777"],
  credentials:true
}));
//3.2 配置静态资源目录 public
server.use(express.static("public"));
//4:为express对象绑定监听端口 3000
server.listen(5050);

// 3.11加载 模块 express-session
const session = require("express-session");
server.use(session({
  secret:"128为随机数字符串",
  resava:false,
  saveUninitialized:true,
  cookie:{
    maxAge:1000*60*60
  }
}))

//功能一:用户登录
//1:用户get 请求路径/login
server.get("/login",(req,res)=>{
  //2:获取二个参数 uname upwd
  // var qid=req.query.id;
  var u = req.query.uname;
  var p = req.query.upwd;
  //3:创建sql
  var sql = "SELECT id FROM qz_u_all";
  sql+=" WHERE uname = ? AND upwd = md5(?)";
  //4:执行sql
  pool.query(sql,[u,p],(err,result)=>{
      if(err)throw err;

      //5:获取数据库返回结果
      //6:返回客户数据
      if(result.length==0){
        res.send({code:-1,msg:"用户名或密码有误"});
      }else{ 
        // session存储uid对象
        // var id = result[0].id;
        // req.session.uid =id;
        // res.send({code:1,msg:"登录成功",result:result[0].id});
        res.send({code:1,msg:"登录成功",result:u});
      }
  })
});
// 功能：用户注册
//用户get请求请求路径login
server.get("/reg",(req,res)=>{
  // 获取二个参数uname upwd
      var u=req.query.uname;
      var p=req.query.upwd;
      var email=req.query.email;
      // var avatar=req.query.avatar;
      var gender=req.query.gender;
      var ctime=req.query.ctime;
  // 创建sql
      // var sql="INSERT INTO qz_u_all VALUES(null,u=?,p=md5(?),email=?,avatar=?,gender=?)";
      var sql1="INSERT INTO qz_u_all VALUES(null,?,md5(?),?,?,?)";
  // 执行sql

      pool.query(sql1,[u,p,email,gender,ctime],(err,result)=>{
          if(err) throw err;
          // 判断返回客户端的数据
          // 获取数据库返回结果
          // 返回客户数据
          if(result.affectedRows>0){
              res.send({code:200,msg:"注册成功"});
          }
      })
  })  

// 注释：验证用户名是否被注册
  server.get("/regU",(req,res)=>{
    // 获取二个参数uname upwd
        var u=req.query.uname;
    // 创建sql
        // var sql="INSERT INTO qz_u_all VALUES(null,u=?,p=md5(?),email=?,avatar=?,gender=?)";
        var sql1="SELECT * FROM qz_u_all WHERE uname = ?";
    // 执行sql
  
        pool.query(sql1,[u],(err,result)=>{
            if(err) throw err;
            if(result.length>0){
                res.send({code:401,msg:"已被注册"});
                return;
            }else{
              res.send({code:25,msg:"可以注册"});

            }
        })
    })  
  
//验证邮箱是否被注册
    server.get("/regE",(req,res)=>{
      // 获取二个参数uname upwd
          var email=req.query.email;
      // 创建sql
          // var sql="INSERT INTO qz_u_all VALUES(null,u=?,p=md5(?),email=?,avatar=?,gender=?)";
          var sql1="SELECT * FROM qz_u_all WHERE email = ?";
      // 执行sql
    
          pool.query(sql1,[email],(err,result)=>{
              if(err) throw err;
              if(result.length>0){
                  res.send({code:16,msg:"已被注册"});
                  return;
              }else{
                res.send({code:25,msg:"可以注册"});
                
              }
          })
      })  