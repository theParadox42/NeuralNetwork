let mathjs = require("mathjs")

const sigmoid = (x) => {
    return Math.exp(x) / (Math.exp(x) + 1)
};
// const dSigmoid = (x) => {
//     return sigmoid(x)(1 - sigmoid(x))
// }

function Network(layers) {
    this.layers = layers;
    this.weights = layers.slice(0, -1).map((layerCount, index) => {
        let nextLayerCount = layers[index + 1]
        return [...Array(nextLayerCount)].map(() => {
            return [...Array(layerCount)].map(() => (Math.random() * 2 - 1))
        })
    })
    this.biases = layers.slice(1).map(layerCount => {
        return [...Array(layerCount)].map(() => (Math.random() * 2 -1))
    })
}
Network.prototype.compute = function(input) {
    let activations = [input]
    for (layer = 0; layer < this.weights.length; layer ++) {
        activations.push(this.weights[layer].map((weights, node) => {
            let z = this.biases[layer][node] + mathjs.dot(activations[activations.length - 1], weights);
            let a = sigmoid(z);
            return a
        }))
    }
    return activations
}
Network.prototype.costWithActivations = function(activations, desiredOutput) {
    // array of costs summed up
    return mathjs.sum(activations[activations.length - 1].map((output, node) => {
        return (output - desiredOutput[node]) ** 2
    }))
}
Network.prototype.cost = function(input, desiredOutput) {
    const activations = this.compute(input)
    return this.costWithActivations(activations, desiredOutput)
}
Network.prototype.createGradient = function(activations, desiredOutput, learningRate) {
    let biasGradientVector = []
    let weightGradientVector = []
    const dCosts = []

    const lastLayerIndex = this.layers.length - 1

    let learningRate = learningRate || 0.7

    for (let L = lastLayerIndex; L > 0; L--) {
        const dBLayer = []
        const dWLayer = []
        const dLCosts = []

        for (let n = 0; n < this.layers[L]; n ++) {
            // create derivitaves

            // change in Z with respect to a weight is equal to the activation of the node that the weight is connected to
            const dZdW0 = activations[L - 1][0]
            // change in Z with respect to Bias is linear
            const dZdB = 1
            // change in the previous activation is equal to the weight that it is attached to
            const dZdAl0 = this.weights[L - 1][n][0]
            // change in the activation given the sum is equal to the derivitave of the mapping function, e.g. d/dx(sigmoid(x))
            const dAdZ = activations[L][n] * (1 - activations[L][n])
            // change in the cost with respect to activation is the derivitave of cost
            const dC0dA = 2 * (activations[L][n] - desiredOutput[0])
            // change in cost compared to change in sum
            let dCdZ = 0
            if (L == lastLayerIndex) {
                dCdZ = dAdZ * 2 * (activations[L][n] - desiredOutput[n])
            } else {
                for (var i = 0; i < this.layers[L - 1]; i ++) {
                    dCdZ += dCosts[dCosts.length - 1][i] * this.weights[L - 1][n][i]
                }
            }
            dLCosts.push(dCdZ)

            // handle biases
            let dCdB = learningRate * dCdZ
            dBLayer.push(-dCdB)
            
            // handle weights
            for (let w = 0; w < this.weights[L - 1][n].length; w ++) {
                let dCdW = learningRate * dCdZ * activations[L - 1][w]
                // let push = 0; uses momentum and history
                dWLayer.push(-dCdW);
            }
        }
        biasGradientVector.push(dBLayer)
        weightGradientVector.push(dWLayer)
        dCosts.push(dLCosts)
    }

    return [biasGradientVector, weightGradientVector]

}
Network.prototype.backPropagation = function(input, output) {
    const activations = this.compute(input)
    const gradient = this.createGradient(activations, output)

    const biasGV = graident[0]
    const weightGV = gradient[0] 

    for(let i = 0; i < this.layers.length - 1; i ++) {
        let L = this.layers.length - i - 1
        this.biases[L] = biasGV[L].map((dB, node) => {
            return this.biases[L][node] + dB
        })
        this.weights[L] = weightGV[L].map((weights, node) => {
            return weights[node].map((weight, index) => {
                return this.weights[L][node][index] + weight
            })
        })
    }
    
}

module.exports = Network;