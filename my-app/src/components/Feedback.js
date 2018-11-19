import React from "react";
// import ReactDOM from "react-dom";
// import "./styles.css";
import {auth,firebase} from './firebase';

const FeedbackPage = () =>
  <div>
    <Feedback />
  </div>

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "",
      language: "",
      question1: "",
      question2: "",
      question3: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    firebase.database().ref("feedback/" + this.state.date+"/"+this.state.language).set({
      question1: this.state.question1,
      question2: this.state.question2,
      question3: this.state.question3,
    });
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <header>
          <h2> Send us feedback! </h2>
        </header>
        <label>
          Which language did you visit for?
          <br />
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
          Question 1?
          <br />
          <textarea
            type="text"
            name="question1"
            value={this.state.value}
            placeholder={"Type your answer to question 1 here!"}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <br />
        <label>
          Question 2?
          <br />
          <textarea
            type="text"
            name="question2"
            value={this.state.value}
            placeholder={"Type your answer to question 2 here!"}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <br />
        <label>
          Question 3?
          <br />
          <textarea
            type="test"
            name="question3"
            value={this.state.value}
            placeholder={"Type your answer to question 3 here!"}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default FeedbackPage;

export { 
  Feedback,
}