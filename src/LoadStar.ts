/**
 *
 * @author S
 * 
 * 名称：LoadStar.ts
 * 摘要：加载界面2
 *
 */

class CLoadStar extends egret.Sprite 
{
    private star :egret.Bitmap;
    private starTex:egret.Texture[]=[];

    public constructor() 
    {
        super();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/load.config.json","resource/");
        //RES.getResAsync("loadstar_json",this.createView,this);
    }
    private onConfigComplete()
    {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,this.onItemLoadError,this);
        RES.loadGroup("preloadsload");
    }
    private onResourceLoadComplete(event: RES.ResourceEvent): void 
    {
        if(event.groupName == "preloadsload") 
        {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,this.onItemLoadError,this);
            this.createView();
        }
    }
    private onItemLoadError(event: RES.ResourceEvent): void 
    {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    private onResourceLoadError(event: RES.ResourceEvent): void 
    {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    private createView(): void 
    {
        for(var i=0;i<19;++i)
        {
            var str ="loadstar_json.ls"+i.toString();
            this.starTex.push(RES.getRes(str));
        }
        this.star=new egret.Bitmap(this.starTex[0]);
        this.addChild(this.star);
        this.star.anchorOffsetX=this.star.width/2;
        this.star.anchorOffsetY=this.star.height/2;
        this.star.x=g_nStageW/2;
        this.star.y=g_nStageH/2;
        egret.startTick(this.starRun,this);
    }
    private star_index:number=0;
    private starRun():boolean
    {
        this.star.texture=this.starTex[this.star_index++];
        if(this.star_index>18)
            this.star_index=0;
        return true;
    }

    public setProgress(current,total): void 
    {
        if(current==total)
            egret.stopTick(this.starRun,this);
    }
}