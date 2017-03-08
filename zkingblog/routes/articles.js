var express = require('express');
var router = express.Router();
var middleware = require('../middleware/index')

/* GET users listing. */
//打开添加文章的页面
router.get('/add',middleware.checkLogin,function(req, res, next) {
    console.log("打开添加文章的页面")
    res.render("articles/addArticle",{title:"发表文章"});
});
router.post('/add',middleware.checkLogin,function(req, res, next) {
    console.log("提交文章")
    var article = req.body;
    article.user = req.session.user._id;
    new Model('Article')(article).save(function(err,art){
       if(err){
           return res.redirect('/articles/addArticle');
       }
        return res.redirect('/');
    });
});
router.post('/add', function (req, res) {
    req.body.user = req.session.user._id;
    new Model('Article')(req.body).save(function(err,article){
        if(err){
            req.flash('error', '更新文章失败!');// 放置失败信息
            return res.redirect('/articles/add');
        }
        req.flash('success', '更新文章成功!');  //放置成功信息
        res.redirect('/');//发表文章成功后返回主页
    });
});

module.exports = router;/**
 * Created by Administrator on 2017/3/6.
 */
