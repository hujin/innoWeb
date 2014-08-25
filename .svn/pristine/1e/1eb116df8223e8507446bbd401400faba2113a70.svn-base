var jade = require('jade');
var schema =require('../schema');
var menu =require('./menu');
var EventProxy = require("eventproxy").EventProxy;
var proxy = new EventProxy();

var Team=schema.Team(),
    Job=schema.Job(),
    Activities=schema.Activities();

exports.invite = function(req,res){
    var kind = req.query.kind ? req.query.kind : 1;
    var crumbs = ['家族招新'];
    var teamRender = function(menus,teams,jobs){
        for (var i = 0; i < teams.length; i++) {
            var team = teams[i]
            for (var j = 0; j < jobs.length; j++) {
                if(team.teamID == jobs[j].teamID) {
                    team.job = jobs[j];
                }
            }
        }
        res.render('invite', { title:'杭州久拓软件有限公司',
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

exports.getPost = function(req,res){
    var ID = req.query.ID ? parseInt(req.query.ID) : 1 ;
    Job.find({jobID:ID},function(err,jobs){
        res.json(jobs);
    });
}