var jade = require('jade');
var schema =require('../schema');
var menu =require('./menu');
var EventProxy = require("eventproxy").EventProxy;
var proxy = new EventProxy();

var Team=schema.Team(),
    Job=schema.Job(),
    Activities=schema.Activities();

exports.team = function(req,res){
    var kind = req.query.kind ? req.query.kind : 1;
    var crumbs = ['家族构成'];
    var teamRender = function(menus,teams,jobs){
        for (var i = 0; i < teams.length; i++) {
            var team = teams[i]
            for (var j = 0; j < jobs.length; j++) {
                if(team.teamID == jobs[j].teamID) {
                    team.job = jobs[j];
                }
            }
        }
        res.render('team', { title:'杭州久拓软件有限公司',
            kind:kind,
            menus:menus,
            teams:teams,
            crumbs:crumbs
        });
    };

    proxy.assign('menusEvent','teamsEvent','jobsEvent',teamRender);

    menu.queryMenus(proxy,'menusEvent');

    Team.find(null,null,{sort: {order: 1}},function(err,teams){
        proxy.trigger('teamsEvent',teams);
    });

    Job.find(function(err,jobs){
        proxy.trigger('jobsEvent',jobs);
    });

};

exports.teamActivity = function(req,res){
    var crumbs = ['家族活动'];

    var render =  function(menus,activities){
        res.render('teamActivity', { title:'久拓|innosoft|久拓软件',
            menus:menus,
            crumbs:crumbs,
            activities:activities
        });
    }

    proxy.assign('menusEvent','activityEvent',render);

    menu.queryMenus(proxy,'menusEvent');

    Activities.find(null,null,{sort: {date: -1},limit :8},function(err,activities){
        proxy.trigger('activityEvent',activities);
    });

};

exports.Activity =function(req,res){
    var skip =  req.query.skip ? req.query.skip : 6;
    Activities.find(null,null,{sort: {date: -1},skip:skip,limit :4},function(err,activities){
        res.json(activities);
    })
};

exports.ActivityChild =function(req,res){
    var ID = req.query.ID ? parseInt(req.query.ID) : 1 ;
    var votes = req.query.votes ? (parseInt(req.query.votes)+1) : 1;

    Activities.update({ activityID: ID },{ $set: { votes: votes }},function(err,num){

    });

    Activities.find({activityID:ID},function(err,activities){
        res.json(activities);
    });

};