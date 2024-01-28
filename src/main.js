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
    var checkBoundaries = function () {
        if (_cy + _vy > canvas.height - _radius || _cy + _vy < _radius) {
            vy = -vy;
        }
        if (_cx + _vx > canvas.width - _radius || _cx + _vx < _radius) {
            vx = -vx;
        }
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
function play() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    ball.setCoordinate();
    var _a = ball.getCoordinate(), cx = _a[0], cy = _a[1];
    var _b = ball.getVelocity(), vx = _b[0], vy = _b[1];
    var radius = ball.getRadius();
    if (cy + vy > canvas.height - radius || cy + vy < radius) {
        ball.setVelocity(vx, -vy);
    }
    if (cx + vx > canvas.width - radius || cx + vx < radius) {
        ball.setVelocity(-vx, vy);
    }
    console.log(vx, vy);
    animationFrame = requestAnimationFrame(play);
}
canvas.addEventListener('mouseover', function (e) {
    animationFrame = requestAnimationFrame(play);
});
canvas.addEventListener('mouseout', function (e) {
    cancelAnimationFrame(animationFrame);
});
ball.draw();
