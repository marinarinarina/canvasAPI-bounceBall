var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
function createBall(x, y, radius, color) {
    var _a = [x, y, radius, color], _x = _a[0], _y = _a[1], _radius = _a[2], _color = _a[3];
    var draw = function () {
        ctx.beginPath();
        ctx.arc(_x, _y, _radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = _color;
        ctx.fill();
    };
    return { draw: draw };
}
var ball = createBall(100, 100, 25, 'blue');
ball.draw();
