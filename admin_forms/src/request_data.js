import React from "react";
import ReactDOM from "react-dom";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import "./styles.css";

// citation: https://github.com/Adphorus/react-date-range

class Request_Data extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
      dateRange: {
        selection: {
          startDate: new Date(),
          endDate: null,
          key: 'selection',
        }
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

//   handleSelect(ranges){
//     console.log("hi");
//     console.log(ranges);
//   }

    handleRangeChange(which) {
        console.log(which, "dateRange");
        this.setState({
        [which]: {
            ...this.state[which],
            ..."dateRange",
        },
        });
    }

  handleSubmit(event) {
    alert(
      "Your name is " +
        this.state.category +
        "\nYou attend " +
        this.state.startDate +
        "; Graduation year: " +
        this.state.endDate
    );
    event.preventDefault();
  }

  render() {
    // const selectionRange = {
    //     startDate: this.state.startDate,
    //     endDate: this.state.endDate,
    //     key: 'selection',
    // }

    return (
      <form onSubmit={this.handleSubmit}>
        <header>
          <h2> What data would you like to view? </h2>
        </header>
        <label>
          Category:
          <select
            value={this.state.value}
            name="category"
            type="select"
            placeholder={"Select your data category"}
            onChange={this.handleChange}
          >
            <option value="language">Language</option>
            <option value="school">School</option>
            <option value="gradYear">Graduating Year</option>
            <option value="service">Service</option>
          </select>
        </label>
        <br />
        <br />
        <label>

          <DateRange
            ranges={[this.state.dateRange.selection]}
            onChange={this.handleRangeChange.bind(this)}
            moveRangeOnFirstSelection={false}
          />


        </label>
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Request_Data;

// ReactDOM.render(<Request_Data />, document.getElementById("root"));

// const rootElement = document.getElementById("root");
//ReactDOM.render(<App />, rootElement);