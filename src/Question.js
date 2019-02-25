import React, {Component} from 'react';

export default class Question extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    console.log("this question", this.props.allQuestions[0])
    return (
      <section className="question-container">
        <h3>Select the prototype below to insert into the highlighted section</h3> 
        <img src={this.props.allQuestions[0].img} />
        <div>
          { 
            this.props.allQuestions[0].answerList.map(answer => {
              return (
                <button className="answer-buttons" key={answer}>{answer}</button>)
            })
          }
        </div>
      </section>
      )
  }
}