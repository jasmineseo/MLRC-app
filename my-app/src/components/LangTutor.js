import React from "react";
import {firebase} from './firebase';
import "./styles.css";


class LangTutor extends React.Component {
// options for admin: add or delete a language/tutor
// future terations:  adding languages/tutors (and their times) adds new options to the check in form
// lang_tutor should using connected to google calendar

  // handleSubmit

  constructor(props){
    super(props);

    this.state = {
      name: "",
      language: "",
      email: "",
      tutorTime: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event){
    alert(
      "Tutor " +
      this.state.name + 
      " for " +
      this.state.language +
      " has been added.\n " +
      "Tutoring sessions: " +
      this.state.tutorTime
    );

    firebase.database().ref("tutor/" + this.state.name).set({
      language: this.state.language,
      email: this.state.email,
      tutorTime: this.state.tutorTime,
    });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <header>
          <h2> Add a new MLRC tutor. </h2>
        </header>
        <label>
          Tutor Name:
          <input
            type = "text"
            name = "name"
            value = {this.state.value}
            placeholder = {"Enter tutor name"}
            onChange = {this.handleChange}
            />
        </label>
        <br/>
        <br/>

        <label>
          Language:
          <select
          value = {this.state.value}
          name = "language"
          type = "select"
          placeholder = {"Select language"}
          onChange = {this.handleChange}>
            <option value="Select a language">Select a language</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Italian">Italian</option>
            <option value="Korean">Korean</option>
            <option value="Spanish">Spanish</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <br/>
        <br/>

        <label>
          Email: 
          <input
            type = "text"
            name = "email"
            value = {this.state.value}
            placeholder = {"Enter tutor email address"}
            onChange = {this.handleChange}
            />
        </label>
        <br/>
        <br/>

        <label>
          Tutoring time: 
          <input
            type = "text"
            name = "tutorTime"
            value = {this.state.value}
            placeholder = {"Enter tutor time (i.e. Wednesday 6-8pm)"}
            onChange = {this.handleChange}
            />
        </label>
        <br/>
        <br/>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default LangTutor;

// ReactDOM.render(<CheckIn />, document.getElementById("root"));

export {
  LangTutor,
};
