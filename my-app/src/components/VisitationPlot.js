import React from "react";
import "./styles.css";
import * as d3 from "d3";

//d3 from https://github.com/d3/d3
// load with "npm install d3"

//formatting from http://www.adeveloperdiary.com/d3-js/create-stacked-bar-chart-using-d3-js/
var margin = {top: 20, right: 150, bottom: 30, left: 50};
var width = 500 - margin.left - margin.right;
var height = 300 - margin.top - margin.bottom;

var testData = [{week: "week1", Spanish: 4, Korean: 9, Arabic: 5, French: 0},  
                {week: "week2", Spanish: 9, Korean: 0, Arabic: 3, French: 1},
                {week: "week3", Spanish: 6, Korean: 6, Arabic: 8, French: 4}];


var testCategories = ["Spanish", "Korean", "Arabic", "French"];


const VisitationPlotsPage = () =>
    (<div>
        <h1>Visitation Plots</h1>
        <VisitationPlots />
    </div>);

class VisitationPlots extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            category: "",
            startDate: new Date(),
            endDate: new Date(),
            data: testData,
        }
    };

    componentDidMount(){
        this.makeStackedPlot();
    }

    componentWillUnmount(){
        d3.select("svg").remove();
    }

    makeStackedPlot(){
        console.log("start");
        //reformat data
        var dataStackLayout = d3.stack().keys(testCategories)
                                        .offset(d3.stackOffsetDiverging)
                                        (testData)

    

        //set up x and y ranges
        var xRange = d3.scaleBand()
                  .rangeRound([0, width])
                  .padding(0.35);
                  
        xRange.domain(dataStackLayout[0].map(function (d) {
            return d.data.week;
        }));
 
        var yRange = d3.scaleLinear()
                .rangeRound([height, 0]);

        yRange.domain([0,
            d3.max(dataStackLayout[dataStackLayout.length - 1],
                function (d) {return d[1]})
            ])
            .nice();
        
        //use default color scheme
        var color = d3.scaleOrdinal(d3.schemeCategory10);

        //create axes
        var xAxis = d3.axisBottom(xRange);
        var yAxis = d3.axisLeft(yRange)


        //set up the svg
        const svg = d3.select("#chart")
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
                    return yRange(d[1]);
                })
                .attr("height", function (d) {
                    return yRange(d[0]) - yRange(d[1]);
                })
                .attr("width", xRange.bandwidth());
                
        //create a legend
        var legend = svg => {
            const g = svg
                .attr("font-family", "sans-serif")
                .attr("font-size", 10)
                .attr("text-anchor", "end")
                .selectAll("g")
                .data(testCategories.slice().reverse())
                .enter()
                .append("g")
                .attr("transform", (d, i) => `translate(0,${i * 20})`);
          
            g.append("rect")
                .attr("x", 200)
                .attr("width", 19)
                .attr("height", 19)
                .attr("fill", (d, i) => color(testCategories.length - i - 1));
          
            g.append("text")
                .attr("x", 190)
                .attr("y", 9.5)
                .attr("dy", "0.35em")
                .text(d => d);
        }

        // add axes to the chart
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
        
        svg.append("g")
            .call(yAxis)

        //add legend to the chart
        svg.append("g")
            .attr("transform", `translate(${width - margin.right},${margin.top})`)
            .call(legend);
        console.log("end")
        return svg.node;
    }

    render() {
        return <div id="chart"></div>
    }
}

export default VisitationPlotsPage;
