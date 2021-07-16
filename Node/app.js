let Network = require("../Scripts/network.js")
let Generator = require("../Scripts/generator.js")
// let ColorData = require("../Scripts/color-data.js")
let QuadraticData = require("../Scripts/quadratic-data.js")

let network = new Network([2, 1]);

let data = [...Array(100)].map(() => {
    return Generator(1000, 2, QuadraticData.aboveStandardCurve)
})

let activation = network.compute(data[0][0][0])
let cost = network.costWithActivation(activation, data[0][1][0])
console.log("\nExplicit Test")
console.log("Activation")
console.log(activation)
console.log("Desired Output")
console.log(data[0][1][0])
console.log("Cost")
console.log(cost)
console.log("End of Test")

for (let d = 0; d < data.length; d ++) {
    activations = network.muchBackPropagation(data[d][0], data[d][1], 1)

    // logging
    
    let cost0 = network.muchCostWithActivations(activations, data[d][1])
    let cost1 = network.muchCost(data[d][0], data[d][1])
    console.log("\nCosts")
    let decimal = 100000
    console.log(Math.round(cost0 * decimal) / decimal, Math.round(cost1 * decimal) / decimal)
    console.log("End of Costs")
    /*
    console.log("##### cost #####")
    console.log(network.cost(data[d][0][0], data[d][1][0]))
    console.log("===== input, output =====")
    console.log(data[d][0][0], data[d][1][0])
    console.log("~~~~~ guess ~~~~~")
    console.log(network.compute(data[d][0][0])[network.layers.length - 1])
    console.log("\n")
    */
    
}

cost = network.costWithActivation(activation, data[0][1][0])
console.log("\nExplicit Test")
console.log("Activation")
console.log(activation)
console.log("Desired Output")
console.log(data[0][1][0])
console.log("Cost")
console.log(cost)
console.log("End of Test")

/*
console.log(network.weights)
console.log(network.biases)
*/