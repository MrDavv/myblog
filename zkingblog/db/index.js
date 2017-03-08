/**
 * Created by Administrator on 2017/3/7.
 */
var mongoose = require('mongoose');
    models = require('./models');
    Schema = mongoose.Schema;
var settings = require('../settings');
mongoose.connect(settings.url);

mongoose.model('User',new Schema(models.User));
mongoose.model('Article',new Schema(models.Article));
//提供了根据一个名称获得数据模型的方法

global.Model = function (type){
    return mongoose.model(type);
}