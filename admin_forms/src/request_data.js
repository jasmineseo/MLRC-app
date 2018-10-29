import React from "react";
import ReactDOM from "react-dom";
import { DateRange } from 'react-date-range';

import "./styles.css";

// citation: https://github.com/Adphorus/react-date-range

class Request_Data extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: "",
      endDate: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

//   Want to majorly change this
  handleSubmit(event) {
    alert(
      "Your name is " +
        this.state.name +
        "\nYou attend " +
        this.state.school +
        "; Graduation year: " +
        this.state.gradYear +
        "\nVisiting the MLRC for " +
        this.state.service +
        " in " +
        this.state.language
    );
    event.preventDefault();
  }

  render() {

    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }

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
          Date Range:
          <DateRange
				ranges={[selectionRange]}
				onChange={this.handleSelect}
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