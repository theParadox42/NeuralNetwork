function Generator(amount, inputSize, func) { 
    let data = [[], []]
    for (let i = 0; i < amount; i ++) {
        let input = [...Array(inputSize)].map(() => {
            return Math.random()
        })
        data[0].push(input)
        data[1].push(func.transform(input))
    }
    return data
}

try {
    module.exports = Generator
} catch (e) {}