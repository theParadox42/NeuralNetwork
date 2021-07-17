let Curves = {};

function FunctionCurve() {
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

Curves.quadratic = new FunctionCurve()
Curves.quadratic.equation = x => {
    return x ** 2
}

Curves.quadraticCos = new FunctionCurve()
Curves.quadraticCos.equation = x => {
    return (Math.cos(4 * Math.PI * x * x) + 1) / 2
}

Curves.jump = new FunctionCurve()
Curves.jump.equation = x => {
    return x > 0.5 ? 0.2 : 0.8
}

function ImplicitCurve() {
    this.threshold = 0.5
    this.equation = (x, y) => {
        return x * y
    }
    this.inequality = {}
    this.inequality.transform = data => {
        return [this.equation(data[0], data[1]) > this.threshold]
    }
    this.gradient = {}
    this.gradient.transform = data => {
        return [this.equation(data[0], data[1])]
    }
    this.matchThreshold = {}
    this.matchThreshold.transform = data => {
        return [Math.abs(this.equation(data[0], data[1]) - this.threshold) ** 0.5]
    }
}

Curves.circle = new ImplicitCurve()
Curves.circle.threshold = 0.25
Curves.circle.equation = (x, y) => {
    const cx = 0.5, cy = 0.5
    return ((x - cx) ** 2 + (y - cy) ** 2) ** 0.5
}

Curves.lotsOfCircles = new ImplicitCurve()
// Curves.

try {
    module.exports = Curves
} catch (e) {}