var jade = require('jade');

exports.login = function(req,res){
    var crumbs=['内部登陆'];
    var message = req.query.message ? "用户名或密码错误!" : "";
    console.log(message);
    res.render('login',{ title:'杭州久拓软件有限公司', crumbs:crumbs,message:message})
}

exports.doLogin = function(req,res){
    var user = {
        username : 'innosoft',
        password : '9tuo_innosoft'
    };

    if(req.body.idInput === user.username && req.body.passwordInput === user.password ){
        res.redirect('/portal');
    }else{
        return res.redirect('/login?message=error');
    }
}