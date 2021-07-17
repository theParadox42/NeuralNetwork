let PointCurve = {};

function Curve() {
    this.equation = x => {
        return x
    }
    this.inequality = {}
    this.inequality.transform = data => {
        return [data[1] > this.equation(data[0]) ? 1 : 0]
    }
    this.verticalDistanceSquared = {}
    this.verticalDistanceSquared.transform = data => {
        return [Math.abs(data[1] - this.equation(data[0])) ** 0.5]
    }
}


PointCurve.quadratic = new Curve()
PointCurve.quadratic.equation = x => {
    return x ** 2
}

PointCurve.quadraticCos = new Curve()
PointCurve.quadraticCos.equation = x => {
    return (Math.cos(4 * Math.PI * x * x) + 1) / 2
}

try {
    module.exports = PointCurve
} catch (e) {}