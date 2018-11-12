import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

// Firebase
var config = {
    apiKey: "AIzaSyCcvypPOfoIdECYkbhJhVRc6T1gA7aOkbU",
    authDomain: "mlrc-5a590.firebaseapp.com",
    databaseURL: "https://mlrc-5a590.firebaseio.com",
    projectId: "mlrc-5a590",
    storageBucket: "mlrc-5a590.appspot.com",
    messagingSenderId: "866673220218"
  };

class Lang_Tutor extends React.Component {
// options for admin: add or delete a language/tutor
// future terations:  adding languages/tutors (and their times) adds new options to the check in form
// lang_tutor should using connected to google calendar

    // handleSubmit

    render() {
      return (
        <div>
          <header>Student Feedback Responses</header> 
          <table style = "width: 100%"> 
              <tr> 
                  <th>Question 1</th>
                  <th>Question 2</th>
                  <th>Question 3</th>
              </tr>
              <tr> 
                  <th>Blah Blah Blah</th>
                  <th>Blah Blah Blah</th>
                  <th>Blah Blah Blah</th>
              </tr>
              <tr> 
                  <th>...</th>
                  <th>>...</th>
                  <th>>...</th>
              </tr>
          
          </table>
        </div>
      )
  }
}

class CheckIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      school: "",
      gradYear: "",
      service: "",
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
    return (
      <form onSubmit={this.handleSubmit}>
        <header>
          <h2> Check in to the MLRC </h2>
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
          School:
          <select
            value={this.state.value}
            name="school"
            type="select"
            placeholder={"Select your school"}
            onChange={this.handleChange}
          >
            <option value="Select your school">Select your School</option>
            <option value="CMC">CMC</option>
            <option value="HMC">HMC</option>
            <option value="Pomona">Pomona</option>
            <option value="Pitzer">Pitzer</option>
            <option value="Scripps">Scripps</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          Graduating in:
          <input
            type="text"
            name="gradYear"
            value={this.state.value}
            placeholder={"e.g., 2019"}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <br />
        <label>
          Visiting the MLRC for:
          <select
            value={this.state.value}
            name="service"
            type="select"
            placeholder={"Select a service"}
            onChange={this.handleChange}
          >
            <option value="Select a service">Select a service</option>
            <option value="Conversation">Conversation</option>
            <option value="Homework">Homework</option>
            <option value="Paper writing">Paper writing</option>
            <option value="Pronunciation">Pronunciation</option>
            <option value="Grammar review">Grammar review</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          in
          <select
            value={this.state.value}
            name="language"
            type="select"
            placeholder={"Select a language"}
            onChange={this.handleChange}
          >
            <option value="Select a language">Select a language</option>
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

export default CheckIn;

// ReactDOM.render(<CheckIn />, document.getElementById("root"));

// const rootElement = document.getElementById("root");
//ReactDOM.render(<App />, rootElement);