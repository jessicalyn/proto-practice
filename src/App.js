import React, { Component } from 'react';
import { protoPractice } from './protoPractice'

class App extends Component {
  constructor() {
    super();

    this.state = {
      allQuestions: protoPractice,
      studyGuideQuestions: [],
      practiceActive: false
    }
  }

  // componentDidMount() {
  //   this.setState({allQuestions: protoPractice})
  // }
  startPractice() {

  }

  render() {
    return (
      <div className="App">
        <h1>ProtoPractice</h1>
        <h2>Build your knowledge of array, object, and string prototypes!</h2>
        <h3>For each question you'll see an image of a prototype problem with the prototype name missing. Choose the correct prototype from the answers listed below.</h3>
        <h3>Answers missed with be added to your study guide for futher practice.</h3>
        <button onClick={this.startPractice}>Start Practicing</button>
        <button>Reset Study Guide</button>
        <Question allQuestions/>
      </div>
    );
  }
}

export default App;
