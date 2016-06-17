/**
 * Created by feixinyong on 2016/6/17.
 */

var FlareEffect = function (parent, target, callback) {
    var flare = new cc.Sprite(res.Flare_png);
    flare.setBlendFunc(g1.SRC_ALPHA, g1.ONE);
    parent.addChild(flare, 10);
    flare.setOpacity(0);
    flare.setPosition(cc.p(-30, 297));
    flare.setRotation(-120);
    flare.setScale(0.2);

    var opacityAnim = cc.fadeTo(0.5, 255);
    var opacDim = cc.fadeTo(1, 0);
    var biggerAnim = cc.ScaleBy(0.7, 1.2, 1.2);
    var biggerEase = cc.easeSineOut(biggerAnim);
    var moveAnim = cc.moveBy(0.5, cc.p(328, 0));
    var easeMove = cc.easeSineOut(moveAnim);

    var rotateAnim = cc.RotateBy(2.5, 90);
    var rotateEase = cc.easeExponentialOut(rotateAnim);
    var bigger = cc.scaleTo(0.5, 1);

    var onComplete = cc.callFunc(callback, target);
    var killFlare = cc.callFunc(function () {
        this.getParent().removeChild(this, true);
    }, flare);
    flare.runAction(cc.sequence(opacityAnim, biggerEase, opacDim, killFlare, onComplete));
    flare.runAction(easeMove);
    flare.runAction(rotateEase);
    flare.runAction(bigger);
}

var removeFromParent = function (sprite) {
    sprite.removeFromParent(true);
}

var spark = function (ccpoint, parent, scale, duration) {
    scale = scale || 0.3;
    duration = duration || 0.3;
    var one = new cc.Sprite(res.Explode1_png);
    var two = new cc.Sprite(res.Explode2_png);
    var three = new cc.Sprite(res.Explode3_png);

    one.setBlendFunc(g1.SRC_ALPHA, g1.ONE);
    two.setBlendFunc(g1.SRC_ALPHA, g1.ONE);
    three.setBlendFunc(g1.SRC_ALPHA, g1.ONE);

    one.setPosition(ccpoint);
    two.setPosition(ccpoint);
    three.setPosition(ccpoint);

    parent.addChild(two);
    parent.addChild(three);

    one.setScale(scale);
    two.setScale(scale);
    three.setScale(scale);

    three.setRotation(Math.random() * 360);

    var left = cc.rotateBy(duration, -45);
    var right = cc.rotateBy(duration, 45);
    var scaleBy = cc.scaleBy(duration, 3, 3);
    var fadeOut = cc.fadeOut(duration);
    var remove = cc.callFunc(this.removeFromParent, this, true);
    var seq = cc.sequence(fadeOut, remove);
    one.runAction(left);
    two.runAction(right);

    one.runAction(scaleBy);
    two.runAction(scaleBy.clone());
    three.runAction(scaleBy.clone());

    one.runAction(seq);
    two.runAction(seq.clone());
    three.runAction(seq.clone());

}