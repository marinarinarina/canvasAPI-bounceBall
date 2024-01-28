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

	const getCoordinate = () => [_cx, _cy] as const;

	const setCoordinate = () => {
		_cx += _vx;
		_cy += _vy;
	};

	const getVelocity = () => [_vx, _vy] as const;

	const setVelocity = (velX: number, velY: number) => {
		[_vx, _vy] = [velX, velY];
	};

	const checkBoundaries = () => {
		if (_cy + _vy > canvas.height - _radius || _cy + _vy < _radius) {
			vy = -vy;
		}
		if (_cx + _vx > canvas.width - _radius || _cx + _vx < _radius) {
			vx = -vx;
		}
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

function play() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ball.draw();
	ball.setCoordinate();

	const [cx, cy] = ball.getCoordinate();
	const [vx, vy] = ball.getVelocity();
	const radius = ball.getRadius();

	if (cy + vy > canvas.height - radius || cy + vy < radius) {
		ball.setVelocity(vx, -vy);
	}

	if (cx + vx > canvas.width - radius || cx + vx < radius) {
		ball.setVelocity(-vx, vy);
	}

	animationFrame = requestAnimationFrame(play);
}

canvas.addEventListener('mouseover', (e) => {
	animationFrame = requestAnimationFrame(play);
});

canvas.addEventListener('mouseout', (e) => {
	cancelAnimationFrame(animationFrame);
});

ball.draw();
