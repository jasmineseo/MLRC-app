import React from "react";
import "./styles.css";
import * as d3 from "d3";

//d3 from https://github.com/d3/d3
// load with "npm install d3"

//formatting from http://www.adeveloperdiary.com/d3-js/create-stacked-bar-chart-using-d3-js/
var margin = {top: 20, right: 50, bottom: 30, left: 50};
var width = 400 - margin.left - margin.right;
var height = 300 - margin.top - margin.bottom;



const VisitationPlotsPage = () =>
    <div>
        <h1>Visitation_Plots</h1>
        <Visitation_Plots />
    </div>

class Visitation_Plots extends React.Component {

    render() {

        var testData = [{week: "week1", Spanish: 4, Korean: 9, Arabic: 5, French: 2},
                        {week: "week2", Spanish: 9, Korean: 10, Arabic: 3, French: 1},
                        {week: "week3", Spanish: 6, Korean: 6, Arabic: 8, French: 4}];

        var testCategories = ["Spanish", "Korean", "Arabic", "French"];

        //reformat data
        var dataStackLayout = d3.stack().keys(testCategories)
                                        .offset(d3.stackOffsetDiverging)
                                        (testData)

        //tell d3 to have all columns in a constistent order and make the ranges
        var xRange = d3.scaleBand()
                  .rangeRound([0, width])
                  .padding(0.35);
 
        var yRange = d3.scaleLinear()
                .rangeRound([height, 0]);
        
        var color = d3.scaleOrdinal(d3.schemeCategory10); //get default colors

        var xAxis = d3.axisBottom(xRange);

        var svg = d3.select("body").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        

        // set up ???
        xRange.domain(dataStackLayout[0].map(function (d) {
            return d.data.week;
        }));

        // console.log(dataStackLayout[0][0][1]) 

        //set up y axis
        yRange.domain([0,
            d3.max(dataStackLayout[dataStackLayout.length - 1],
                function (d) {return d[0] + d[1];})
        ])
            .nice();


        var layer = svg.selectAll(".stack")
            .data(dataStackLayout)
            .enter().append("g")
            .attr("class", "stack")
            .style("fill", function (d, i) {
                return color(i);
            });
     

        layer.selectAll("rect")
            .data(d => d)
            .enter().append("rect")
                .attr("x", function (d) {                
                    return xRange(d.data.week);
                })
                .attr("y", function (d) {
                    return yRange(d[0] + d[1]);
                })
                .attr("height", function (d) {
                    return yRange(d[0]) - yRange(d[0] + d[1]);
                })
                .attr("width", xRange.bandwidth());
        
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)

        // svg.append("g")
        //     .attr("transform", `translate(${width - margin.right}, ${margin.top})`)
        //     .call(legend);
            
        // return svg.node();
        return <div></div>

    }
}

export default VisitationPlotsPage;

export {
    Visitation_Plots,
};