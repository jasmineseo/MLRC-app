import React from "react";
// import ReactDOM from "react-dom";
import {auth, firebase} from './firebase';
// import "./styles.css";

//const e = React.createElement;

const AppointmentPage = () =>
  <div>
    <Appointment />
  </div>

class Appointment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      school: "",
      email: "",
      language: "",
      date:""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    alert(
      "Your name is " +
        this.state.name +
        "; your email is: " +
        this.state.email +
        "\nYou attend " +
        this.state.school +
        "\nAppointment for " +
        this.state.language
    );
    firebase.database().ref("appointment/" + this.state.date + "/" + this.state.name).set({
      language: this.state.language,
      email: this.state.email,
      school: this.state.school
    });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <header>
          <h2> Schedule an Appointment </h2>
        </header>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={this.state.value}
            placeholder={"Enter your name"}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <br />
        <label>
          Date:
          <input
            type="text"
            name="date"
            value={this.state.value}
            placeholder={"MM-DD-YYYY"}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <br />
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={this.state.value}
            placeholder={"youremail@mail.com"}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <br />
        <label>
          School:
          <select
            value={this.state.value}
            name="school"
            type="select"
            placeholder={"Select your school"}
            onChange={this.handleChange}
          >
            <option value="Select your school">Select your school</option>
            <option value="CMC">CMC</option>
            <option value="HMC">HMC</option>
            <option value="Pomona">Pomona</option>
            <option value="Pitzer">Pitzer</option>
            <option value="Scripps">Scripps</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <br />
        <br />
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
}

export default AppointmentPage;

export {
  Appointment,
}
