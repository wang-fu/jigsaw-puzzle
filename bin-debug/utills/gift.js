var utills;
(function (utills) {
    /**
     *
     * @author
     *
     */
    var gift = (function (_super) {
        __extends(gift, _super);
        function gift() {
            _super.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=gift,p=c.prototype;
        p.onAddToStage = function () {
            this.gift = new egret.Bitmap();
            this.gift.texture = RES.getRes('giftbtn_png');
            this.gift.width = this.gift.width * 0.5;
            this.gift.height = this.gift.height * 0.5;
            this.gift.anchorOffsetX = (this.gift.width) / 2;
            this.gift.anchorOffsetY = (this.gift.height) / 2;
            this.addChild(this.gift);
        };
        return gift;
    }(egret.Sprite));
    utills.gift = gift;
    egret.registerClass(gift,'utills.gift');
})(utills || (utills = {}));
