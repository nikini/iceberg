// Set the animation frame, if not existent (to cancel the warning)
global.requestAnimationFrame = function requestAnimationFrame(callback) {
	setTimeout(callback, 0);
};
