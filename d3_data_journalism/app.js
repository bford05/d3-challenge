// @TODO: YOUR CODE HERE!
// set svg parameters
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100,

};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create svg wrapper and append svg group for chart
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append g tag and shift svg wrapper for chart by top and left margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Import data from csv
d3.csv("data.csv").then(function(healthData){
    console.log(healthData);

// Format data from a string to a number
healthData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare
})



// Create scale functions for chart
var xLinearScale = d3.scaleLinear()
  .domain([8, d3.max(healthData, d => d.poverty)])
  .range([0, width]);

var yLinearScale = d3.scaleLinear()
  .domain([0, d3.max(healthData, d => d.healthcare)])
  .range([height, 0]);

// Create axis functions for chart
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

// Append bottom and left axis to the chart
chartGroup.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(bottomAxis);

chartGroup.append("g")
.call(leftAxis);

// Create circles for chart
var circlesGroup = chartGroup.selectAll("circle")
  .data(healthData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.poverty))
  .attr("cy", d => yLinearScale(d.healthcare))
  .attr("r", "12")
  .attr("fill", "green")
  .attr("opacity", ".7");

//Add state abbreviations to each circle on the chart
var textGroup = chartGroup.append("g")
  .selectAll("text")
  .data(healthData)
  .enter()
  .append("text")
  .attr("dx", d => xLinearScale(d.poverty)-3) //offset text to the left with -
  .attr("dy", d => yLinearScale(d.healthcare)+2) //offset text down with +
  .text(d => d.abbr)
  .attr("font-family", "arial")
  .attr("text-anchor", "middle")
  .attr("font-size", "10px")
  .attr("font-weight", "bold")
  .attr("fill", "white");



// Initialize tool tips
var toolTip = d3.tip()
.attr("class", "d3-tip")
.offset([80, -60])
.html(function(d) {
  return(`${d.state}<br>Poverty level: ${d.poverty}<br>Healthcare: ${d.healthcare}`);
});

// Create tooltip in the chart
chartGroup.call(toolTip);

// Create event listeners to display and hide tool tip for the chart
circlesGroup.on("click", function(data){
  toolTip.show(data, this);
})

// Define mouse event to hide tool tip when mouse is not hovering over circle
.on("mouseout", function(data){
  toolTip.hide(data);
});


// Create y-axis labels
chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left + 40)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .attr("fill", "green")
  .attr("font-weight", "bold")
  .attr("text-anchor", "middle")
  .text("Lacks Healthcare (%)");


  // Create x-axis labels
chartGroup.append("text")
  .attr("transform", `translate(${width /2}, ${height + margin.top + 30})`)
  .attr("fill", "green")
  .attr("font-weight", "bold")
  .attr("text-anchor", "middle")
  .text("In Poverty (%)");
}).catch(function(error){
  console.log(error);
});
