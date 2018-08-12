    let dataset = generateData(12)

    const ind = ["Agriculture", "Mining", "Manufacturing", "Utilities", "Construction", "Wholesale and Retail", "Transportation and Storage", "Accomodation and Food Services", "Information and Communication", "Finance and Insurance", "Professional & Other Services", "Public Services"]

    const w = 800;
    const h = 410;
    var colors = ["#004691", "#0E6EB6", "#86B7DB", "#E72884", "#AE197F",
        "#71207B", "#D82B80", "#DA0045", "#F7A324", "#C7C800", "#0088B2", "#FDD900"
    ];

    var xScale = d3.scaleLinear()
        .domain(d3.extent(dataset))
        .range([100, w / 2])

    const bars = d3.select("#barChart")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .style("margin-right",
            "auto")
        .style("display",
            "block")

    bars.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text((d, i) => ind[i])
        .attr("x", 0)
        .attr("y", (d, i) => (i * 35) + 15)

    updateBarChart(dataset);

    function generateData(obs) {
        let dataset = [];
        for (let i = 0; i < obs; i++) {
            dataset[i] = Math.floor(Math.random() * 100)
        }
        console.log(dataset)
        return dataset
    }


    function updateBarChart(dataset) {
        var bar = bars
            .selectAll("rect")
            .data(dataset)

        bar
            .exit()
            .remove()

        bar
            .enter()
            .append("rect")
            .merge(bar)
            .attr("x", 0)
            .attr("y", (d, i) => (i * 35) + 20)
            .transition()
            .duration(1000)
            .attr("width", (d, i) => xScale(d))
            .attr("height", 5)
            .attr("fill", (d, i) => colors[i])
    }