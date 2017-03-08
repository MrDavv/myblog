/**
 * Created by Administrator on 2017/3/8.
 */
exports.checkLogin = function(req,res,next){
    if(!req.session.user){
        //没有登录转到登录页面
        req.flash("error","未登录");
        return res.redirect("/users/login");
    }
    //已经登录则放行
    next();
};
exports.checkNotLogin = function(req,res,next){
    if(req.session.user){
        //如果已经登录不能访问注册页面
        req.flash("error","已经登录");
        return res.redirect("back");
    }
    //则放行
    next();
};