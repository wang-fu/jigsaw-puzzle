var utills;
(function (utills) {
    /**
     *
     * @author jason
     * 背景
     *
     */
    var Bg = (function (_super) {
        __extends(Bg, _super);
        function Bg() {
            _super.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=Bg,p=c.prototype;
        p.onAddToStage = function () {
            this.bg = new egret.Bitmap();
            this.bg.texture = RES.getRes('startbg_png');
            this.bg.width = this.stage.stageWidth;
            this.bg.height = this.stage.stageHeight;
            this.bg.x = 0;
            this.bg.y = 0;
            this.addChild(this.bg);
        };
        p.changeBg = function () {
            this.bg.texture = RES.getRes('bg_jpg');
        };
        return Bg;
    }(egret.Sprite));
    utills.Bg = Bg;
    egret.registerClass(Bg,'utills.Bg');
})(utills || (utills = {}));
