namespace utills {
	/**
	 *
	 * @author 
	 *
	 */
	export class gift extends egret.Sprite{
    	private gift:egret.Bitmap;
        public constructor() {
            super()
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }
        private onAddToStage() {
            this.gift = new egret.Bitmap();
            this.gift.texture = RES.getRes('giftbtn_png');
            this.gift.width = this.gift.width * 0.5;
            this.gift.height = this.gift.height * 0.5;
            this.gift.anchorOffsetX = (this.gift.width) / 2;
            this.gift.anchorOffsetY = (this.gift.height) / 2;
            this.addChild(this.gift);
        }
	}
}
