var jade = require('jade');
var schema =require('../schema');
var menu =require('./menu');
var EventProxy = require("eventproxy").EventProxy;
var proxy = new EventProxy();

var News=schema.News();

function queryNews(eventName,queryCondition) {
    News.find({auditStatus:1},null,{sort: {date: -1},skip:0,limit :6},function(err,docs){
        proxy.trigger(eventName,docs);
    });
}

exports.portal = function(req, res){
    var portalRender = function(menusData,hotNewsList){
        console.log("===");
        res.render('portal', { title:'久拓软件--致力于成为全国一流的IT服务供应商',
            newsData:hotNewsList,
            menus:menusData
        });
    };

    proxy.assign('menusEvent','hotNewsEvent',portalRender);

    menu.queryMenus(proxy,'menusEvent');

    queryNews('hotNewsEvent');
}