import React from "react";
import { render } from "react-dom";
import ReactTable from 'react-table';
import "react-table/react-table.css";
import {firebase} from './firebase';
import "./react-table.css";
// import "./styles.css";




class DisplayFeedback extends React.Component {
  

  getFeedback(){
    var dicts = [];
    var ref = firebase.database().ref("feedback");
    ref.on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var curDict = {language: childSnapshot.val()['language'],
                      question1: childSnapshot.val()['question1'],
                      question2: childSnapshot.val()['question2'],
                      question3: childSnapshot.val()['question3']};
        dicts.push(curDict);
        console.log(typeof curDict, "curDict is", curDict);
      });
    });
    console.log("feedbacks: ", dicts);
    return dicts;
  }



  // constructor(){
  //   super();
  //   this.state = {
  //     data: []
  //   };
  //   this.fetchData = this.fetchData.bind(this);
  // }

  // fetchData(){
  //   this.setState({
  //     data: this.getFeedback()
      
  //   });
  //   // const feedback = this.getFeedback();
  //   // this.state.data = this.setState({ data: feedback});
  //   // console.log(this.state.data);
  // }

  render() {

    
    const feedbackdata = this.getFeedback();
    console.log("data in render:", feedbackdata);
    console.log("feedback type: ", typeof feedbackdata);
    console.log("feedback element type: ", typeof feedbackdata[0]);
    const data = [{
      language: 'Spanish',
      question1: "Homework",
      question2: "My tutor could not answer my questions.",
      question3: "No"
      },{
        language: 'French',
        question1: "I reviewed French vocabulary words for an upcoming test for French 44",
        question2: "My tutor, Sarah, was extremely helpful and friendly.",
        question3: "I will defintely visit the MLRC again."
      },{
        language: 'Arabic',
        question1: "The tutor reviewed my Arabic presentation that I have give for my Arabic class.",
        question2: "I forgot her name.",
        question3: "Maybe"
      }, {
        language: 'French',
        question1: "I worked on my essay for French 33.",
        question2: "The French tutor, Julia, helped me translate some words and corrected my grammatical errors. She is very considerate and patient even when I didn't understand some of her explanations.",
        question3: "Yes! I would come again."
      }];

    // const feedbackdata = this.state;
    return (
      <div>
        <header>
          <h2> View student feedback </h2>
        </header>
        <ReactTable
          data={feedbackdata}
          minRows={0}
          columns={[
            {
              Header: <b>Language</b>,
              accessor: "language",
              maxWidth: 150,
              headerStyle: { 'white-space': 'unset' },
            },
            {
              Header: <b>What did you work on during your session?</b>,
              accessor: "question1",
              style: { 'white-space': 'unset' },
              headerStyle: { 'white-space': 'unset' }
            },
            {
              Header: <b>Who helped you today? Was your tutor/consultant helpful and knowledgable?</b>,
              accessor: "question2",
              style: { 'white-space': 'unset' },
              headerStyle: { 'white-space': 'unset' }
            },
            {
              Header: <b>Do you think you will return to the MLRC in the future? Why or why not?</b>,
              accessor: "question3",
              style: { 'white-space': 'unset' },
              headerStyle: { 'white-space': 'unset' }
            }
          ]}
          defaultSorted={[
            {
              id: "language",
              desc: false
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div> 
    );
  }
}

render(<DisplayFeedback />, document.getElementById("root"));

export default DisplayFeedback;
