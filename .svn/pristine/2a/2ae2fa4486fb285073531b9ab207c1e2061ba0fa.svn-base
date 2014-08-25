var jade = require('jade');
var schema =require('../schema');
var menu =require('./menu');
var EventProxy = require("eventproxy").EventProxy;
var proxy = new EventProxy();

var Menu=schema.Menu();

exports.about = function(req,res){
    var kind = req.query.kind ? req.query.kind : 1;

    var render = function(menus){
        res.render('about', { title:'久拓软件--致力于成为全国一流的IT服务供应商',
            kind:kind,
            menus:menus
        });
    }
    proxy.assign('menusEvent',render);

    menu.queryMenus(proxy,'menusEvent');
};