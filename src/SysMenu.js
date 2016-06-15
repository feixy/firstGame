/**
 * Created by feixinyong on 2016/6/15.
 */

var SysMenuLayer = cc.Layer.extend({

    ctor: function () {
        this._super()
        var winSize = cc.winSize;
        //背景图片
        var sp = new cc.Sprite(res.Loading_png);
        sp.setAnchorPoint(cc.p(0, 0));
        this.addChild(sp, 0, 1);

        //logo图片
        var logo = new cc.Sprite(res.Logo_png);
        logo.setAnchorPoint(cc.p(0, 0));
        logo.setPosition(cc.p(0, 250));
        this.addChild(logo, 10, 1);

        //newGame菜单项
        var newGameNormal = new cc.Sprite(res.Menu_png, cc.rect(0, 0, 126, 33));
        var newGameSelected = new cc.Sprite(res.Menu_png, cc.rect(0, 33, 126, 33));
        var newGameDisable = new cc.Sprite(res.Menu_png, cc.rect(0, 33 * 2, 126, 33));
        var newGameMenuItem = new cc.MenuItemSprite(newGameNormal, newGameSelected, newGameDisable, function () {
            cc.log("NewGame clicked!");
        }, this);

        //游戏设置菜单项
        var gameSettingNormal = new cc.Sprite(res.Menu_png, cc.rect(126, 0, 126, 33));
        var gameSettingSelected = new cc.Sprite(res.Menu_png, cc.rect(126, 33, 126, 33));
        var gameSettingDisable = new cc.Sprite(res.Menu_png, cc.rect(126, 33 * 2, 126, 33));
        var gameSettingMenuItem = new cc.MenuItemSprite(gameSettingNormal, gameSettingSelected, gameSettingDisable,
            this.onGameSettingCallback, this);
        //关于菜单项
        var aboutNormal = new cc.Sprite(res.Menu_png, cc.rect(252, 0, 126, 33));
        var aboutSelected = new cc.Sprite(res.Menu_png, cc.rect(252, 33, 126, 33));
        var aboutDisable = new cc.Sprite(res.Menu_png, cc.rect(252, 33 * 2, 126, 33));
        var aboutMenuItem = new cc.MenuItemSprite(aboutNormal, aboutSelected, aboutDisable,
            this.onAboutCallback, this);
        //根据菜单项创建菜单
        var mu = new cc.Menu(newGameMenuItem, gameSettingMenuItem, aboutMenuItem);
        mu.alignItemsVerticallyWithPadding(10);
        //设置菜单位置
        mu.setPosition(cc.p(winSize.width / 2, winSize.height / 2 - 80));
        this.addChild(mu, 1, 2);

        //重复绘制背景的小飞船
        this.scheduleUpdate(0.1);

        //创建飞船纹理
        var texture = cc.textureCache.addImage(res.Ship01_png);
        //根据纹理创建飞船精灵，提高性能
        this._ship = new cc.Sprite(texture, cc.rect(0, 45, 60, 38));
        //指定飞船在按钮的后面，防止飞船遮挡住按钮
        this.addChild(this._ship, 0, 4);
        //随机指定一个位置
        var pos = cc.p(Math.random() * winSize.width, 0);
        this._ship.setPosition(pos);
        this._ship.runAction(
            cc.moveBy(2, cc.p(Math.random() * winSize.width, pos.y + winSize.height + 100))
        );

        //播放背景音乐
        cc.audioEngine.playMusic(res.MainBgMusic, true);
        cc.audioEngine.setMusicVolume(0.7);
        return true;
    },

    update: function (dt) {
        var winSize = cc.winSize;
        //判断飞船是否超过屏幕外面,如果飞船飞出屏幕，则开始下一个动作
        //这里获取飞船有精灵有2种方式，
        //一种是将其保存到this的一个属性中；
        //另一种是根据tag获取
        if (this._ship.getPosition().y > 480) {
            var pos = cc.p(Math.random() * winSize.width, 0);
            this._ship.setPosition(pos);
            this._ship.runAction(
                cc.moveBy(parseInt(5 * Math.random(), 10), cc.p(Math.random() * winSize.width, pos.y + 480))
            );
        }
    },

    /**
     * 点击about菜单项后的回调函数
     */
    onGameSettingCallback: function (sender) {
        this.playButtonEffect();
        var settingScene = new GameSettingScene();
        cc.director.pushScene(new cc.TransitionFade(1.2, settingScene));
    },
    /**
     * 点击about菜单项后的回调函数
     */
    onAboutCallback: function (sender) {
        this.playButtonEffect();
        var aboutScene = new AboutScene();
        cc.director.pushScene(new cc.TransitionFade(1.2, aboutScene));
    },

    /**
     * 点击按钮后播放音效
     */
    playButtonEffect: function () {
        cc.audioEngine.playEffect(res.ButtonEffet);
    }


});

var SysMenuScene = cc.Scene.extend({

    ctor: function () {
        this._super();
        cc.log("SysMenuScene init");
        var sysMenuLayer = new SysMenuLayer();
        this.addChild(sysMenuLayer);
        return true;
    },

    onExit: function () {
        cc.log("SysMenuScene OnExit");
        this._super();
    },

    onEnter: function () {
        this._super();
        cc.log("SysMenuScene onEnter");
    },
    onEnterTransitionDidFinish: function () {
        cc.log("SysMenuScene onEnterTransitionDidFinish");
        this._super();
    },
    onExitTransitionDidStart: function () {
        cc.log("SysMenuScene onExitTransitionDidStart");
        this._super();
    }

});