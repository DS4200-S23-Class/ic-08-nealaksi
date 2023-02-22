// Setting up constant variables 
const F_HEIGHT = 500;
const F_WIDTH = 500;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const VIS_HEIGHT = F_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = F_WIDTH - MARGINS.left - MARGINS.right;


// frame for bar graph(left column)

const FRAME = d3.select("#viz")
          .append("svg")
            .attr("height", F_HEIGHT)
            .attr("width", F_WIDTH)
            .attr("class", "frame");


// read from bar-data.csv
d3.csv("data/data.csv").then((data) => {
	console.log(data)

    // scaling
    // find max X and max Y
    const MAX_X = d3.max(data, (d, i) => { return parseInt(d.category); });
    const MAX_Y = d3.max(data, (d) => { return parseInt(d.value); });

    const X_SCALE = d3.scaleBand()
            .domain(["A", "B", "C", "D", "E", "F", "G"])
            .range([0, VIS_WIDTH])

    const Y_SCALE = d3.scaleLinear()
            .domain([0,100])
            .range([VIS_HEIGHT, 0])

    // plot our points
    FRAME2.selectAll("bars")  
        .data(data) 
        .enter()       
        .append("rect")  
          .attr("x", (d) => { return (X_SCALE(d.category) + MARGINS.left + 10); }) 
          .attr("y", (d) => { return (Y_SCALE(d.value) + MARGINS.top); }) 
          .attr("width", 40)
          .attr("height", (d) => {return VIS_HEIGHT - Y_SCALE(d.value)})
          .attr("class", "bar")
          .style("fill", "blue");



    // add x-axis to vis
    FRAME.append("g")
            .attr("transform", "translate(" + MARGINS.left+ "," + (VIS_HEIGHT + MARGINS.top) + ")")
            .call(d3.axisBottom(X_SCALE).ticks(10));

  	// add y-axis to vis
 	FRAME.append("g")
          .attr("transform", "translate(" + MARGINS.left + "," + (MARGINS.top) + ")")
          .call(d3.axisLeft(Y_SCALE).ticks(10));
})
