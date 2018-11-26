import React from "react";
// import ReactDOM from "react-dom";
import {auth, firebase} from './firebase';
import "./styles.css";
import { Link, withRouter, } from 'react-router-dom';
import * as routes from '../constants/routes';

class Appointment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      language: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    alert(
        "Appointment for " +
        this.state.language
    );
    firebase.database().ref("appointment/" + this.state.date + "/" + this.state.name).set({
      language: this.state.language,
    });
    event.preventDefault();
    this.props.history.push('/apptcalendar');
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <header>
          <h2> Schedule an Appointment </h2>
        </header>
        <label>
          Language:
          <select
            value={this.state.value}
            name="language"
            type="select"
            placeholder={"Select a language"}
            onChange={this.handleChange}
          >
            <option value="Select a language">Select a language</option>
            <option value="Arabic">Arabic</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Italian">Italian</option>
            <option value="Korean">Korean</option>
            <option value="Spanish">Spanish</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <br />
        <br />
        <input type="submit" value="Submit" />
        {/* <CalendarLink /> */}
        {/* <Link to={routes.APPTCALENDAR}>Make an appointment</Link> */}
        {/* <Calendar /> */}
        {/* <Calendar iframe={'<iframe src="https://calendar.google.com/calendar/b/1/embed?height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=g.hmc.edu_0vviqh1aspdhhsdaa028h7flcs%40group.calendar.google.com&amp;color=%2329527A&amp;ctz=America%2FLos_Angeles" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no"></iframe>'} />, */}
      </form>
    );
  }
}

export default withRouter(Appointment);
