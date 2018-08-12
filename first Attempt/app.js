var tom;
d3.csv('./population.csv', function(error, data) {
    if (error) throw error;

    var data1 = data;


    var width = 600;
    var height = 600;
    console.log(data1)
    var root = d3.stratify()
        .id((d) => d.AreaCode)
        .parentId((d) => d.Parent)
        (data1);
    console.log(root)
    var tom = root;
    document.getElementById("tom").innerHTML = JSON.stringify(root, null, 2);
    // d3.select('svg')
    //     .attr('width', width)
    //     .attr('height', height)
    //     .selectAll('path')
    //     .data(topojson.feature(data, data.objects.collection).features)
    //     .enter()
    //     .append('path')
    //     .attr('d', path)
    //     .attr('fill', d => d.properties.color);

});