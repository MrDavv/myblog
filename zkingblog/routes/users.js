var express = require('express');
var middleware = require('../middleware/index');
var router = express.Router();





/* GET users listing. */
//访问注册页面
router.get('/reg',middleware.checkNotLogin,function(req,res,next){
    var keyword ="";
    res.render("users/reg",{keyword:keyword,title:"注册"});
});
//提交注册信息
router.post('/reg',middleware.checkNotLogin,function(req,res,next){
    //获得用户提交的表单数据
    var user = req.body;
    var email = user.email;
    Model('User').find({email:email},function(err,user){

    });
    if(user.password != user.pwd2){
        req.flash('error','两次输入密码不一致');
        //重定向

        return res.redirect('/users/reg');
    }
    delete user.pwd2;
    user.password = md5(user.password);//加密密码
    user.avatar = "https://s.gravatar.com/avatar/"+md5(user.email)+"?s=80";

    //将user对象保存到数据库中
    new Model('User')(user).save(function(err,user){
        if(err){
            req.flash('error','注册失败');
            return res.redirect('/users/reg');
        }
        //在session中保存用户的登录信息
        req.flash('success','注册成功');
        req.session.user = user;
        res.redirect('/');//注册成功后返回主页
    });
});
//访问登录页面
router.get('/login', function(req, res, next) {
    var keyword ="";

    console.log("访问登陆页面");
    res.render("users/login",{keyword:keyword,title:"登录"});
});
//使用post方式提交登陆信息
router.post('/login', function(req, res, next) {
    console.log("提交登陆信息");
    var user = req.body;
    user.password = md5(user.password);
    console.log(user);
    Model('User').findOne(user,function(err,user){
        if(user){
            req.flash('success','登录成功');
            req.session.user = user;//用户信息存入 session
            return res.redirect('/');//注册成功后返回主页
        }
        req.flash('error','登录失败');
        res.redirect('/users/login');
    });
});

//注销用户登录
router.get('/logout',function(req,res,next){
    req.flash('success','用户登录已注销');
    req.session.user=null;
    res.redirect('/users/login');
});
//增加md5加密的工具方法
function md5(val){
    return require('crypto').createHash('md5').update(val).digest('hex');
}

module.exports = router;
