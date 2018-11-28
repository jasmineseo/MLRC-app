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
      language: "",
      mode: "select",
      calendly: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.findLink = this.findLink.bind(this);
  }

  findLink(language) {
    // alert("made it into findLink")
    // var calendlyLink = "";
  
    return firebase.database().ref('/language/' + language).once('value').then(function(snapshot) {
      var calendlyLink = (snapshot.val() && snapshot.val().calendly) || 'Unknown';
      // alert("about to set state");
      // this.setState({calendly: calendlyLink});
      // alert("calendly is " + calendlyLink)
      return calendlyLink;
    });
    // alert("calendly2" + calendlyLink)
    // alert('about to set state');
    // this.setState({calendly: calendlyLink});
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    // alert(
    //     "Appointment for " +
    //     this.state.language
    // );
    // firebase.database().ref("language/" + this.state.language).set({
    //   calendly: this.state.calendly,
    // });
    event.preventDefault();
    this.setState({mode: 'calendar'});
    var lang = this.state.language;
    var calendlyLink = Promise.resolve(this.findLink(lang));
    let currentComponent = this;
    calendlyLink.then(function(value) {
      currentComponent.setState({calendly: value})
      // alert("cal is " + value)
    });
    // this.setState(function(props){
    //   calendlyLink.then(function(value){
    //     return {calendly: value}
    //   });
    //   alert("state is" + this.state.calendly)
    // });
    // alert("state is " + this.state.calendly)

    // this.props.history.push('/apptcalendar');
  }



  render() {
    if(this.state.mode == 'select') {
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
    else{
      var calendly = this.state.calendly;
      var cString = calendly.toString();
      return (
        <div>                
          <iframe src={cString} width='100%' height="600" frameborder="0" scrolling="yes"></iframe>
        </div>
      );
    }

  }
}

export default withRouter(Appointment);
