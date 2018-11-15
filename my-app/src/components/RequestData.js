import React from "react";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {auth, firebase} from './firebase';
// import "./styles.css";

// citation: https://github.com/Adphorus/react-date-range

const RequestDataPage = () =>
  <div>
    <h1>Request Data</h1>
    <RequestData />
  </div>

// // Get elements
// const dateObj = document.getElementById('11-6-18'); // need to change by what you want
// const langObj = dateObj.getElementById('Korean'); // need to cahgne

// // create references
// const dbDateObj = firebase.database().ref().child('11-6-18');
// const dbLangObj = dbDateObj.child('Korean');

class RequestData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
      dateRange: {
        selection: {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',
        }
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state.dateRange.selection);

  }


    handleRangeChange(event) {

        this.setState({
            dateRange: {
                selection: {
                  startDate: event.selection.startDate,
                  endDate: event.selection.endDate,
                  key: 'selection',
                }
            }
        // dateRange: {
        //     ...this.state[which],
        //     ..."dateRange",
        // },
        });
        console.log(this.state);

    }

  handleSubmit(event) {
    alert(
      "Your category is " +
        this.state.category +
        "\nYou start dates are " +
        this.state.dateRange.selection.startDate +
        " - " +
        this.state.dateRange.selection.endDate
    );
    event.preventDefault();
  }

  render() {

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
            onChange={this.handleRangeChange}
            ranges={[this.state.dateRange.selection]}
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

export default RequestDataPage;

export {
  RequestData,
};

// ReactDOM.render(<Request_Data />, document.getElementById("root"));

// const rootElement = document.getElementById("root");
//ReactDOM.render(<App />, rootElement);