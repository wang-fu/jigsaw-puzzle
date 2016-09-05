var utills;
(function (utills) {
    /**
     *
     * @author
     *
     */
    var AdBanner = (function (_super) {
        __extends(AdBanner, _super);
        function AdBanner() {
            _super.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=AdBanner,p=c.prototype;
        p.onAddToStage = function () {
            this.banner = new egret.Bitmap();
            this.banner.texture = RES.getRes('banner_png');
            this.banner.height = 80;
            this.banner.width = 640;
            this.addChild(this.banner);
        };
        return AdBanner;
    }(egret.Sprite));
    utills.AdBanner = AdBanner;
    egret.registerClass(AdBanner,'utills.AdBanner');
})(utills || (utills = {}));
