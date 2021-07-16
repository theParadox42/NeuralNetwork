let Network = require("./network.js")



let network = new Network([3, 5, 3]);

console.log(network.cost([0, 0, 1], [1, 0, 0]))
network.backPropagation([1, 0, 0], [0, 1, 0.5])