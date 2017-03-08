/**
 * Created by Administrator on 2017/3/7.
 */
//保存的是数据模型，也就是users,articles两个表的结构
var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;
    module.exports = {
        User:{
            username:{type:String,required:true},
            password:{type:String,required:true},
            email:{type:String,required:true},
            avatar:{type:String,required:true}
        },
        Article:{
            user:{type:ObjectId,ref:'User'},
            title: String,
            content: String,
            createAt:{type: Date, default: Date.now}

        }
    };