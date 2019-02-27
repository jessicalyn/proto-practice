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

  checkAnswer = (e) => {
    const {currentQuestion, addToStudyGuide} = this.props
    if(currentQuestion.correctAnswer === e.target.innerText) {
      this.setState({contentDisplayed: "correct"})
    } else {
      addToStudyGuide(currentQuestion)
      this.setState({contentDisplayed: "incorrect"})
    }
  }

  render = () => {
    const {contentDisplayed} = this.state
    const {currentQuestion} = this.props
    return (
      <div>
      { contentDisplayed === "question" &&
        <section className="question-container">
          <h3>Select the prototype below to insert into the highlighted section</h3> 
          <img src={currentQuestion.img} alt="current question" />
          <div className="answer-buttons-container">
            { 
              currentQuestion.answerList.map(answer => {
                return (
                  <button className="answer-buttons" key={answer} onClick={this.checkAnswer}>{answer}</button>)
              })
            }
          </div>
        </section>
      }
      { contentDisplayed === "incorrect" &&
        <section className="incorrect-answer question-container">
          <h2>OOPS!</h2>
          <h2>The correct answer is: {this.props.currentQuestion.correctAnswer}</h2>
          <h3>This question was added to your Study Guide.</h3>
          <h3>View the <a href={this.props.currentQuestion.docs} target="_blank">MDN web docs</a> to learn more about {this.props.currentQuestion.correctAnswer}.</h3>
          <button className="large-button" onClick={this.resetContentDisplay}>Next Question</button>
        </section>
      }
      { contentDisplayed === "correct" &&
        <section className="correct-answer question-container">
          <h2>Correct!</h2>
          <button className="large-button" onClick={this.resetContentDisplay}>Next Question</button>
        </section>
      }
      </div>
      )
  }
}