function throttle(fn, delay) {
    var wait = false;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!wait) {
            wait = true;
            fn.apply(void 0, args);
            setTimeout(function () { return (wait = false); }, delay);
        }
    };
}
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var animationFrame;
var ball = createBall(100, 100, 5, 2, 25, 'blue');
setSize();
function setSize() {
    canvas.height = innerHeight;
    canvas.width = innerWidth;
}
function createBall(cx, cy, vx, vy, radius, color) {
    var _a = [cx, cy, vx, vy, radius, color], _cx = _a[0], _cy = _a[1], _vx = _a[2], _vy = _a[3], _radius = _a[4], _color = _a[5];
    var getRadius = function () { return _radius; };
    var getCoordinate = function () { return [_cx, _cy]; };
    var setCoordinate = function () {
        _cx += _vx;
        _cy += _vy;
    };
    var getVelocity = function () { return [_vx, _vy]; };
    var setVelocity = function (velX, velY) {
        var _a;
        _a = [velX, velY], _vx = _a[0], _vy = _a[1];
    };
    var draw = function () {
        ctx.beginPath();
        ctx.arc(_cx, _cy, _radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = _color;
        ctx.fill();
    };
    return {
        getRadius: getRadius,
        getCoordinate: getCoordinate,
        setCoordinate: setCoordinate,
        getVelocity: getVelocity,
        setVelocity: setVelocity,
        draw: draw,
    };
}
function checkBoundary(_a, _b, radius) {
    var cx = _a[0], cy = _a[1];
    var vx = _b[0], vy = _b[1];
    if (cy + vy > canvas.height - radius || cy + vy < radius) {
        ball.setVelocity(vx, -vy);
    }
    if (cx + vx > canvas.width - radius || cx + vx < radius) {
        ball.setVelocity(-vx, vy);
    }
}
function play() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    ball.setCoordinate();
    checkBoundary(ball.getCoordinate(), ball.getVelocity(), ball.getRadius());
    animationFrame = requestAnimationFrame(play);
}
canvas.addEventListener('mouseover', function (e) {
    animationFrame = requestAnimationFrame(play);
});
canvas.addEventListener('mouseout', function (e) {
    cancelAnimationFrame(animationFrame);
});
addEventListener('resize', function () { return throttle(setSize, 200); });
ball.draw();
