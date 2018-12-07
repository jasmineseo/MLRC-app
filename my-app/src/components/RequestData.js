import React from "react";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {auth, firebase} from './firebase';
import "./styles.css";
import VisitationPlot from "./VisitationPlot";


// citation: https://github.com/Adphorus/react-date-range

const RequestDataPage = () =>
  <div>
    <h1>Request Data</h1>
    <RequestData />
  </div>


class RequestData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewForm: true, 
      category: "language", //the default value
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
      });
      console.log(this.state);

  }

  handleSubmit(event) {
    this.setState({viewForm: false});
    event.preventDefault();
  }

  render() {

    // if unsubmitted, show the data request form
    if(this.state.viewForm){
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
              <option value="year">Graduating Year</option>
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
    // if submitted, displat the charts
    else{
      var state = this.state;
      return(
        <VisitationPlot 
          inputState={state}
        />
      );
    }
  }
}

export default RequestDataPage;

export {
  RequestData,
};
