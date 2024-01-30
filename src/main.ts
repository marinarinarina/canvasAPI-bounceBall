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

const title = document.querySelector('.title') as HTMLElement;
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const balls: ReturnType<typeof createBall>[] = [];

setSize();
requestAnimationFrame(play);

canvas.addEventListener('click', (e) => {
	title.style.visibility = 'hidden';
	balls.push(
		createBall({
			centerX: e.clientX,
			centerY: e.clientY,
			velocityX: 5,
			velocityY: 2,
			bounciness: 0.99,
			accelerationVertical: 0.25,
			radius: getRandomNumber(1, 100),
			color: getRandomColor(),
		})
	);
});

addEventListener('resize', () => throttle(setSize, 200));

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

function setSize() {
	canvas.height = innerHeight;
	canvas.width = innerWidth;
}

function getRandomNumber(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
	let hexSet = '0123456789ABCDEF';
	let finalHexString = '#';
	for (let i = 0; i < 6; i++) {
		finalHexString += hexSet[Math.ceil(Math.random() * 15)];
	}
	return finalHexString;
}

function createBall(props: ballProps) {
	let { centerX, centerY, velocityX, velocityY, bounciness, accelerationVertical, radius, color } = props;

	const setCoordinate = () => {
		centerX += velocityX;
		centerY += velocityY;
	};

	const bounce = () => {
		velocityY *= bounciness;
		velocityY += accelerationVertical;
	};

	const checkCollision = () => {
		if (centerY + velocityY > canvas.height - radius || centerY + velocityY < radius) {
			velocityY = -velocityY;
		}

		if (centerX + velocityX > canvas.width - radius || centerX + velocityX < radius) {
			velocityX = -velocityX;
		}
	};

	const draw = () => {
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fillStyle = color;
		ctx.fill();
	};

	return {
		setCoordinate,
		bounce,
		checkCollision,
		draw,
	};
}

function clearCanvas() {
	ctx.fillStyle = 'rgb(255 255 255 / 30%)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function play() {
	clearCanvas();

	balls.forEach((ball) => {
		ball.draw();
		ball.setCoordinate();
		ball.bounce();
		ball.checkCollision();
	});

	requestAnimationFrame(play);
}
