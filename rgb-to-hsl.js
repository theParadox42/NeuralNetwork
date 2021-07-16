function RGBtoHSL(colorArr) {
    let r = colorArr[0]
    let g = colorArr[1]
    let b = colorArr[2]

    let min = Math.min(r, Math.min(g, b))
    let max = Math.max(r, Math.max(g, b))
    
    let L = (min + max) / 2
    let S = L > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min)
    let H = (r == max ? (g - b) / (max - min) : g == max ? 2 + (b - r) / (max - min) : 4 + (r - g) / (max - min)) / 6
    
    return [H || 0, S || 0, L]
}

try {
    module.exports = RGBtoHSL
} catch (e) { }