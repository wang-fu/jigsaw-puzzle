/**
 *
 * @author S
 *
 * 名称：LoadStar.ts
 * 摘要：加载界面2
 *
 */
var CLoadStar = (function (_super) {
    __extends(CLoadStar, _super);
    function CLoadStar() {
        _super.call(this);
        this.starTex = [];
        this.star_index = 0;
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/load.config.json", "resource/");
        //RES.getResAsync("loadstar_json",this.createView,this);
    }
    var d = __define,c=CLoadStar,p=c.prototype;
    p.onConfigComplete = function () {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preloadsload");
    };
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preloadsload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createView();
        }
    };
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    p.createView = function () {
        for (var i = 0; i < 19; ++i) {
            var str = "loadstar_json.ls" + i.toString();
            this.starTex.push(RES.getRes(str));
        }
        this.star = new egret.Bitmap(this.starTex[0]);
        this.addChild(this.star);
        this.star.anchorOffsetX = this.star.width / 2;
        this.star.anchorOffsetY = this.star.height / 2;
        this.star.x = g_nStageW / 2;
        this.star.y = g_nStageH / 2;
        egret.startTick(this.starRun, this);
    };
    p.starRun = function () {
        this.star.texture = this.starTex[this.star_index++];
        if (this.star_index > 18)
            this.star_index = 0;
        return true;
    };
    p.setProgress = function (current, total) {
        if (current == total)
            egret.stopTick(this.starRun, this);
    };
    return CLoadStar;
}(egret.Sprite));
egret.registerClass(CLoadStar,'CLoadStar');
