/**
 * Created by feixinyong on 2016/6/15.
 */
var AboutLayer = cc.Layer.extend({
    ctor: function () {
        var winSize = cc.winSize;
        this._super();
        //背景精灵
        var bgSprite = new cc.Sprite(res.Loading_png);
        bgSprite.setAnchorPoint(cc.p(0, 0));
        this.addChild(bgSprite, 0, 1);
        //添加纹理缓存
        var texture = cc.textureCache.addImage(res.MenuTitle_png);
        //从纹理中创建精灵
        var titleSprite = new cc.Sprite(texture, cc.rect(0, 36, 100, 34));
        titleSprite.setPosition(cc.p(winSize.width / 2, winSize.height - 60));
        this.addChild(titleSprite, 1, 100);

        var about = new cc.LabelTTF(" 游戏主角是一架二战时期的老式轰炸机，在迷失航线后穿越宇宙、穿越时空，与敌人激战的同时躲避虚拟时空里的生物和小行星。另类的圆珠笔手绘风格界面和发生在奇幻坐标纸上的战斗给玩家带来耳目一新、超乎想象的个性体验。不过，你的火力可不大，能不能干掉敌人的同时躲过小行星的碰撞就看你的飞行技巧了。 \n", "Arial", 14, cc.size(winSize.width * 0.85, 320), cc.TEXT_ALIGNMENT_LEFT);
        about.setPosition(cc.p(winSize.width / 2, winSize.height / 2 - 20));
        about.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(about);

        //创建返回按钮菜单
        var goBackLabel = new cc.LabelTTF("返回", "Arial", 14);
        var goBackMenuItem = new cc.MenuItemLabel(goBackLabel, this.goBackCallback, this);
        var mu = new cc.Menu(goBackMenuItem);
        mu.setPosition(cc.p(winSize.width / 2, 40));
        this.addChild(mu);

        return true;
    },
    /**
     * 返回菜单
     */
    goBackCallback: function () {
        cc.director.popScene();
    }
});


var AboutScene = cc.Scene.extend({

    ctor: function () {
        this._super();
        cc.log("AboutScene init");
        this.addChild(new AboutLayer());
        return true;
    },
    onExit: function () {
        cc.log("AboutScene OnExit");
        this._super();
    },

    onEnter: function () {
        this._super();
        cc.log("AboutScene onEnter");
    },
    onEnterTransitionDidFinish: function () {
        cc.log("AboutScene onEnterTransitionDidFinish");
        this._super();
    },
    onExitTransitionDidStart: function () {
        cc.log("AboutScene onExitTransitionDidStart");
        this._super();
    }

});