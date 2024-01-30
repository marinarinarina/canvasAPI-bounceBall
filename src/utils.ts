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

export { throttle };
