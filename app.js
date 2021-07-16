let Network = require("./network.js")
let generator = require("./generator.js")

let network = new Network([3, 5, 3]);

let data = [...Array(10)].map(() => {
    return generator(10000)
})

for (let d = 1; d < data.length; d ++) {
    activations = network.muchBackPropagation(data[d][0], data[d][1], 1)
    let cost0 = network.muchCostWithActivations(activations, data[d][1])
    let cost1 = network.muchCost(data[0][0], data[0][1])
    console.log("-----costs-----")
    console.log(Math.round(cost0 * 10000), Math.round(cost1 * 10000))
}
