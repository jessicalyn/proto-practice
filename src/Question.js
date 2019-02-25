import React, {Component} from 'react';

export default class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contentDisplayed: "question"
    }
  }

  resetContentDisplay = () => {
    this.setState({contentDisplayed: "question"}, this.props.nextQuestion)
  }

  handleClick = (e) => {
    if(this.props.currentQuestion.correctAnswer === e.target.innerText) {
      this.setState({contentDisplayed: "correct"})
    } else {
      this.props.updateStudyGuide(this.props.currentQuestion.id)
      this.setState({contentDisplayed: "incorrect"})
    }
  }

  render = () => {
    console.log("this question", this.props.currentQuestion)
    return (
      <div>
      { this.state.contentDisplayed === "question" &&
        <section className="question-container">
          <h3>Select the prototype below to insert into the highlighted section</h3> 
          <img src={this.props.currentQuestion.img} alt="question image" />
          <div>
            { 
              this.props.currentQuestion.answerList.map(answer => {
                return (
                  <button className="answer-buttons" key={answer} onClick={this.handleClick}>{answer}</button>)
              })
            }
          </div>
        </section>
      }
      { this.state.contentDisplayed === "incorrect" &&
        <section className="incorrect-answer question-container">
          <p>You're wrong</p>
          <button onClick={this.resetContentDisplay}>Next Question</button>
        </section>
      }
      { this.state.contentDisplayed === "correct" &&
        <section className="correct-answer question-container">
          <p>You're right!</p>
          <button onClick={this.resetContentDisplay}>Next Question</button>
        </section>
      }
      </div>
      )
  }
}