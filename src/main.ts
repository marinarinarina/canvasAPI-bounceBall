type coordinatePair = [number, number];
type ballProps = {
	centerX: number;
	centerY: number;
	velocityX: number;
	velocityY: number;
	bounciness: number;
	accelerationVertical: number;
	radius: number;
	color: string;
};

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
let isRunning = false;

const ball = createBall({
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

canvas.addEventListener('mousemove', (e) => {
	if (!isRunning) {
		clearCanvas();
		ball.setInitCoordinate(e.clientX, e.clientY);
		ball.draw();
	}
});

canvas.addEventListener('click', (e) => {
	if (!isRunning) {
		animationFrame = requestAnimationFrame(play);
		isRunning = true;
	}
});

canvas.addEventListener('mouseout', (e) => {
	cancelAnimationFrame(animationFrame);
	isRunning = false;
});

addEventListener('resize', () => throttle(setSize, 200));

function setSize() {
	canvas.height = innerHeight;
	canvas.width = innerWidth;
}

function createBall(props: ballProps) {
	let { centerX, centerY, velocityX, velocityY, bounciness, accelerationVertical, radius, color } = props;

	const getRadius = () => radius;

	const getCoordinate = (): coordinatePair => [centerX, centerY];

	const setInitCoordinate = (x: number, y: number) => {
		centerX = x;
		centerY = y;
	};

	const updateCoordinate = () => {
		centerX += velocityX;
		centerY += velocityY;
	};

	const getVelocity = (): coordinatePair => [velocityX, velocityY];

	const setVelocity = (velX: number, velY: number) => {
		[velocityX, velocityY] = [velX, velY];
	};

	const bounce = () => {
		velocityY *= bounciness;
		velocityY += accelerationVertical;
	};

	const draw = () => {
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fillStyle = color;
		ctx.fill();
	};

	return {
		getRadius,
		getCoordinate,
		setInitCoordinate,
		updateCoordinate,
		getVelocity,
		setVelocity,
		bounce,
		draw,
	};
}

function checkCollision([cx, cy]: coordinatePair, [vx, vy]: coordinatePair, radius: number) {
	if (cy + vy > canvas.height - radius || cy + vy < radius) {
		ball.setVelocity(vx, -vy);
	}

	if (cx + vx > canvas.width - radius || cx + vx < radius) {
		ball.setVelocity(-vx, vy);
	}
}

function clearCanvas() {
	ctx.fillStyle = 'rgb(255 255 255 / 30%)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function play() {
	clearCanvas();
	ball.draw();
	ball.updateCoordinate();
	ball.bounce();

	checkCollision(ball.getCoordinate(), ball.getVelocity(), ball.getRadius());

	animationFrame = requestAnimationFrame(play);
}
