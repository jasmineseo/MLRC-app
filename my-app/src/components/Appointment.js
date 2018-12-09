import React from "react";
import {firebase} from './firebase';
import "./styles.css";
import {withRouter} from 'react-router-dom';


class Appointment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      language: "",
      mode: "select",
      calendar: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.findLink = this.findLink.bind(this);
  }

  findLink(language) {
    return firebase.database().ref('/language/' 
    + language).once('value').then(function(snapshot) {
      var calendarLink = (snapshot.val() && snapshot.val().calendar) 
      || 'Unknown';
      return calendarLink;
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({mode: 'calendar'});
    var lang = this.state.language;
    var calendarLink = Promise.resolve(this.findLink(lang));
    let currentComponent = this;
    calendarLink.then(function(value) {
      currentComponent.setState({calendar: value})
    });
  }

  render() {
    if(this.state.mode === 'select') {
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
        </form>
      );
    }
    else{
      var calendar = this.state.calendar;
      var cString = calendar.toString();
      return (
        <div>                
          <iframe src={cString} 
          width='100%' height="600" frameborder="0" scrolling="yes">
          </iframe>
        </div>
      );
    }

  }
}

export default withRouter(Appointment);
