var jade = require('jade');
var schema =require('../schema');
var menu =require('./menu');
var EventProxy = require("eventproxy").EventProxy;
var proxy = new EventProxy();

var Menu=schema.Menu(),
    Product=schema.Product();

exports.product = function(req,res){
    var id =req.query.id ? req.query.id : 1,
        productId = req.query.pid ? req.query.pid : -1;

    var teamRender = function(menus,products){
        var banners = [];
        var product = products[0];//默认显示第一个产品
        if(productId == -1) {//默认
            productId = product.productID;
        }
        for(var i = 0; i < products.length; i++) {
            banners.push({name:products[i].productName,id:products[i].productID,url:"product?id=" + id + "&pid=" + products[i].productID});
            if(products[i].productID == productId) {
                product = products[i];//当前页要显示的产品
            }
        }
        res.render('product', { title:'久拓产品体系--交通运输|应对气候变化|数据中心|软件框架|移动应用',
            banner:banners,
            kind:productId,
            menus:menus,
            product:product
        });
    };

    proxy.assign('menusEvent','productEvent',teamRender);

    menu.queryMenus(proxy,'menusEvent');

    Product.find({moduleID:id},function(err,docs){
        var products = docs[0].moduleProduct;
        proxy.trigger('productEvent',products);
    });
};