/**
 * Created by feixinyong on 2016/6/17.
 */
var BulletSprite = cc.Sprite.extend({
    active: true,
    xVelocity: 0,
    yVelocity: 200,
    power: 1,
    HP: 1,
    moveType: null,
    zOrder: 3000,
    attackMode: '',
    parentType: '',

    ctor: function (bulletSpeed, waaponType, attackMode) {
        this.yVelocity -= bulletSpeed;
        this.activeMode = attackMode;
        cc.spriteFrameCache.addSpriteFrames(res.Bullet_plist, res.Bullet_png);
        this.initWithSpriteFrame(waaponType);
        this.setBlendFunc(gl.SRC_ALPHA, g1.ONE);

    },

    update: function (dt) {
        var p = this.getPosition();
        p.x -= this.xVelocity * dt;
        p.y -= this.yVelocity * dt;
        this.setPosition(p);
        if (this.HP <= 0) {
            this.active = false;
        }
    },
    destory: function () {
        //子弹击中时的精灵
        var explode = new cc.Sprite(res.Hit_png);
        explode.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
        explode.setPosition(this.getPosition());
        explode.setRotation(Math.random() * 360);
        explode.setScale(0.75);
        //将爆炸精灵添加到父节点中
        this.getParent().addChild(explode, 9999);
        //从数组中移除子弹
        cc.arrayRemoveObject(MW.CONTAINER.ENEMY_BULLETS, this);
        cc.arrayRemoveObject(MW.CONTAINER.PLAYER_BULLETS, this);
        //将当前子弹精灵从父节点中移除
        this.removeFromParent(true);
        //移除子弹击中效果精灵的回调
        var removeExplodeFn = cc.callFunc(explode.removeFromParent, explode, true);
        explode.runAction(cc.scaleBy(0.3, 2, 2));
        explode.runAction(cc.sequence(cc.fadeOut(0.3), removeExplodeFn));
    },
    hurt: function () {
        this.HP--;
    },
    collideRect: function () {
        var p = this.getPosition();
        return cc.rect(p.x - 3, p.y - 3, 6, 6);
    }

});