// SVG 
var width1 = 600;
var height1 = 600;
var padding = 50;

// Data setup
var data = popData.filter(d => d.AreaName === "Birmingham");
// data.forEach(d => d.Population *= 1000)
var localName = data[0].AreaName;

//Set up svg
var lineChart = d3.select("#lineChartRaw")
    .style("margin-right",
        "auto")
    .style("margin-left",
        "auto")
    .style("display",
        "block")
    .attr("width", width1)
    .attr("height", height1)
    //Display Axes
var xAxisDisplay = lineChart.append("g")
    .attr("class", "xaxis")
    .attr("transform", "translate(0," + (height1 - padding) + ")")

var yAxisDisplay = lineChart.append("g")
    .attr("class", "yaxis")
    .attr("transform", "translate(" + (padding + 10) + ",0)")

//Display Title
lineChart.append("text")
    .attr("x", width1 / 2)
    .attr("y", padding / 2)
    .attr("text-anchor", "middle")
    .classed("title", true)
    .style("font-size", "2em")
    .text(`Population in ${localName}`)

//Set up line
var g = lineChart.append("g")

// affix line to page
var plot = g.append("path")
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-with", "3px")

//Initialise the visualisation
updateChart("Birmingham")

//Assign Event Handler
d3.select("#local")
    .on("change", () => updateChart(d3.event.target.value))

//Update Function
function updateChart(local) {
    var chart = d3.select("#lineChartRaw").transition();
    data = popData.filter(d => d.AreaName === local);

    //Calculate X and Y ranges and scaling functions
    var max = d3.max(data, d => d.Population * 1000.02)
    var min = d3.min(data, d => d.Population * 999.98)

    var xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.Year))
        .range([padding + 10, width1 - padding + 10]);

    var yScale = d3.scaleLinear()
        .domain([min, max])
        .range([height1 - padding, padding + 10])

    //Update Axes
    var xAxis = d3.axisBottom(xScale)
        .tickSize(-height1 + 2 * padding + 10)
        .tickSizeOuter(0);

    var yAxis = d3.axisLeft(yScale)
        .tickSize(-width1 + 2 * padding + 10)
        .tickSizeOuter(0);


    // assign values to x and y
    var line = d3.line()
        .x(function(d) {
            return xScale(d.Year);
        })
        .y(function(d) {
            return yScale(d.Population * 1000);
        });

    var Colors = ["", "rgb(219,0,71)", "rgb(0,136,178)", "rgb(247,162,35)", "rgb(199,201,0)"]
    var random = Math.floor(Math.random() * 4) + 1
        //Update Line and Axes
    chart.select(".line")
        .duration(750)
        .attr("d", line(data))
        .attr("stroke", Colors[random])
        .attr("stroke-width", random + 1);


    chart.select(".xaxis")
        .duration(750)
        .call(xAxis)

    chart.select(".yaxis")
        .duration(750)
        .call(yAxis)
    chart.select(".title")
        .delay(400)
        .text("Population in " + local)
}