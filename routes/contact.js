var jade = require('jade');
var schema =require('../schema');
var menu =require('./menu');
var EventProxy = require("eventproxy").EventProxy;
var proxy = new EventProxy();

var Menu=schema.Menu();

exports.contact = function(req,res){
    var crumbs=['联系我们'];

    var render = function(menus){
        res.render('contact', { title:'久拓软件--我们最新的联系方式',
            menus:menus,
            crumbs:crumbs
        });
    }
    proxy.assign('menusEvent',render);

    menu.queryMenus(proxy,'menusEvent');
};