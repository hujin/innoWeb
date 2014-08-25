var schema =require('../schema');
var Menu=schema.Menu();

exports.queryMenus = function(proxy,eventName) {
    Menu.find({status:1},null,{sort: {menuID: 1}},function(err,docs){
        proxy.trigger(eventName,docs);
    });
};