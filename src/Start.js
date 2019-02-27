import React, {Component} from 'react';

export default class Start extends Component {

  render = () => {
    return (
      <div>
        <h2>How to Play</h2>
        <h3>For each question you will see an image of a prototype problem with the prototype name missing. Choose the correct prototype from the answers listed below.</h3>
        <h3>Answers missed with be added to your study guide for futher practice.</h3>
        <button className="start-practice large-button" onClick={this.props.startPractice}>Start Practicing</button>
      </div>
    )
  }
}