let network = new Network([3, 6, 12, 6, 3]);


let data = [...Array(101)].map((none, i) => {
    return generateColorData(i % 2 == 0 ? 1000 : 10)
})

console.log(network.muchCost(data[0][0], data[0][1]))

for (let i = 1; i < data.length; i += 2) {
    network.muchBackPropagation(data[i][0], data[i][1], 0.2)
    console.log(network.muchCost(data[i + 1][0], data[i + 1][1]))
}

