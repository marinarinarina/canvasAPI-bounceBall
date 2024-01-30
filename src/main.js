// import { coordinatePair, ballProps } from './types.d';
// import { throttle } from './utils';
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
var ball = createBall({
    centerX: 100,
    centerY: 100,
    velocityX: 5,
    velocityY: 2,
    bounciness: 0.99,
    accelerationVertical: 0.25,
    radius: 25,
    color: 'blue',
});
setSize();
function setSize() {
    canvas.height = innerHeight;
    canvas.width = innerWidth;
}
function createBall(props) {
    var centerX = props.centerX, centerY = props.centerY, velocityX = props.velocityX, velocityY = props.velocityY, bounciness = props.bounciness, accelerationVertical = props.accelerationVertical, radius = props.radius, color = props.color;
    var getRadius = function () { return radius; };
    var getCoordinate = function () { return [centerX, centerY]; };
    var setCoordinate = function () {
        centerX += velocityX;
        centerY += velocityY;
    };
    var getVelocity = function () { return [velocityX, velocityY]; };
    var setVelocity = function (velX, velY) {
        var _a;
        _a = [velX, velY], velocityX = _a[0], velocityY = _a[1];
    };
    var bounce = function () {
        velocityY *= bounciness;
        velocityY += accelerationVertical;
    };
    var draw = function () {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    };
    return {
        getRadius: getRadius,
        getCoordinate: getCoordinate,
        setCoordinate: setCoordinate,
        getVelocity: getVelocity,
        setVelocity: setVelocity,
        bounce: bounce,
        draw: draw,
    };
}
function checkCollision(_a, _b, radius) {
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
    ball.bounce();
    checkCollision(ball.getCoordinate(), ball.getVelocity(), ball.getRadius());
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
