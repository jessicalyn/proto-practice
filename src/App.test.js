import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme'

const mockStudyGuideQuestions = [{
  answerList: ["push", "includes", "shift"],
  category: "Array Prototype",
  correctAnswer: "shift",
  docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift",
  id: "a72913de-36c6-11e9-b210-d663bd873d93",
  img: "images/shift.png"
  },
  {
  answerList: ["shift", "sort", "splice"],
  category: "Array Prototype",
  correctAnswer: "splice",
  docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice",
  id: "a72919d8-36c6-11e9-b210-d663bd873d93",
  img: "images/splice.png"
}];

const mockQuestion = [{
  answerList: ["push", "includes", "shift"],
  category: "Array Prototype",
  correctAnswer: "shift",
  docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift",
  id: "a72913de-36c6-11e9-b210-d663bd873d93",
  img: "images/shift.png",
}];

describe('App', () => {
  const wrapper = shallow(
    <App />
  );

  it('should match a snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have proper default states', () => {
    expect(wrapper.state()).toEqual({"activeQuestions": [], "allQuestions": [], "currentIndex": 0, "practiceRound": "start", "studyGuideQuestions": []})
  })

  it('should start practice round when invoked', () => {
    expect(wrapper.state("practiceRound")).toEqual("start")
    wrapper.instance().startPractice()
    expect(wrapper.state("practiceRound")).toEqual("flashcards")
  })

  it('should move to next available question when invoked', () => {
    wrapper.state.activeQuestions = [30]
    wrapper.state.currentIndex = 0

    wrapper.instance().nextQuestion()
    expect(wrapper.state("currentIndex")).toEqual(1)
  })

  // it('should change practice round state when no available questions', () => {
  //   wrapper.setState({
  //     practiceRound: "flashcards", 
  //     roundIndex: 29, 
  //     currentIndex: 29,
  //   });   

  //   wrapper.instance().nextQuestion();

  //   expect(wrapper.state("practiceRound")).toEqual("end")
  // })

  it('should add incorrect questions to study guide array when invoked', () => {
    expect(wrapper.state("studyGuideQuestions").length).toEqual(0)
    wrapper.instance().addToStudyGuide(mockQuestion)
    expect(wrapper.state("studyGuideQuestions").length).toEqual(1)
  })

  it('should update state for study guide array when invoked', () => {
    wrapper.setState({
      activeQuestions: [30], 
      studyGuideQuestions: mockStudyGuideQuestions, 
      currentIndex: 29,
      practiceRound: "end"
    });

    wrapper.instance().useStudyGuide();

    expect(wrapper.state("activeQuestions")).toEqual(mockStudyGuideQuestions)
    expect(wrapper.state("studyGuideQuestions")).toEqual([])
    expect(wrapper.state("currentIndex")).toEqual(0)
    expect(wrapper.state("practiceRound")).toEqual("flashcards")
  })

  it('should reset state to start when invoked', () => {
    wrapper.setState({
      studyGuideQuestions: mockStudyGuideQuestions, 
      practiceRound: "flashcards", 
      currentIndex: 10,
      activeQuestions: mockQuestion
    });

    wrapper.instance().resetGame();

    expect(wrapper.state("studyGuideQuestions")).toEqual([])
    expect(wrapper.state("practiceRound")).toEqual("start")
    expect(wrapper.state("currentIndex")).toEqual(0)
    expect(wrapper.state("activeQuestions")).toEqual([])
  })


})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
