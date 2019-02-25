import React, { Component } from 'react';
import Question from './Question'

class App extends Component {
  constructor() {
    super();

    this.state = {
      allQuestions: [],
      studyGuideQuestions: [],
      practiceActive: false,
      currentQuestionIndex: 0,
      error: '',
    }
  }

  componentDidMount() {
    fetch('http://memoize-datasets.herokuapp.com/api/v1/JHprotoPractice')
    .then(response => response.json())
    .then(result => {
      this.setState({
        allQuestions: result.JHprotoPractice,
      })
    })
    .catch(error => {
      this.setState({error: error.message})
    })
  }


  startPractice = () => {
    this.setState({practiceActive: true})
  }

  nextQuestion = () => {
    //need if conditional to reset when index is more than number of questions
    this.setState({currentQuestionIndex: this.state.currentQuestionIndex + 1})
  }

  updateStudyGuide = (questionid) => {
    const updatedStudyGuide = [...this.state.studyGuideQuestions, questionid]
    localStorage.setItem("studyGuideQuestions", JSON.stringify(updatedStudyGuide))
    this.setState({studyGuideQuestions: updatedStudyGuide})
  }

  render() {
    const {allQuestions, currentQuestionIndex} = this.state
    return (
      <div className="App">
        {this.state.error && <p>{this.state.error}</p>}
        <h1>ProtoPractice</h1>
        <h2>Build your knowledge of array, object, and string prototypes!</h2>
        <h3>For each question you'll see an image of a prototype problem with the prototype name missing. Choose the correct prototype from the answers listed below.</h3>
        <h3>Answers missed with be added to your study guide for futher practice.</h3>
        <button onClick={this.startPractice}>Start Practicing</button>
        <button>Show Study Guide</button>
        <button>Reset Study Guide</button>
        {
          this.state.practiceActive &&
          <Question 
            currentQuestion={allQuestions[currentQuestionIndex]}
            nextQuestion={this.nextQuestion}
            updateStudyGuide={this.updateStudyGuide}
          />
        }
      </div>
    );
  }
}

export default App;
