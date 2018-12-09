import React from "react";
import { render } from "react-dom";
import ReactTable from 'react-table';
import "react-table/react-table.css";
import {firebase} from './firebase';
import "./react-table.css";


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

  render() {
    const feedbackData = this.getFeedback();

    return (
      <div>
        <header>
          <h2> View student feedback </h2>
        </header>
        <ReactTable
          data={feedbackData}
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
