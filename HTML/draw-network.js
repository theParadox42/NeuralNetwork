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

            let y = box.height / 2 - (layerCount - 1) * r * 1.5 + n * r * 3

            if (l < network.layers.length - 1) {

                //weights
                for (let i = 0; i < nextLayerCount; i++) {
                    let weight = network.weights[l][i][n]
                    if (Math.abs(weight) > r * 2) {
                        if (weight > 0) {
                            stroke(150, 200, 0)
                        } else {
                            stroke(200, 150, 0)
                        }
                    } else {
                        if (weight > 0) {
                        stroke(0, 200, 0)
                        } else {
                            stroke(200, 0, 0)
                        }
                    }
                    strokeWeight(Math.min(r * 2, Math.abs(weight)))
                    line(x, y, x + w, box.height / 2 - (nextLayerCount - 1) * r * 1.5 + i * r * 3)
                }

            }
            //biases

            if (l > 0) {
                let bias = network.biases[l - 1][n]
                if (Math.abs(bias) > box.radius) {
                    if (bias > 0) {
                        stroke(150, 0, 200)
                    } else {
                        stroke(200, 0, 150)
                    }
                } else {
                    if (bias > 0) {
                        stroke(0, 100, 200)
                    } else {
                        stroke(200, 100, 0)
                    }
                }
                strokeWeight(Math.min(Math.abs(bias), box.radius))
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