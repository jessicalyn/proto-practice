import React, { Component } from 'react';
import Start from './Start';
import Question from './Question';
import End from './End'

class App extends Component {
  constructor() {
    super();

    this.state = {
      allQuestions: [],
      activeQuestions: [],
      studyGuideQuestions: JSON.parse(localStorage.getItem("studyGuideQuestions")) || [],
      practiceRound: "start",
      //practiceRound options: "start" "flashcards" "end"
      currentIndex: JSON.parse(localStorage.getItem("currentIndex")) || 0
    }
  }

  componentDidMount() {
    console.log("componentDidMount")
    fetch('http://memoize-datasets.herokuapp.com/api/v1/JHprotoPractice')
    .then(response => response.json())
    .then(result => {
      this.setState({allQuestions: this.randomize(result.JHprotoPractice)})
      if(localStorage.hasOwnProperty("activeQuestions")) {
        const storageQuestions = JSON.parse(localStorage.getItem("activeQuestions"));
        this.setState({activeQuestions: storageQuestions})
      }
    })
    .catch(error => {throw new Error(error)})
  }

  randomize = (array) => {
    array = array.sort(() => 0.5 - Math.random());
    return array;
  }

  saveToStorage = (name, dataset) => {
    localStorage.setItem(name, JSON.stringify(dataset))
  }

  startPractice = () => {
    console.log("startPractice")
    if(this.state.activeQuestions.length === 0) {
      this.setState({activeQuestions: this.state.allQuestions})
    }
    this.setState({practiceRound: "flashcards"})
  }

  nextQuestion = () => {
    const {activeQuestions, currentIndex} = this.state
    let roundIndex = activeQuestions.length - 1
    if(currentIndex === roundIndex) {
      this.setState({practiceRound: "end"})
    } else {
      this.setState({currentIndex: currentIndex + 1}, 
      this.saveToStorage("currentIndex", currentIndex + 1))
    }
  }

  addToStudyGuide = (question) => {
    const updateStudyGuide = [...this.state.studyGuideQuestions, question]
    this.saveToStorage("studyGuideQuestions", updateStudyGuide)
    this.setState({studyGuideQuestions: updateStudyGuide})
  }

  useStudyGuide = () => {
    console.log("study guide", this.state.studyGuideQuestions)
    this.saveToStorage("activeQuestions", this.state.studyGuideQuestions)
    this.setState({
      activeQuestions: this.state.studyGuideQuestions, 
      studyGuideQuestions: [], 
      currentIndex: 0,
      practiceRound: "flashcards"
    })
  }

  clearStorage = () => {
    localStorage.clear()
    this.resetGame()
  }

  resetGame = () => {
    this.setState({
      studyGuideQuestions: [], 
      practiceRound: "start", 
      currentIndex: 0,
      activeQuestions: []
    })
  }

  render() {
    console.log("app render")
    const {activeQuestions, practiceRound, currentIndex, studyGuideQuestions} = this.state
    // let currentScore = 30 - studyGuideQuestions.length
    return (
      <div className="App">
        <h1>ProtoPractice</h1>
        <h2>Build your knowledge of array, object, and string prototypes!</h2>
        {
          practiceRound === "start" &&
            <Start
              startPractice={this.startPractice}
              studyGuideQuestions={studyGuideQuestions}
            />
        }
        {
          practiceRound === "flashcards" &&
            <Question 
              currentQuestion={activeQuestions[currentIndex]}
              nextQuestion={this.nextQuestion}
              addToStudyGuide={this.addToStudyGuide}
            />
        }
        {
          practiceRound === "end" &&
            <End
            // currentScore={currentScore}
            studyGuideQuestions={studyGuideQuestions}
            clearStorage={this.clearStorage}
            useStudyGuide={this.useStudyGuide}
            />
        }
      </div>
    );
  }
}

export default App;
