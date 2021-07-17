function drawNetwork(network, box, activation) {
    
    push()
    translate(box.x, box.y)

    const w = box.width / (network.layers.length)
    const r = box.radius
    for(let l = 0; l < network.layers.length; l ++) {
        
        let x = w * (l + 0.5)

        let layerCount = network.layers[l]
        let nextLayerCount = network.layers[l + 1]
        for(let n = 0; n < layerCount; n ++) {

            let y = box.height / 2 - layerCount * r * 2 + n * r * 4

            if (l < network.layers.length - 1) {

                //weights
                for (let i = 0; i < nextLayerCount; i++) {
                    let weight = network.weights[l][i][n]
                    if (Math.abs(weight) > r * 2) {
                        stroke(255, 255, 0)
                    } else if (weight > 0) {
                        stroke(0, 200, 0)
                    } else {
                        stroke(200, 0, 0)
                    }
                    strokeWeight(Math.min(r * 2, Math.abs(weight)))
                    line(x, y, x + w, box.height / 2 - nextLayerCount * r * 2 + i * r * 4)
                }

            }
            //biases

            if (l > 0) {
                if (network.biases[l - 1][n] > 0) {
                    stroke(0, 50, 255)
                } else {
                    stroke(255, 50, 0)
                }
                strokeWeight(Math.abs(network.biases[l - 1][n]))
            } else {
                strokeWeight(1)
                stroke(0)
            }

            // nodes
            fill(200)
            ellipse(x, y, r * 2, r * 2)
        }
    }


    pop()

}