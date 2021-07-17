let PointCurve = {};

PointCurve.quadraticCurve = {
    curve: (x) => {
        return Math.sin(x * Math.PI * 2) / 2 + 0.5
    },
    transform: (data) => {
        return [data[1] > PointCurve.quadraticCurve.curve(data[0]) ** 2 ? 1 : 0]
    }
}

try {
    module.exports = PointCurve
} catch (e) {}