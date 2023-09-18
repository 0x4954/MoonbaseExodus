function vAdd(a, b) {
	return {
		x: a.x + b.x,
		y: a.y + b.y
	};
}
function vSub(a, b) {
	return {
		x: a.x - b.x,
		y: a.y - b.y
	};
}
function vMul(a, b) {
	return {
		x: a.x * b.x,
		y: a.y * b.y
	};
}
function vDiv(a, b) {
	return {
		x: a.x / b.x,
		y: a.y / b.y
	};
}

function vMulN(v, n) {
	return {
		x: v.x * n,
		y: v.y * n
	}
}
function vDivN(v, n) {
	return {
		x: v.x / n,
		y: v.y / n
	}
}

export {vAdd, vSub, vMul, vDiv,  vMulN, vDivN}