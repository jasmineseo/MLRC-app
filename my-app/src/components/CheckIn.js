import React from "react";
// import ReactDOM from "react-dom";
import {auth, firebase} from './firebase';
import "./styles.css";
//import {sendEmailConfirmation} from "../../functions/index";

/*const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  }
});
*/


const CheckInPage = () =>
  <div>
    <CheckIn />
  </div>

class CheckIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "", 
      school: "",
      year: "",
      service: "",
      language: "",
      date:""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
/*
  async sendEmail(email) { 
    const mailOptions = {
      from: '"Modern Language Resource Center" <mlrc@scrippscollege.edu>',
      to: email, //val.email
    };
  
    //const subscribed = val.subscribedToMailingList;
  
    // Building Email message.
    mailOptions.subject = 'Thanks for visiting the MLRC!';
    mailOptions.text = 
        '<p>Thanks for visiting the Modern Language Resource Center!</p>\
        <p>If you have a chance, please give us your feedback \
        <a href="https://mlrc-5a590.firebaseapp.com">here</a>. Your feedback \
        helps us make the MLRC better!';
  
    try {
      await mailTransport.sendMail(mailOptions);
      return console.log("email sent to", email);
    }
    catch (error) {
      return console.error('There was an error while sending the email:', error);
    }
    return null;
  } 
*/
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    alert(
      "Your name is " +
        this.state.name +
        "\nYour email is " + 
        this.state.email + 
        "\nYou attend " +
        this.state.school +
        "; Class year: " +
        this.state.year +
        "\nVisiting the MLRC for " +
        this.state.service +
        " in " +
        this.state.language
    );
    firebase.database().ref("checkin/" + this.state.date + "/" + this.state.name).set({
      language: this.state.language,
      year: this.state.year,
      service: this.state.service,
      school: this.state.school
    });
    firebase.database().ref("checkinemails/" + this.state.name).set({
      email: this.state.email,
    });
    /*firebase.database().ref("checkinemails/").set( {
      email: this.state.email,
    });*/
    //this.sendEmail(this.state.email);
    document.getElementById("checkInForm").reset();
    event.preventDefault();

  }

  render() {
    return (
      <form id="checkInForm" onSubmit={this.handleSubmit}>
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
          Class year:
          <select
            type="select"
            name="year"
            value={this.state.value}
            placeholder={"class year"}
            onChange={this.handleChange}
          >
            <option value="Select your year">Select your year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
            <option value="Other">Other</option>
          </select>
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

export default CheckInPage;

export {
  CheckIn,
};

// ReactDOM.render(<CheckIn />, document.getElementById("root"));

// const rootElement = document.getElementById("root");
//ReactDOM.render(<App />, rootElement);
