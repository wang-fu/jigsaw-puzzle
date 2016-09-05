namespace utills {
	/**
	 *
	 * @author 
	 *
	 */
	export class Rulls extends egret.Sprite{
        private rule: egret.Bitmap;
        public constructor() {
            super()
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }
        private onAddToStage() {
            this.rule = new egret.Bitmap();
            this.rule.texture = RES.getRes('rulebtn_png');
            this.rule.width = this.rule.width * 0.5;
            this.rule.height = this.rule.height * 0.5;
            this.rule.anchorOffsetX = (this.rule.width) / 2;
            this.rule.anchorOffsetY = (this.rule.height) / 2;
            this.addChild(this.rule);
        }
    }
	
}
