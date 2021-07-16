let QuadraticData = {};

QuadraticData.aboveStandardCurve = {
    transform: (data) => {
        return [data[0] > data[1] ** 2 ? 1 : 0]
    }
}

try {
    module.exports = QuadraticData
} catch (e) {}