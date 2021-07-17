let math = {
    dot: (arr1, arr2) => {
        return math.sum(arr1.map((value, index) => {
            return value * arr2[index]
        }))
    },
    sum: arr => {
        let sum = 0
        arr.forEach(number => { sum += number })
        return sum
    },
    sigmoid: x => {
        return Math.exp(x) / (Math.exp(x) + 1) || 0
    },
    avg: arr => {
        return math.sum(arr) / arr.length
    }
}

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
    this.previousGradientVector = false
}

// Feedforward or calculate
Network.prototype.compute = function(input) {
    let activation = [input]
    for (let layer = 0; layer < this.layers.length - 1; layer ++) {
        activation.push(this.biases[layer].map((bias, node) => {
            let z = bias + math.dot(activation[activation.length - 1], this.weights[layer][node])
            let a = math.sigmoid(z)
            return a
        }))
    }
    return activation
}
Network.prototype.muchCompute = function(inputs) {
    return inputs.map(input => {
        return this.compute(input)
    })
}

// Cost functions
Network.prototype.costWithActivation = function(activation, outputs) {
    // array of costs summed up
    let cost = math.sum(activation[activation.length - 1].map((output, node) => {
        return (output - outputs[node]) ** 2
    }))
    return cost
}
Network.prototype.muchCostWithActivations = function(activations, outputs) {
    return math.sum(activations.map((activation, index) => {
        return this.costWithActivation(activation, outputs[index])
    })) / activations.length
}
Network.prototype.cost = function(input, output) {
    return this.costWithActivation(this.compute(input), output)
}
Network.prototype.muchCost = function(inputs, outputs) {
    return this.muchCostWithActivations(inputs.map(input => {
        return this.compute(input)
    }), outputs)
}

// Gradient Vectors
Network.prototype.createGradientVector = function(activation, desiredOutput, optionalLearningRate, optionalMomentum) {

    const learningRate = typeof optionalLearningRate == "number" ? optionalLearningRate : 0.5

    const momentum = typeof optionalMomentum == "number" ? optionalMomentum : 0.5

    let biasGradientVector = []
    let weightGradientVector = []
    let dCosts = []

    const lastLayerIndex = this.layers.length - 1


    // console.log(this.weights)

    for (let L = lastLayerIndex; L > 0; L--) {
        const dBLayer = []
        const dWLayer = []
        const dLCosts = []

        for (let n = 0; n < this.layers[L]; n ++) {
            // create derivitaves

            // some example stuff (not necessary accurate calculations)
            /*
            // change in Z with respect to a weight is equal to the activation of the node that the weight is connected to
            const dZdW0 = activation[L - 1][0]
            // change in the previous activation is equal to the weight that it is attached to
            const dZdAl0 = this.weights[L - 1][n][0]
            // change in the cost with respect to activation is the derivitave of cost when dealing with the first layer
            const dC0dA = 2 * (activation[L][n] - desiredOutput[0])
            */

            // change in Z with respect to Bias is linear
            const dZdB = 1
            // change in the activation given the sum is equal to the derivitave of the mapping function, e.g. d/dx(sigmoid(x))
            const dAdZ = activation[L][n] * (1 - activation[L][n])

            // change in cost compared to change in sum
            let dCdZ = 0
            if (L == lastLayerIndex) {
                dCdZ = dAdZ * 2 * (activation[L][n] - desiredOutput[n])
            } else {
                for (var i = 0; i < this.layers[L + 1]; i ++) {
                    dCdZ += dCosts[dCosts.length - 1][i] * this.weights[L][i][n]
                }
                dCdZ *= dAdZ
            }
            dLCosts.push(dCdZ)

            // handle biases
            // GRADIENT DOESN'T EXIST SO CATCH THAT ERROR
            let dCdB = -dZdB * dCdZ * learningRate + this.previousGradientVector[0][L][n] * momentum
            dBLayer.push(dCdB)
            
            let dWNode = []
            // handle weights
            for (let w = 0; w < this.weights[L - 1][n].length; w ++) {
                let dCdW = -dCdZ * activation[L - 1][w] + this.previousGradientVector[0][L][n][w] * momentum
                // let push = 0; uses momentum and history
                dWNode.push(dCdW)
            }
            dWLayer.push(dWNode)
        }
        biasGradientVector.push(dBLayer)
        weightGradientVector.push(dWLayer)
        dCosts.push(dLCosts)
    }
    
    console

    return [biasGradientVector, weightGradientVector]

}
Network.prototype.applyGradientVector = function(gradientVector, optionalLearningRate) {

    for (let i = 0; i < this.layers.length - 1; i++) {
        let I = this.layers.length - i - 2
        this.biases[i] = this.biases[i].map((bias, node) => {
            return bias + gradientVector[0][I][node]
        })
        this.weights[i] = this.weights[i].map((weights, node) => {
            return weights.map((weight, index) => {
                return weight + gradientVector[1][I][node][index]
            })
        })
    }

    this.previousGradientVector = gradientVector
}

// Back Propagation
Network.prototype.backPropagation = function(input, output, optionalLearningRate) {

    const activation = this.compute(input)
    const gradientVector = this.createGradientVector(activation, output)
    
    this.applyGradientVector(gradientVector, optionalLearningRate)
    
    return activation
}
Network.prototype.muchBackPropagation = function(inputs, outputs, optionalLearningRate) {

    const activations = this.muchCompute(inputs)
    const gradientVectors = activations.map((activation, index) => {
        return this.createGradientVector(activation, outputs[index], optionalLearningRate)
    })
    const avgGradientVector = [
        gradientVectors[0][0].map((layer, layerIndex) => {
            return layer.map((_, node) => {
                return math.avg(gradientVectors.map(gradient => {
                    return gradient[0][layerIndex][node]
                }))
            })
        }),
        gradientVectors[0][1].map((layer, layerIndex) => {
            return layer.map((weights, node) => {
                return weights.map((_, index) => {
                    return math.avg(gradientVectors.map(gradient => {
                        return gradient[1][layerIndex][node][index]
                    }))
                })
            })
        })
    ]
    
    this.applyGradientVector(avgGradientVector, optionalLearningRate)

    return activations
}


try {
    module.exports = Network
} catch (e) {}