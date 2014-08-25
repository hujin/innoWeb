document.onLoad =  init();

var opts = {
    width : 220,     // 信息窗口宽度
    height: 60,     // 信息窗口高度
}

//初始化地图
function init() {
    var x = 120.207043, y = 30.195763;  //测试数据
    var point = new BMap.Point(x, y);

    var map = new BMap.Map("container");
    map.centerAndZoom(point, 16);
    map.enableScrollWheelZoom();

    //创建
    var myIcon = new BMap.Icon("/imgs/9tuo-logo.png", new BMap.Size(24,39));
    var marker2 = new BMap.Marker(point,{icon:myIcon});  // 创建标注
    map.addOverlay(marker2);


    // 复杂的自定义覆盖物
    function ComplexCustomOverlay(point, text, mouseoverText){
        this._point = point;
        this._text = text;
        this._overText = mouseoverText;
    }
    ComplexCustomOverlay.prototype = new BMap.Overlay();
    ComplexCustomOverlay.prototype.initialize = function(map){
        this._map = map;
        var div = this._div = document.createElement("div");
        div.style.position = "absolute";
        div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
        div.style.backgroundColor = "#2d549e";
        div.style.border = "1px solid #2d549e";
        div.style.color = "white";
        div.style.height = "19px";
        //div.style.width = "122px";
        div.style.padding = "4px";
        div.style.lineHeight = "18px";
        div.style.whiteSpace = "nowrap";
        div.style.MozUserSelect = "none";
        div.style['border-radius'] ="3px";
        div.style.fontSize = "12px"
        var span = this._span = document.createElement("span");
        div.appendChild(span);
        span.appendChild(document.createTextNode(this._text));
        var that = this;

        var arrow = this._arrow = document.createElement("div");
        arrow.style.background = "url(/imgs/label.png) no-repeat";
        arrow.style.position = "absolute";
        arrow.style.width = "39px";
        arrow.style.height = "23px";
        arrow.style.top = "22px";
        arrow.style.left = "10px";
        arrow.style.overflow = "hidden";

        div.appendChild(arrow);
        map.getPanes().labelPane.appendChild(div);
        return div;
    }
    ComplexCustomOverlay.prototype.draw = function(){
        var map_ = this._map;
        var pixel = map_.pointToOverlayPixel(this._point);
        this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + 10 + "px";
        this._div.style.top  = pixel.y - 50 + "px";
    }
    var content = "杭州市久拓软件有限公司";
    var myCompOverlay = new ComplexCustomOverlay(point, content, content);

    map.addOverlay(myCompOverlay);
}