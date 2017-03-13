var express = require('express');
var router = express.Router();
var middleware = require('../middleware/index');
var markdown = require('markdown').markdown;

/* GET users listing. */
//打开添加文章的页面
router.get('/add',middleware.checkLogin,function(req, res, next) {
    console.log("打开添加文章的页面")
    res.render("articles/addArticle",{title:"发表文章"});
});
router.post('/add',function(req, res, next) {
    console.log("提交文章")
    var article = req.body;
    article.user = req.session.user._id;
    new Model('Article')(article).save(function(err,art){
       if(err){
           return res.redirect('/articles/add');
       }
        res.redirect('/');
    });
});
router.post('/update', function (req, res) {
    console.log('更新');
    var article = req.body;
    //article.user = req.session.user._id;
    console.log(req.body);
    Model('Article').update({user:req.session.user},article,function(err){
        if(err){
            req.flash('error', '更新文章失败!');// 放置失败信息
            return res.redirect('back');
        }
        req.flash('success', '更新文章成功!');  //放置成功信息
        res.redirect('/');//发表文章成功后返回主页
    });
});
router.get('/detail/:_id', function(req, res, next) {
    Model('Article').findOne({_id:req.params._id},function(err,article){
        article.content = markdown.toHTML(article.content);
        res.render('articles/detail',{title:'查看文章',article:article});
    });

});
router.get('/delete/:_id', function(req, res, next) {
    Model('Article').remove({_id:req.params._id},function(err,result){
        if(err){
            req.flash('error',err);
            return res.redirect('back');
        }
        req.flash('success','删除成功');
        res.redirect('/');
    });
});
router.get('/edit/:_id', function (req, res) {
    //添加权限判断，判断当前的登陆人和文章发表人是否一致
    //如果不一致转回详情页面，并显示错误
    Model('Article').findOne({_id:req.params._id},function(err,article){
        console.log(article);
        console.log(req.session.user);
        if(req.session.user._id != article.user )
        {
            req.flash('error','你没有权限');
            return res.redirect('/articles/detail/'+article._id);
        }
        article.content = markdown.toHTML(article.content);
        res.render('articles/updateArticle',{title:'编辑文章',article:article});
    });
});
router.all('/list/:pageNum/:pageSize',function(req, res, next) {
    var pageNum = req.params.pageNum&&req.params.pageNum>0?parseInt(req.params.pageNum):1;
    var pageSize =req.params.pageSize&&req.params.pageSize>0?parseInt(req.params.pageSize):2;
    var query = {};
    var searchBtn = req.body.searchBtn;
    var keyword = req.body.keyword;
    if(searchBtn){
        req.session.keyword = keyword;
    }
    if(req.session.keyword){
        query['title'] = new RegExp(req.session.keyword,"ig");
    }

    Model('Article').count(query,function(err,count){
        Model('Article').find(query).sort({createAt:-1}).skip((pageNum-1)*pageSize).limit(pageSize).populate('user').exec(function(err,articles){
            articles.forEach(function (article) {
                article.content = markdown.toHTML(article.content);
            });
            console.log(count);
            console.log(pageSize);
            res.render('index',{
                title:'主页',
                pageNum:pageNum,
                pageSize:pageSize,
                keyword:req.session.keyword,
                totalPage:Math.ceil(count/pageSize),
                articles:articles
            });
        });
    });
});

module.exports = router;/**
 * Created by Administrator on 2017/3/6.
 */
