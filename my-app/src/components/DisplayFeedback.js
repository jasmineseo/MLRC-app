import React from "react";
import { render } from "react-dom";
import ReactTable from 'react-table';
import "react-table/react-table.css";
// import "./styles.css";


// install react-table
//  npm install react-table


// TODO: fetch data from firebase

class DisplayFeedback extends React.Component {
  
  // constructor(){
  //   super();
  //   this.state = {
  //     data: 
  //   };
  // }

  getTrProps = (state, rowInfo, instance) => {
    if (rowInfo) {
      return {
        style: {
          height: 100
        }
      }
    }
    return {};
  }



  render() {

    const data = [{
      language: 'Spanish',
      question1: "Homework",
      question2: "My tutor could not answer my questions.",
      question3: "No"
      },{
        language: 'French',
        question1: "I reviewed French vocabulary words for an upcoming test for French 44",
        question2: "My tutor, Sarah, was extremely helfpul and friendly.",
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
      }
    ]

    return (
      <div>
        <header>
          <h2> View student feedback </h2>
        </header>
        <ReactTable
          data={data}
          columns={[
            {
              // Header: () => (
              //   <span> 
              //     <i style={height: /> Language
              //   </span>
              // ),
              Header: "Language",
              accessor: "language",
              style: { 'white-space': 'unset' },
              maxWidth: 120
            },
            {
              Header: "What did you work on during your session?",
              accessor: "question1",
              style: { 'white-space': 'unset' }
            },
            {
              Header: 'Who helped you today? Was your tutor/consultant helpful and knowledgable?',
              accessor: "question2",
              style: { 'white-space': 'unset' }
            },
            {
              Header: 'Do you think you will return to the MLRC in the future? Why or why not?',
              accessor: "question3",
              style: { 'white-space': 'unset' }
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
          getTrProps={this.getTrProps}
        />
        <br />
      </div>
    );
  }
}

render(<DisplayFeedback />, document.getElementById("root"));

export default DisplayFeedback;
