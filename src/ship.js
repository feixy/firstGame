/**
 * Created by feixinyong on 2016/6/17.
 */
var ShipSprite = cc.Sprite.extend({
    speed: 220,
    bulletSpeed: 900,
    HP: 5,
    bulletTypeValue: 1,
    bulletPowerValue: 1,
    throwBombing: false,
    canBeAttack: true,
    isThrowingBomb: false,
    zOrder: 3000,
    maxBulletPowerValue: 4,
    appearPosition: cc.p(160, 60),
    _hurtColorLife: 0,
    active: true,

    ctor: function () {
        var shipTexture = cc.textureCache.addImage(res.Ship01_png);
        this.initWithTexture(shipTexture, cc.rect(0, 0, 60, 38));
        this.setTag(this.zOrder);
        this.setPosition(this.appearPosition);

        var frame0 = new cc.SpriteFrame(shipTexture, cc.rect(0, 0, 60, 38));
        var frame1 = new cc.SpriteFrame(shipTexture, cc.rect(60, 0, 60, 38));

        var animFrames = [];
        animFrames.push(frame0);
        animFrames.push(frame1);

        var shipAnimation = new cc.Animation(animFrames, 0.1);
        var animte = cc.animate(shipAnimation);
        this.runAction(cc.repeatForever(animte));
        this.schedule(this.shoot, 1 / 6);
    },

    destroy: function () {
        MW.LIFE--;
        var p = this.getPosition();
        var parent = this.getParent();
        parent.addChild(new Explosion(p));
        parent.removeChild(this, true);
        if (MW.SOUND) {
            CC.audit.playEffect();
        }
    },

    hurt: function () {
        if (this.canBeAttack) {
            this._hurtColorLife = 2;
            this.HP--;
            this.setColor(cc.red());
        }
    },
    collideRect: function () {
        var p = this.getPosition();
        var a = this.getContentSize;
        var r = new cc.rect(p.x - a.width / 2, p.y - a.height / 2, a.width, a.height / 2);
        return r;
    }

});