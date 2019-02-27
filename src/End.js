import React, {Component} from 'react';

export default class End extends Component {

  render = () => {
    const {studyGuideQuestions, useStudyGuide, clearStorage} = this.props
    return (
      <div className="question-container">
        { studyGuideQuestions.length === 0 &&
          <div>
            <h2>Congrats, you completed ProtoPractice!</h2>
            <button className="start-over large-button" onClick={clearStorage}>Start Over</button>
          </div>
        }
        { studyGuideQuestions.length >= 1 &&
          <div>
            <h2>Keep Going!</h2>
            <h3>You have {studyGuideQuestions.length} questions in your Study Guide.</h3>
            <button className="study-guide large-button" onClick={useStudyGuide}>Practice Study Guide</button>
            <button className="start-over large-button" onClick={clearStorage}>Start Over</button>
          </div>
        }
      </div>
    )
  }
}

