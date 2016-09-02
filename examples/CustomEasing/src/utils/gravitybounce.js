var Utils;
(function (Utils) {
    var GravityBounce = (function () {
        // -------------------------------------------------------------------------
        function GravityBounce(aBounces, aElasticity, aHalveFirstBounce) {
            if (aElasticity === void 0) { aElasticity = -1.0; }
            if (aHalveFirstBounce === void 0) { aHalveFirstBounce = true; }
            // duration of particular bounces
            // private _bounceDuration: Array<number> = [];
            // or
            this._bounceDuration = [];
            // height of particular bounces
            this._bounceHeight = [];
            // bounce velocity
            this._bouceVelocity = [];
            // check parameters validity - either bounces or elasticity must be grater than zero
            if (aBounces <= 0 && aElasticity < 0.0) {
                console.log("Invalid parameters (aBounces = " + aBounces + ", aElasticity = " + aElasticity + ")");
                return;
            }
            // calculate missing parameters
            // if defined bounces but not elasticity
            /*
                If we know the number of bounces and elasticity is unknown we have to calculate it.
                It will have such a value that after requested number of bounces the potential next bounce would
                had its height less or equal to EPSILON. It comes from calculation:

                EPSILON = elasticity ^ bounces
                elasticity = (EPSILON) ^ (1 / bounces)
            */
            if (aBounces > 0 && aElasticity < 0.0) {
                aElasticity = Math.pow(GravityBounce.EPSILON, 1.0 / aBounces);
            }
            else if (aElasticity > 0.0 && aBounces <= 0) {
                // if defined elasticity but not bounces
                if (aElasticity >= 1.0) {
                    console.log("Elasticity must be less than 1");
                    return;
                }
                // EPSILON = elasticity ^ bounces ... aBounces = log_elasticity(EPSILON) = ln EPSILON / ln elasticity
                aBounces = Math.floor(Math.log(GravityBounce.EPSILON) / Math.log(aElasticity));
                aBounces = Math.min(aBounces, GravityBounce.BOUNCES_MAX);
            }
            // get "some" acceleration and calculate time for bounces
            var acceleration = GravityBounce.EPSILON;
            var totalDuration = 0.0;
            var height = 1.0;
            for (var i = 0; i < aBounces; i++) {
                // s = 1/2 a * t^2 ... 2s / a = t^2 ... sqrt(2s / a) = t
                var duration = Math.sqrt(2 * height / acceleration) * 2;
                if (aHalveFirstBounce && i == 0)
                    duration /= 2;
                this._bounceDuration[i] = duration;
                this._bounceHeight[i] = height;
                totalDuration += duration;
                height *= aElasticity;
            }
            for (var i = 0; i < aBounces; i++) {
                var duration = this._bounceDuration[i] / totalDuration;
                this._bounceDuration[i] = duration;
            }
            // calculate new acceleration
            var firstHalfBounceDuration = aHalveFirstBounce ? this._bounceDuration[0] : this._bounceDuration[0] / 2;
            // s = 1/2 a * t^2 ... 2s / t^2 = a
            this._acceleration = 2.0 / (firstHalfBounceDuration * firstHalfBounceDuration);
            for (var i = 0; i < aBounces; i++) {
                // v = v0 + at ... on the top of bounce the v equals zero => v0 = -at
                // if bounce starts halved (on top) than its initial velocity is zero
                // halve duration of each bounce (as it contains the way up and down)
                if (i == 0 && aHalveFirstBounce)
                    this._bouceVelocity[i] = 0.0;
                else
                    this._bouceVelocity[i] = this._bounceDuration[i] / 2.0 * this._acceleration;
            }
            // change the sign of acceleration to point downwards
            this._acceleration = -this._acceleration;
            // debug output
            /*
                LOGD("Bounces: %i, Elasticity: %f, Acceleration: %f, Duration: %f, HalveFirstBounce %s",
                    mBounces, mElasticity, mAcceleration, mDuration, mHalveFirstBounce ? "true" : "false");
                for (s32 i = 0; i < mBounces; i++)
                {
                    LOGD("Bounce %i: height = %f, duration = %f, velocity = %f",
                    i, mBounceHeight[i], mBounceDuration[i], mBouceVelocity[i]);
                }
            */
            // store parameters
            this._bounces = aBounces;
            this._elasticity = aElasticity;
            this._halveFirstBounce = aHalveFirstBounce;
        }
        // -------------------------------------------------------------------------
        GravityBounce.prototype.easing = function (aDurationProgress) {
            var index = 0;
            var totalDuration = 0.0;
            while (index < this._bounces && aDurationProgress > totalDuration + this._bounceDuration[index]) {
                totalDuration += this._bounceDuration[index];
                ++index;
            }
            // security check if we are not beyond last entry
            if (index >= this._bounces)
                return 0;
            // get duration within bounce (if not the first one)
            aDurationProgress = aDurationProgress - totalDuration;
            var height = 0.0;
            if (index == 0 && this._halveFirstBounce) {
                // height = height + 1/2 * mAcceleration * aDurationProgress^2
                height = 1.0 + this._acceleration * (aDurationProgress * aDurationProgress) / 2.0;
            }
            else {
                // height = mBounceVelocity * aDurationProgress + 1/2 * mAcceleration * aDurationProgress^2
                // height = aDurationProgress * (mBounceVelocity + 1/2 * mAcceleration * aDurationProgress)
                height = aDurationProgress * (this._bouceVelocity[index] + (this._acceleration * aDurationProgress) / 2.0);
            }
            //LOGD("height = %f", height / INTERNAL_HEIGHT);
            return height;
        };
        // const
        GravityBounce.EPSILON = 1.0 / 1000.0;
        GravityBounce.BOUNCES_MAX = 10;
        return GravityBounce;
    })();
    Utils.GravityBounce = GravityBounce;
})(Utils || (Utils = {}));
//# sourceMappingURL=gravitybounce.js.map