var express = require('express');
var router = express.Router();

/* GET users listing. */
//访问登录页面
router.get('/login', function(req, res, next) {
    console.log("访问登陆页面");
    res.render("users/login",{title:"登录"});
});
//使用post方式提交登陆信息
router.post('/login', function(req, res, next) {
    console.log("提交登陆信息");
});
//访问注册页面
router.get('/reg',function(req,res,next){
    console.log("访问注册页面");
    res.render("users/reg",{title:"注册"});
});
//提交注册信息
router.post('/reg',function(req,res,next){
    console.log("提交注册信息")
});
//注销用户登录
router.get('/logout',function(req,res,next){
    console.log("注销");
});
module.exports = router;
