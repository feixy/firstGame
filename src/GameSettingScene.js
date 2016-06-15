/**
 * Created by feixinyong on 2016/6/15.
 */
var GameSettingLayer = cc.Layer.extend({
    ctor: function () {
        var winSize = cc.winSize;
        this._super();
        //背景精灵
        var bgSprite = new cc.Sprite(res.Loading_png);
        bgSprite.setAnchorPoint(cc.p(0, 0));
        this.addChild(bgSprite, 0, 1);
        //”设置“ 标题
        var texture = cc.textureCache.addImage(res.MenuTitle_png);
        var titleSprite = new cc.Sprite(texture, cc.rect(0, 0, 134, 34));
        titleSprite.setPosition(cc.p(winSize.width / 2, winSize.height - 120));
        this.addChild(titleSprite, 0, 2);

        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(18);
        var title1 = new cc.MenuItemFont("声音");
        title1.setEnabled(false);

        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(26);
        var item1 = new cc.MenuItemToggle(new cc.MenuItemFont("开"), new cc.MenuItemFont("关"));
        item1.setCallback(this.soundControl, this);


        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(18);
        var title2 = new cc.MenuItemFont("模式");
        title2.setEnabled(false);

        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(26);
        var item2 = new cc.MenuItemToggle(new cc.MenuItemFont("简单"),
            new cc.MenuItemFont("容易"), new cc.MenuItemFont("困难"));
        item2.setCallback(this.modeControl, this);


        var goBackLabel = new cc.LabelTTF("返回", "Arial", 20);
        var goBackMenuItem = new cc.MenuItemLabel(goBackLabel, this.backCallback, this);
        goBackMenuItem.setScale(0.8);

        var menu = new cc.Menu(title1, title2, item1, item2, goBackMenuItem);
        menu.alignItemsInColumns(2, 2, 1);
        this.addChild(menu);
        return true;

    },

    /**
     * 设置声音开关
     */
    soundControl: function () {

    },
    soundControl: function () {

    },
    backCallback: function () {
        cc.director.popScene();
    },

});

var GameSettingScene = cc.Scene.extend({
        ctor: function () {
            this._super();
            var layer = new GameSettingLayer();
            this.addChild(layer);
            return true;
        }
    }
);