var express = require('express');
var router = express.Router();

/* GET users listing. */
//打开添加文章的页面
router.get('/add', function(req, res, next) {
    console.log("打开添加文章的页面")
    res.render("articles/addArticle",{title:"发表文章"});
});
router.post('/add', function(req, res, next) {
    console.log("提交文章")
});
module.exports = router;/**
 * Created by Administrator on 2017/3/6.
 */
