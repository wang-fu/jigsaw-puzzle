module utills {
	/**
	 *
	 * @author jason
	 * 背景
	 *
	 */
	export class Bg extends egret.Sprite{
    	private bg:egret.Bitmap;
		public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this)
    	}
		private onAddToStage(){
            this.bg = new egret.Bitmap();
            this.bg.texture = RES.getRes('startbg_png');
            this.bg.width = this.stage.stageWidth;
            this.bg.height = this.stage.stageHeight;
            this.bg.x = 0;
            this.bg.y = 0;
            this.addChild(this.bg);
		}
        public  changeBg(){
            this.bg.texture =RES.getRes('bg_jpg');
        }
	}
}
