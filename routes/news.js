var jade = require('jade');
var schema =require('../schema');
var menu =require('./menu');
var EventProxy = require("eventproxy").EventProxy;
var proxy = new EventProxy();

var Menu=schema.Menu(),
    News=schema.News();

//列表页
exports.news = function(req,res){
    var kind = req.query.kind ? req.query.kind : 1,//新闻类型
        page = req.query.page ? req.query.page : 1,//新闻分页
        crumbs=[];
    var start = (page-1)*10;//从第几条开始
    switch(kind){
        case '1':
            crumbs.push('公司动态');
            break;
        case '2':
            crumbs.push('市场动态');
            break;
        case '3':
            crumbs.push('产品动态');
            break;
    }
    //正文内容查询
    console.log(req.url);
    News.find({type:kind,auditStatus:1},null,{sort: {date: -1},skip:start,limit :6},function(err,news){
        //右侧及底部内容添加
        //参数(分页,类型,menu对象结果集,新闻对象结果集,res对象,url)
        newsList(page,kind,news,crumbs,res,'news');
    })
};

//详细页
exports.newshtml = function(req,res){
    var id = req.query.id ? req.query.id : 1,
        kind = req.query.kind ? req.query.kind : 1,
        crumbs=[];

    switch(kind){
        case '1':
            crumbs.push('公司动态');
            break;
        case '2':
            crumbs.push('市场动态');
            break;
        case '3':
            crumbs.push('产品动态');
            break;
    }

    //正文内容查询
    News.find({newID:parseInt(id)},function(err,news){
        //右侧及底部内容添加
        newsContent(id,kind,news,crumbs,res,'newshtml');
    });
};

exports.newsAddVotes =function(req,res){
    var ID = req.query.ID ? parseInt(req.query.ID) : 1 ;
    var votes = req.query.votes ? (parseInt(req.query.votes)+1) : 1;

    News.update({ newID: ID },{ $set: { votes: votes }},function(err,num){

    });
};

function newNews() {
    //最新资讯查询
    News.find({auditStatus:1},null,{sort: {date: -1},skip:0,limit :5},function(err,newNewsList){
        proxy.trigger('newNewsEvent',newNewsList);
    });
}

function hotNews() {
    //热门推荐查询
    News.find({auditStatus:1},null,{sort: {votes: -1},skip:0,limit :6},function(err,hotNewsList){
        proxy.trigger('hotNewsEvent',hotNewsList);
    });
}

function sameNews(news) {
    //同类推荐查询
    News.find({type:parseInt(news[0].type),auditStatus:1},null,{sort: {date: -1},skip:0,limit :5},function(err,sameNewsList){
        proxy.trigger('sameNewsEvent',sameNewsList);
    });
}

function newsTotal(type) {
    //查询同类的新闻的总量
    News.count({type:type,auditStatus:1},function(err,total){
        proxy.trigger('newsTotalEvent',total);
    });
}


//详细页
function newsContent(id,kind,news,crumbs,res,url) {
    var newsContentRender = function(menus,newNewsList,sameNewsList,hotNewsList) {
        res.render(url, { title:'久拓新闻事件--公司动态|市场动态|产品动态',
            type:kind,
            id:id,
            menus:menus,
            news:news,
            newNewsList:newNewsList,
            sameNewsList:sameNewsList,
            hotNewsList:hotNewsList,
            crumbs:crumbs
        });
    };

    menu.queryMenus(proxy,'menusEvent');
    newNews();
    hotNews();
    sameNews(news);

    proxy.assign('menusEvent','newNewsEvent','sameNewsEvent','hotNewsEvent',newsContentRender);
}

//列表页
function newsList(page,kind,news,crumbs,res,url){
    var newsListRender = function(menus,newNewsList,hotNewsList,total) {
        res.render(url, { title:'久拓新闻事件--公司动态|市场动态|产品动态',
            page:page,
            kind:kind,
            total:total,
            menus:menus,
            news:(news.length == 0 ? new Object() : news),
            newNewsList:newNewsList,
            sameNewsList:new Object(),//空对象
            hotNewsList:hotNewsList,
            crumbs:crumbs
        });
    }

    menu.queryMenus(proxy,'menusEvent');
    newNews();
    hotNews();
    newsTotal(kind);

    proxy.assign('menusEvent','newNewsEvent','hotNewsEvent','newsTotalEvent',newsListRender);
}