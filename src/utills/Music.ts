namespace utills {
	/**
	 *
	 * @author 
	 *
	 */
	export class Music extends egret.Sprite{
    	private button:egret.Bitmap;
    	private sound:egret.Sound;
        private SoundChannel:egret.SoundChannel;
    	private buttonSpin:egret.Tween;
        private position;
		public constructor() {
    		super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
            
		}
		private onAddToStage(){
		    this.button = new egret.Bitmap();
            this.button.texture = RES.getRes('musicbtn_png');
            this.button.width  = this.button.width * 0.5;
            this.button.height = this.button.height * 0.5;
            this.button.anchorOffsetX = (this.button.width )/2;
            this.button.anchorOffsetY = (this.button.height )/2;
            this.addChild(this.button);
            this.buttonSpin = egret.Tween.get(this.button,{ loop: true });
            this.buttonSpin.to({ rotation: 360 },3500);
            this.sound = RES.getRes('pintu_mp3');
            this.play()
		}
		public play(){
            this.SoundChannel = this.sound.play(this.position,0);
            this.buttonSpin.setPaused(false)
		}
		public stop(){
            this.position = this.SoundChannel.position
            this.SoundChannel.stop()
            this.buttonSpin.setPaused(true)
		}
	}
}
