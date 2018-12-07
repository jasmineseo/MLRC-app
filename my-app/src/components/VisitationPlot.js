import React, { useImperativeMethods } from "react";
import "./styles.css";
import * as d3 from "d3";
import * as saveSvg from "save-svg-as-png";
import {auth, firebase} from './firebase';

//d3 from https://github.com/d3/d3
// load with "npm install d3"
//and svg saving from https://github.com/exupero/saveSvgAsPng
//load with "npm install save-svg-as-png"

//formatting from http://www.adeveloperdiary.com/d3-js/create-stacked-bar-chart-using-d3-js/
var margin = {top: 100, right: 150, bottom: 30, left: 50};
var width = 800 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

var testData = [{xlab: "week1", Spanish: 4, Korean: 9, Arabic: 5, French: 0},  
                {xlab: "week2", Spanish: 9, Korean: 0, Arabic: 3, French: 1},
                {xlab: "week3", Spanish: 6, Korean: 6, Arabic: 8, French: 4}];


var sumData = [{xlab: "Spanish", allVisits: 19},
               {xlab: "Korean", allVisits: 15}, 
               {xlab: "Arabic", allVisits: 16},
               {xlab: "French", allVisits: 5}];

var testCategories = ["Spanish", "Korean", "Arabic", "French"];

var sumCategories = ["allVisits"]


const VisitationPlotsPage = (inputState) =>
    (<div>
        <h1>Visitation Plots</h1>
        <button id='saveCumulative'> Download Cumulative Plot as PNG </button>
        <button id='saveWeekly'> Download Weekly Plot as PNG </button>
        <VisitationPlots input={inputState} />
    </div>);

