const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

function createBall(x: number, y: number, radius: number, color: string) {
	let [_x, _y, _radius, _color] = [x, y, radius, color];

	const draw = () => {
		ctx.beginPath();
		ctx.arc(_x, _y, _radius, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fillStyle = _color;
		ctx.fill();
	};

	return { draw };
}

const ball = createBall(100, 100, 25, 'blue');
ball.draw();
