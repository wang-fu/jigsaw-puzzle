var utills;
(function (utills) {
    /**
     *
     * @author
     *
     */
    var Rulls = (function (_super) {
        __extends(Rulls, _super);
        function Rulls() {
            _super.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=Rulls,p=c.prototype;
        p.onAddToStage = function () {
            this.rule = new egret.Bitmap();
            this.rule.texture = RES.getRes('rulebtn_png');
            this.rule.width = this.rule.width * 0.5;
            this.rule.height = this.rule.height * 0.5;
            this.rule.anchorOffsetX = (this.rule.width) / 2;
            this.rule.anchorOffsetY = (this.rule.height) / 2;
            this.addChild(this.rule);
        };
        return Rulls;
    }(egret.Sprite));
    utills.Rulls = Rulls;
    egret.registerClass(Rulls,'utills.Rulls');
})(utills || (utills = {}));