class VisitationPlots extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            category: props.input.inputState.category,
            startDate: props.input.inputState.dateRange.selection.startDate,
            endDate: props.input.inputState.dateRange.selection.endDate,
            data: [],
            sumData: sumData,
        }
        this.state.startDate.setHours(0,0,0,0);
        this.state.endDate.setHours(0,0,0,0);
        this.downloadCumulative = this.downloadSVG.bind(this, null, 0);
        this.downloadWeekly = this.downloadSVG.bind(this, null, 1);
    };

    componentDidMount(){
        this.getData();
        console.log("Datadict is " + this.state.data);

        var dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        // make the cumulative data plot
        this.makeStackedPlot(this.state.sumData, 
                            sumCategories, 
                            false, 
                            "All Visits from " + 
                                this.state.startDate.toLocaleDateString("en-US", dateOptions) + 
                                " to " + 
                                this.state.endDate.toLocaleDateString("en-US", dateOptions));

                                
        // make the week by week plot
        this.makeStackedPlot(testData, 
                            testCategories, 
                            true, 
                            "Visits by Week from " + 
                            this.state.startDate.toLocaleDateString("en-US", dateOptions) + 
                            " to " + 
                            this.state.endDate.toLocaleDateString("en-US", dateOptions));
    }

    componentWillUnmount(){
        d3.select("svg").remove();
    }

    formatStackedData(data, categories){
        var dataStackLayout = d3.stack().keys(categories)
        .offset(d3.stackOffsetDiverging)
        (data)
        
        return dataStackLayout
    }

    downloadSVG(event, idx){
        //if idx is 0, download cumulative. if idx is 1, download weekly
        var dateFormat = { year: 'numeric', month: 'short', day: 'numeric' };
        var name = "by_" + this.state.category + "_" + 
            this.state.startDate.toLocaleDateString("en-US", dateFormat) + "_to_" +
            this.state.endDate.toLocaleDateString("en-US", dateFormat) + ".png";
        if (idx === 0){
            name = "cumulative_" + name;
        }
        else{
            name = "weekly_" + name; 
        }
        saveSvg.saveSvgAsPng(document.getElementsByTagName("svg")[idx], name, {scale: 1, backgroundColor: "#FFFFFF"});
    }

    getData(){
        const DataDict = this.state.data;
        var category = this.state.category;

        var start = this.state.startDate.getTime();
        var end = this.state.endDate.getTime();
        var dateObjs = firebase.database().ref().child('checkin').orderByKey();

        //restructure data
        dateObjs.startAt(start.toString()).endAt(end.toString()).on("value", function(x) {
            console.log("x is " + x.key);
            x.forEach(function(day) {

                var date = new Date(day.key*1);
                console.log("date is:" + date);
                var month = date.toLocaleDateString("en-us", {month: "long"});
                var year = date.toLocaleDateString("en-us", {year: "numeric"});
                var dateKey = (month + "-" + year);
                console.log(dateKey);
                //add month to dictionary if not present
                if (! (dateKey in DataDict)){
                    DataDict[dateKey] = {};
                }

                day.forEach(function(visit) {
                    var visitID = visit.key;
                    console.log("visitId is" + visitID);
                    var value = visit.val()[category]
                    console.log("visit.val()[category] " + value);
                    //add category value to month if not present 
                    if (! (value in DataDict[dateKey])){
                        DataDict[dateKey][value] = 0;
                    }
                    DataDict[dateKey][value] += 1;
                    console.log("value is " + DataDict[dateKey][value]);
                })
            });

        }).then(console.log("keys are " + Object.keys(DataDict)));
        
        // console.log("final value is " + DataDict["December-2018"]["French"])
        this.state.data = DataDict;
        // console.log("super final value is " + this.state.data["December-2018"]["French"])
    }


    makeStackedPlot(data, categories, useLegend, title){
        //reformat data
        var dataStackLayout = this.formatStackedData(data, categories)

        //set up x and y ranges
        var xRange = d3.scaleBand()
                  .rangeRound([0, width])
                  .padding(0.35);
                  
        xRange.domain(dataStackLayout[0].map(function (d) {
            return d.data.xlab;
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
                .attr("x", d => xRange(d.data.xlab))
                .attr("y", d => yRange(d[1]))
                .attr("height", d => yRange(d[0]) - yRange(d[1]))
                .attr("width", xRange.bandwidth())
            
        layer.selectAll("text")
            .data(d => d)
            .enter().append("text")
                .text(function(d){
                    if(d[1] - d[0] > 0){
                        return d[1] - d[0];
                    }
                    else{return null}
                })
                .attr("fill", "white")
                .attr("y", d => yRange(d[1]) + 18)
                .attr("x", d => xRange(d.data.xlab) + xRange.bandwidth() / 2)
                .style("text-anchor", "middle")


                // .attr("fill", "white")
                // .attr("text-anchor", "end")
                // .style("font", "12px sans-serif")
                // .selectAll("text")
                // .data(data)
                // .enter().append("text")
                // .attr("y", d => yRange(d[0]) - 2)
                // .attr("x", d => xRange(d.value) - 4)
                //     .attr("dx", "0.35em")
                //     .text(d => yRange(d[0]) - yRange(d[1]));
                

        // add axes to the chart
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
        
        svg.append("g")
            .call(yAxis)

        // add title to the chart
        svg.append("text")
            .attr("x", (width / 2))             
            .attr("y", 0 - (margin.top / 4))
            .attr("text-anchor", "middle")  
            .style("font-size", "24px") 
            .text(title);

        if(useLegend){
            //create a legend
            var legend = svg => {
                const g = svg
                    .attr("font-family", "sans-serif")
                    .attr("font-size", 10)
                    .attr("text-anchor", "end")
                    .selectAll("g")
                    .data(categories.slice().reverse())
                    .enter()
                    .append("g")
                    .attr("transform", (d, i) => `translate(0,${i * 20})`);
            
                g.append("rect")
                    .attr("x", 200)
                    .attr("width", 19)
                    .attr("height", 19)
                    .attr("fill", (d, i) => color(categories.length - i - 1));
            
                g.append("text")
                    .attr("x", 190)
                    .attr("y", 9.5)
                    .attr("dy", "0.35em")
                    .text(d => d);
            }
            //add legend to the chart
            svg.append("g")
                .attr("transform", `translate(${width - margin.right},${margin.top})`)
                .call(legend);   
                

            d3.select("#saveCumulative")
                .on('click', this.downloadCumulative)

            d3.select("#saveWeekly")
                .on('click', this.downloadWeekly)

        }

        return svg.node;
    }

    render() {
        return <div id="chart"></div>
    }
}

export default VisitationPlotsPage;
