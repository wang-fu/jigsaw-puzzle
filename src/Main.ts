//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var g_nStageW: number;
var g_nStageH: number;
var config = config;
class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: CLoadStar;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        g_nStageW = this.stage.stageWidth;
        g_nStageH = this.stage.stageHeight;
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new CLoadStar();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig(config.resourceUrl + "default.res.json",config.resourceUrl);
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
    private stageW;
    private stageH;
    private textfield:egret.TextField;
    private gameGg:utills.Bg;
    private musicBtn:utills.Music;
    private musicStatus= true;
//    private banner: utills.AdBanner ;
    private rule: utills.Rulls;
    private startBtn:egret.Bitmap;
    private Timer:egret.Timer;
    private timerText:egret.TextField;
    private resPanel;
    private gameOverPic: egret.Bitmap;
    private restartBtn: egret.Bitmap;
    private btnWrap: egret.Sprite;
    private shareBtn: egret.Bitmap;
    private contentText: egret.TextField;
    private status;
    private millisecond: number = 0;
    private second: number = config.times;
    private splitRow: number;
    private thumbnail: egret.Bitmap;
    private animalName: string;
    private successIndex = 0;
    private moveX;
    private moveY;
    private offsetWidth = 0;
    private offsetHeight = 0;
    private tempSite = { x: 1,y: 0,x_place: 0,y_place: 0 };//储存触摸开始时的位置，用于恢复原来位置
    private tempTargetSite = { x: 1,y: 0,x_place: 0,y_place: 0 };//储存目标图片的位置，用于恢复原来位置
    private tempImage;
    private imageShow = [];//储存分割后的图片
    private placeSite = [];//储存每个图片位置
    private newInageShow = [];
    private animalBox :egret.Sprite;
    private boxMask = new egret.Shape();
    private successTimer = new egret.Timer(1000,1);
    private grade = 1;
    private sumGrade = config.sumGrade;
    private gamePanel = new egret.Sprite()
    private smallPic: egret.Bitmap;
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        this.gameGg = new utills.Bg();
        this.addChild(this.gameGg);
        //音乐按钮
        this.musicBtn = new utills.Music();
        this.musicBtn.x = 40;
        this.musicBtn.y =40;
        this.musicBtn.touchEnabled = true;
        this.musicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changeMusic,this);
        this.addChild(this.musicBtn);
        this.timerText = new egret.TextField();
        this.startGame()
    }
     /*
      * 开始游戏
      * 
      * */
    private startGame(){
       /* egret.log("startGame:")*/
        this.gameGg.changeBg();
        this.Timer = new egret.Timer(1000 / 60,60 * config.times);
        //添加计时帧事件
        this.Timer.addEventListener(egret.TimerEvent.TIMER,this.countTimer,this);
        this.Timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerEnd,this);
        this.Timer.start()
        //显示时间
        this.timerText.text = this.second + ":" + this.millisecond;
        this.timerText.textColor = 0xffffff;
        this.timerText.fontFamily = "微软雅黑";
        this.timerText.size = 30;
        this.timerText.x = this.stageW / 2 - this.timerText.width / 2+10;
        this.timerText.y = this.stageH* 0.12;
        this.addChild(this.timerText)
        //初始化游戏盘
        this.init();
        this.offsetWidth = (this.stage.stageWidth - this.animalBox.width) / 2;
        this.boxMask.width = this.stage.stageWidth;
        this.successTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.isSuccess,this);
        
     }
    //切换音乐
    private changeMusic(){
        if(this.musicStatus){
            this.musicBtn.stop();
            this.musicStatus = false;
        }else{
            this.musicBtn.play();
            this.musicStatus=  true;
        }
    }
    //计时器
    private  countTimer(){
        this.millisecond--;
        if(this.millisecond<0){
            this.second--;
            this.millisecond = 59;
        }
        this.timerText.text =this.second+":"+this.millisecond;
    }
    //时间结束
    private  timerEnd(){
        this.status = 'failure';
        this.grade =1;
        this.removeChild(this.smallPic);
        this.animalBox.removeChildren();
        this.imageShow = [];
        this.placeSite = [];
        this.newInageShow = [];
        this.successIndex = 0;
        this.gameOver();
    }
    //游戏结束
    private gameOver(){
        this.animalBox.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this);
       // this.animalBox.removeEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
        
        var cost = config.times - this.second;
        var rate = this.second+20;
        if(rate>100){
            rate = 100;
        }
        switch(this.status) {
            case 'succ':
                var texture = 'suc_png';
                var textCtn = '您花了' + cost + '秒，完成拼图击败了全国' + rate +'%的人';
                break;
            case 'failure':
                var texture = 'not_png';
                var textCtn = '未能在'+config.times+'秒内完成所有拼图完,成所有拼图即可参与抽奖';
                break;
        }
        //游戏结束背景
        if(!this.gameOverPic){
            this.gameOverPic = new egret.Bitmap();
            this.gameOverPic.texture = RES.getRes(texture);
            this.gameOverPic.width = this.stage.stageWidth * 0.7;
            this.gameOverPic.height = this.gameOverPic.height * 0.7;
            this.gameOverPic.x = this.stage.stageWidth / 2 - this.gameOverPic.width / 2;
            this.gameOverPic.y = 200;
            
            this.addChild(this.gameOverPic);
        }
        this.gameOverPic.texture = RES.getRes(texture);
        if(!this.contentText){
            this.contentText = new egret.TextField();
            this.contentText.width = this.stageW*0.7;
            this.contentText.height = 100;
            this.contentText.lineSpacing = 1.5;
            this.contentText.textAlign = egret.HorizontalAlign.CENTER;;
            this.contentText.size = 22;
            this.contentText.y = this.gameOverPic.y + 20 + this.gameOverPic.height;
            this.contentText.x = this.stage.stageWidth / 2 - this.contentText.width / 2;
            this.addChild(this.contentText)
        }
        this.contentText.text = textCtn;
        if(this.animalBox.parent!=null){
            this.animalBox.parent.removeChild(this.animalBox);
            
        }
        if(this.smallPic.parent!=null){
            this.removeChild(this.smallPic);
        }
        var _this = this;
        setTimeout(function(){
            _this.skipGift()  
        },2000)
    }
    //跳转至抽奖
    private skipGift(){
        var socre = this.grade;
        var form = document.createElement('form');
        var input = document.createElement('input');
        form.action = config.submitUrl;
        form.method = 'POST';
        input.type = 'hidden';
        input.name = 'score';
        input.value = ''+socre+'';
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
    }
  
   
   
    private init() {
        var grade = this.grade;
      /*  egret.log("init:",this.grade)*/
        switch(grade) {
            case 1: this.splitRow = 2; this.animalName = 'animal' + grade + "_jpg"; break;
            case 2: this.splitRow = 3; this.animalName = 'animal' + grade + "_jpg"; break;
            case 3: this.splitRow = 3; this.animalName = 'animal' + grade + "_jpg"; break;
            case 4: this.splitRow = 4; this.animalName = 'animal' + grade + "_jpg"; break;
            case 5: this.splitRow = 5; this.animalName = 'animal' + grade + "_jpg"; break;
        }
/*        egret.log('行数',this.grade,this.splitRow)*/
        //设置右下角小图
        this.smallPic = new egret.Bitmap();
        this.smallPic.texture = RES.getRes(this.animalName);
        this.smallPic.width = this.smallPic.width*0.3;
        this.smallPic.height = this.smallPic.height*0.3;
        this.smallPic.x = 20;
        this.smallPic.y = this.stageH - this.smallPic.height-20;
        this.addChild(this.smallPic);
        //建立拼图盘
        this.animalBox = new egret.Sprite()
        this.thumbnail = new egret.Bitmap();
        this.thumbnail.texture = RES.getRes(this.animalName);
        this.thumbnail.width = 500;
/*        egret.log('this.thumbnail.width:',this.thumbnail.width)*/
        var len = this.thumbnail.width / this.splitRow * 0.7;
        var len2 = Math.floor(this.thumbnail.width / this.splitRow);
        this.animalBox.graphics.beginFill(0xFFC9D3,1);
        this.animalBox.graphics.drawRect(len * i,j * len,this.thumbnail.width * 0.7,this.thumbnail.width * 0.7);
        this.animalBox.graphics.endFill();
        this.animalBox.x = this.stageW / 2 - this.animalBox.width / 2;
        this.animalBox.y = this.stageH*0.18 ;
/*        egret.log('len',len,len2,this.animalName)*/
        this.boxMask = new egret.Shape();
        this.boxMask.graphics.beginFill(0xFFC9D3);
        this.boxMask.graphics.drawRect(len * i,j * len,this.thumbnail.width * 0.7,this.thumbnail.width * 0.7);
        this.boxMask.graphics.endFill();
        this.boxMask.x = this.stageW / 2 - this.animalBox.width / 2;;
        this.boxMask.y = this.stageH * 0.18;
        this.animalBox.mask = this.boxMask;
     //   this.addChild(this.animalBox);
        this.addChild(this.boxMask);
        //分割图片
        for(var i = 0;i < this.splitRow;i++) {
            for(var j = 0;j < this.splitRow;j++) {
                var Rectangle = new egret.Rectangle(len2 * i,j * len2,len2,len2)
                var renderTexture = new egret.RenderTexture();
                var animalBody = new utills.animalBody();

                renderTexture.drawToTexture(this.thumbnail,Rectangle);
                animalBody.texture = renderTexture;
                /*egret.log('animalBody.texture:',animalBody)*/
                //图片之间的缝隙
                var gapouter = 6;
                var gapinner = 3;
                animalBody.height = (this.animalBox.width - gapouter * 2 - gapinner * (this.splitRow - 1)) / this.splitRow;
                animalBody.width  = (this.animalBox.width - gapouter * 2 - gapinner * (this.splitRow - 1)) / this.splitRow;
                var len3 = animalBody.width;
                //把位置储存起来,并且新增x_place属性保存原有位置信息
                if(i == 0 && j == 0) {
                    this.placeSite.push({
                        x: animalBody.x = animalBody.x_place = len3 * i + gapouter,
                        y: animalBody.y = animalBody.y_place = len3 * j + gapouter
                    });
                } else {
                    this.placeSite.push({
                        x: animalBody.x = animalBody.x_place = len3 * i + gapinner * (i) + gapouter,
                        y: animalBody.y = animalBody.y_place = len3 * j + gapinner * (j) + gapouter
                    });
                }

                this.animalBox.addChild(animalBody);
                this.imageShow.push(animalBody);
              
            }
        }
        this.changeOrder();
       
    }
    private changeOrder() {
        var tempList = [];
        //把图片复制给一个临时数组
        for(var i = 0,length = this.imageShow.length;i < length;i++) {
            tempList[i] = this.imageShow[i]
        }
        //通过临时数组打乱图片顺序
        for(var i = 0,length = tempList.length;i < length;i++) {
            this.newInageShow[i] = tempList.splice(Math.ceil(Math.random() * tempList.length) - 1,1)[0];

        }
        //给新图片顺序重新设置位置
        for(var j = 0,length = this.placeSite.length;j < length;j++) {
            this.animalBox.addChild(this.newInageShow[j])
            this.newInageShow[j].x = this.placeSite[j].x;
            this.newInageShow[j].y = this.placeSite[j].y;
       /*     egret.log(this.newInageShow[j].x,this.newInageShow[j].y)*/
            this.newInageShow[j].touchEnabled = true;
            this.newInageShow[j].addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchStart,this);
            //检索乱序后的图片存在多少符合正确位置
            if(this.isMatchPlace(this.newInageShow[j])) {
                this.successIndex++;
               /* console.log(this.successIndex);*/
            }
            
        }
        this.addChild(this.animalBox);
        /*egret.log("this.animalBox:",this.animalBox)
        
        egret.log("this:",this)*/


    }

    private isMatchPlace(obj) {
        if(obj.x == obj.x_place && obj.y == obj.y_place) {
            return true;
        }
        return false;
    }
    private touchStart(e) {
        if(!Main.touchStatus) {
            return;
        }
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
        e.target.parent.setChildIndex(e.target,-1);
        //储存目前图片的临时位置，用于复位或交互
        this.tempSite = { x: e.target.x,y: e.target.y,x_place: e.target.x_place,y_place: e.target.y_place };
        //储存目前需要操作的图片，方便操作
        this.tempImage = e.target;
        this.tempImage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchStart,this);
        for(var i = 0;i < this.newInageShow.length;i++) {
            if(this.newInageShow[i] != e.target) {
                this.newInageShow[i].touchEnabled = false;
            }
        }
        this.moveX = e.stageX;
        this.moveY = e.stageY;
        this.animalBox.touchEnabled = true;
        this.animalBox.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this);
    }
    private touchMove(e) {
        var diffX = e.stageX - this.moveX;
        var diffY = e.stageY - this.moveY;
        this.tempImage.x = this.tempImage.x + diffX;
        this.tempImage.y = this.tempImage.y + diffY;
        this.moveX = e.stageX;
        this.moveY = e.stageY;
        var width = this.animalBox.width;
        var height = this.animalBox.height;
        if(e.stageY <= this.stageH * 0.18 || e.stageY >= this.stageH * 0.18 + height || e.stageX < this.offsetWidth || e.stageX > width + this.offsetWidth) {
            this.tempImage.x = this.tempSite.x;
            this.tempImage.y = this.tempSite.y;
        }
    }
    private touchEnd(e) {
        for(var i = 0;i < this.newInageShow.length;i++) {
            this.newInageShow[i].touchEnabled = true;

        }
        this.swapBody(this.tempImage);
        this.animalBox.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
    }
    static touchStatus = true;
    private listArea = [];//需要计算面积的区域
    private swapBody(obj) {//核心
        for(var i = 0;i < this.newInageShow.length;i++) {
            var targetObj = this.newInageShow[i]
            //排除本身
            if(targetObj != obj) {
                //找到符合大小的区域
                if(targetObj.x < obj.x + obj.width / 1.2 && targetObj.x > obj.x - obj.width / 1.2 && targetObj.y < obj.y + obj.height / 1.2 && targetObj.y > obj.y - obj.height / 1.2) {
                    this.listArea.push(targetObj);
                   }
               }
        }
        if(this.listArea.length>0){
            //计算最大的区域
            var targetObj :any= this.calculateArea(obj);
            //移动位置前
            if(this.isMatchPlace(this.tempSite)) {
                this.successIndex--;
            }
            if(this.isMatchPlace(targetObj)) {
                this.successIndex--;
            }
          
            var tempX  = targetObj.x;
            var tempY  = targetObj.y;
            var temp2X = this.tempSite.x;
            var temp2Y = this.tempSite.y;
            /*this.tempTargetSite.x = targetObj.x = this.tempSite.x;
            this.tempTargetSite.y = targetObj.y = this.tempSite.y;*/
            this.tempTargetSite = { x: this.tempSite.x,y: this.tempSite.y,x_place: targetObj.x_place,y_place: targetObj.y_place };
            egret.Tween.get(targetObj).to({
                x: temp2X,y: temp2Y
            },200).call(
                function(){
                    Main.touchStatus = true;
                }    
            )
            egret.Tween.get(obj).to({
              x: tempX,y: tempY
            },200).call(
                function() {
                    Main.touchStatus = true;
                }
            )
            this.tempSite.x/* = obj.x */= tempX;
            this.tempSite.y/*= obj.y*/ = tempY;
            //移动位置后
            if(this.isMatchPlace(this.tempSite)) {
                this.successIndex++;
            }
            if(this.isMatchPlace(this.tempTargetSite)) {
                this.successIndex++;
            }
//             egret.log(this.successIndex);
            this.successTimer.start()
            Main.touchStatus = false;
            this.tempImage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchStart,this);
            return;
        }else{
            if(obj.x < 0 || obj.x > this.animalBox.width || obj.y < 0 || obj.y > this.animalBox.height) {
                obj.x = this.tempSite.x;
                obj.y = this.tempSite.y;
            }
        }
        this.tempImage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchStart,this);
        obj.x = this.tempSite.x;
        obj.y = this.tempSite.y;

    }
    private calculateArea(obj){
        var sum = 0; 
        var max = 0;
        var target;
        var maxTarget;
        var height;
        var width;
        for(var  i =0;i<this.listArea.length;i++){
            target = this.listArea[i];
            width = obj.width -  Math.abs(target.x-obj.x);
            height= obj.height- Math.abs(target.y -obj.y);
            sum = height * width;
            if(sum>max){
                max = sum;
                maxTarget = target;
            }
         }
         this.listArea = [];
         return maxTarget;
    }
    //判断是否拼图成功
    private isSuccess() {
        if(this.successIndex == Math.pow(this.splitRow,2)) {
            this.animalBox.removeChildren();
            this.removeChild(this.smallPic);
            this.imageShow = [];
            this.placeSite = [];
            this.newInageShow = [];
            this.successIndex = 0;
            if(this.animalBox.parent){
                this.removeChild(this.animalBox);
            }
            if(this.grade >= this.sumGrade) {
                this.Timer.stop();
                this.status = 'succ';
                this.gameOver();
                return;
            }
            this.grade++;
            this.init()
        }
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:Array<any>):void {
        var self:any = this;

        var parser:egret.HtmlTextParser = new egret.HtmlTextParser();
        var textflowArr:Array<Array<egret.ITextElement>> = [];
        for (var i:number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield:egret.TextField = self.textfield;
        var count:number = -1;
        var change:Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 200);
            tw.wait(2000);
            tw.to({"alpha": 0}, 200);
            tw.call(change, self);
        };

        change();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }
}


