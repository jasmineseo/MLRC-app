import React from "react";
// import ReactDOM from "react-dom";
// import "./styles.css";
import {auth,firebase} from './firebase';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

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
    firebase.database().ref("feedback/" + this.state.date).set({
      language: this.state.language,
      question1: this.state.question1,
      question2: this.state.question2,
      question3: this.state.question3,
    });
    event.preventDefault();
    console.log(this.state);
    document.getElementById("feedbackForm").reset();
  }

  render() {
    return (
      <form id="feedbackForm" onSubmit={this.handleSubmit}>
        <header>
          <h2> Send us feedback! </h2>
        </header>
        <FormControl>
        <InputLabel>
          Which language did you visit for?
          </InputLabel>
          <Select
            value={this.state.value}
            name="language"
            /*placeholder={"Select a language"}*/
            onChange={this.handleChange}
          >
            <MenuItem value="Arabic">Arabic</MenuItem>
            <MenuItem value="French">French</MenuItem>
            <MenuItem value="German">German</MenuItem>
            <MenuItem value="Italian">Italian</MenuItem>
            <MenuItem value="Korean">Korean</MenuItem>
            <MenuItem value="Spanish">Spanish</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
          </FormControl>
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

export default withStyles(styles)(FeedbackPage);

export { 
  Feedback,
}