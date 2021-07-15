// require("mathjs")

function Network(layers) {
    this.layers = layers;
    this.weights = layers.slice(0, -1).map((layerCount, index) => {
        let nextLayerCount = layers[index + 1]
        return [...Array(nextLayerCount)].map(() => {
            return [...Array(layerCount)].map(() => (Math.random() * 2 - 1))
        })
    })
    this.biases = layers.slice(0, -1).map((layerCount) => {
        return [...Array(layerCount)].map(() => (Math.random() * 2 -1))
    })
}
Network.prototype.compute = function(input) {
    let activations = input;
    for (i = 1; i < this.layers.length; i ++) {
        // for(j = )
    }
}

module.exports = Network;