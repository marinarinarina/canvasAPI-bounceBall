type coordinatePair = [number, number];

function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(fn: T, delay: number) {
	let wait = false;
	return (...args: Parameters<T>) => {
		if (!wait) {
			wait = true;
			fn(...args);
			setTimeout(() => (wait = false), delay);
		}
	};
}

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
let animationFrame: number;

const ball = createBall(100, 100, 5, 2, 25, 'blue');

setSize();

function setSize() {
	canvas.height = innerHeight;
	canvas.width = innerWidth;
}

function createBall(cx: number, cy: number, vx: number, vy: number, radius: number, color: string) {
	let [_cx, _cy, _vx, _vy, _radius, _color] = [cx, cy, vx, vy, radius, color];

	const getRadius = () => _radius;

	const getCoordinate = (): coordinatePair => [_cx, _cy];

	const setCoordinate = () => {
		_cx += _vx;
		_cy += _vy;
	};

	const getVelocity = (): coordinatePair => [_vx, _vy];

	const setVelocity = (velX: number, velY: number) => {
		[_vx, _vy] = [velX, velY];
	};

	const draw = () => {
		ctx.beginPath();
		ctx.arc(_cx, _cy, _radius, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fillStyle = _color;
		ctx.fill();
	};

	return {
		getRadius,
		getCoordinate,
		setCoordinate,
		getVelocity,
		setVelocity,
		draw,
	};
}

function checkBoundary([cx, cy]: coordinatePair, [vx, vy]: coordinatePair, radius: number) {
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

canvas.addEventListener('mouseover', (e) => {
	animationFrame = requestAnimationFrame(play);
});

canvas.addEventListener('mouseout', (e) => {
	cancelAnimationFrame(animationFrame);
});

addEventListener('resize', () => throttle(setSize, 200));

ball.draw();
