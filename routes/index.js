
/*
 * GET home page.
 */

var portal = require('./portal'),
    about = require('./about'),
    contact = require('./contact'),
    news = require('./news'),
    product = require('./product'),
    team = require('./team'),
    invite = require('./invite'),
    login = require('./login');

exports.index =function(app){

    app.get('/', portal.portal);

    app.get('/portal', portal.portal);

    app.get('/contact',contact.contact);

    app.get('/news',news.news);

    app.get('/login',login.login);

    app.post('/login',login.doLogin);

    app.get('/product',product.product);

    app.get('/about',about.about);

    app.get('/team',team.team);

    app.get('/invite',invite.invite);

    app.get('/invite/getPost',invite.getPost);

    app.get('/newshtml',news.newshtml);

    app.get('/teamActivity',team.teamActivity);

    /***** ajax 获取 start ******/
    app.get('/teamActivity/Activity',team.Activity);

    app.get('/teamActivity/ActivityChild',team.ActivityChild);

    app.get('/newshtml/newsAddVotes',news.newsAddVotes);
    /***** ajax 获取 end ******/
}
