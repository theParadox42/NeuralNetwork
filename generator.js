

function generateColorData(amount) { 
    let data = [[], []]
    for (let i = 0; i < amount; i ++) {
        let rgb = [Math.random(), Math.random(), Math.random()]
        data[0].push(rgb)
        data[1].push(RGBtoHSL(rgb))
    }
    return data
}

try {
    module.exports = generateColorData
} catch (e) {}