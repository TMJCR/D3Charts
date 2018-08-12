var width = 400,
    height = 400,
    radius = (Math.min(width, height) / 2) - 10;
var formatNumber = d3.format(",d");
var x = d3.scaleLinear()
    .range([0, 2 * Math.PI]);
var y = d3.scaleSqrt()
    .range([0, radius]);
var color = d3.scaleOrdinal(d3.schemeCategory20c)
    .range(["#004691", "#0E6EB6", "#86B7DB", "#E72884", "#AE197F",
        "#71207B", "#D82B80", "#DA0045", "#F7A324", "#C7C800", "#0088B2"
    ]);
var partition = d3.partition();
// These values will be provided by d3.partition()
var arc = d3.arc()
    .startAngle(function(d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x0)));
    })
    .endAngle(function(d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x1)));
    })
    .innerRadius(function(d) {
        return Math.max(0, y(d.y0));
    })
    .outerRadius(function(d) {
        return Math.max(0, y(d.y1));
    });
var svg = d3.select("#viz").append("svg")
    .attr("id", "sunburst")
    .attr("width", width)
    .style("margin-right",
        "auto")
    .style("margin-left",
        "auto")
    .style("display",
        "block")
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");
d3.csv("data/population.csv", function(error, data) {
    if (error) throw error;
    var data1 = data;
    var root = d3.stratify()
        .id((d) => d.AreaCode)
        .parentId((d) => d.Parent)
        (data1);

    root = root
        .sum(function(d) {
            return d.Population ? d.Population : 0;
        });
    // Add an arc for each of the nodes in our hierarchy. partition(root) adds x0, x1, y0, and y1 values to each node.
    svg.selectAll("path")
        .data(partition(root).descendants())
        .enter().append("path")
        .attr("d", arc)
        .style("fill", function(d) {
            return color((d.children ? d : d.parent).data.AreaName);
        })
        .on("click", click)

    .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        // .append("title")
        // .text(function(d) {
        //     return d.data.AreaName + "\n" + formatNumber(d.value * 1000);
        // });
});

function click(d) {

    updateBarChart(generateData(12));
    updateChart(d.data.AreaName)
    console.log((d))
        // Redraw the arcs when one of them is clicked to zoom in on a section
    document.getElementById("region").innerHTML = d.data.AreaName
    svg.transition()

    .duration(750)
        .tween("scales", function() {
            var xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
                yd = d3.interpolate(y.domain(), [d.y0, 1]),
                yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
            return function(t) {
                x.domain(xd(t));
                y.domain(yd(t)).range(yr(t));
            };
        })
        .selectAll("path")
        .attrTween("d", function(d) {
            return function() {
                return arc(d);
            };
        });
}

// Create Event Handlers for mouse
function handleMouseOver(d, i) { // Add interactivity
    document.getElementById("regionTitle").innerHTML = d.data.AreaName


    // Specify where to put label of text
    // svg.append("text")
    //     .attr("stroke", "white")
    //     .attr("x", -75)
    //     .attr("id", "t" + d.x + "-" + d.y + "-" + i)
    //     .text(function() {
    //         return d.data.AreaName;
    //     });
}

function handleMouseOut(d, i) {
    // Use D3 to select element, change color back to normal

    // Select text by id and then remove
    // d3.select("#t" + d.x + "-" + d.y + "-" + i).remove(); // Remove text location
}