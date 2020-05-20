// @TODO: YOUR CODE HERE!
// set chart parameters
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 50,

};

// create svg wrapper and append svg group for chart
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// append g tag and shift svg wrapper for chart by top and left margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


//Import data from csv
d3.csv("data.csv").then(function(healthData){
    console.log(healthData);

// format data from string to number
    healthData.forEach(function(data){ 
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    })
});