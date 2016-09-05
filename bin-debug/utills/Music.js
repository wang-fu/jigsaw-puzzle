var utills;
(function (utills) {
    /**
     *
     * @author
     *
     */
    var Music = (function (_super) {
        __extends(Music, _super);
        function Music() {
            _super.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=Music,p=c.prototype;
        p.onAddToStage = function () {
            this.button = new egret.Bitmap();
            this.button.texture = RES.getRes('musicbtn_png');
            this.button.width = this.button.width * 0.5;
            this.button.height = this.button.height * 0.5;
            this.button.anchorOffsetX = (this.button.width) / 2;
            this.button.anchorOffsetY = (this.button.height) / 2;
            this.addChild(this.button);
            this.buttonSpin = egret.Tween.get(this.button, { loop: true });
            this.buttonSpin.to({ rotation: 360 }, 3500);
            this.sound = RES.getRes('pintu_mp3');
            this.play();
        };
        p.play = function () {
            this.SoundChannel = this.sound.play(this.position, 0);
            this.buttonSpin.setPaused(false);
        };
        p.stop = function () {
            this.position = this.SoundChannel.position;
            this.SoundChannel.stop();
            this.buttonSpin.setPaused(true);
        };
        return Music;
    }(egret.Sprite));
    utills.Music = Music;
    egret.registerClass(Music,'utills.Music');
})(utills || (utills = {}));
