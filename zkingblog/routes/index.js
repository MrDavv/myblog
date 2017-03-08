var express = require('express');
markdown = require('markdown').markdown;
//路由模块
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //查询数据库 获取文章列表
    Model('Article').find({}).populate('user')
        .exec(function(err,articles){
           articles.forEach(function(article){
              article.content=markdown.toHTML(article.content);
           });
           res.render('index',{title:'我的博客',articles:articles})
        });
});

module.exports = router;
