module utills {
	/**
	 *
	 * @author 
	 *
	 */
	export class AdBanner extends egret.Sprite{
    	private banner:egret.Bitmap;
		public constructor() {
    		super()
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
		private onAddToStage(){
		    this.banner = new egret.Bitmap();
            this.banner.texture = RES.getRes('banner_png');
            this.banner.height = 80;
            this.banner.width = 640;
            this.addChild(this.banner);
		}
	}
}
