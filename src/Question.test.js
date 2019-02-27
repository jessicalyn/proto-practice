import React from 'react';
import Question from './Question.js';
import { shallow } from 'enzyme';

const mockCurrentQuestion = [{
  answerList: ["push", "includes", "shift"],
  category: "Array Prototype",
  correctAnswer: "shift",
  docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift",
  id: "a72913de-36c6-11e9-b210-d663bd873d93",
  img: "images/shift.png",
}];
const nextQuestionMock = jest.fn();
const addToStudyGuideMock = jest.fn();
const mockedEvent = "shift"

describe('Question', () => {
  const wrapper = shallow(
    <Question 
      currentQuestion={mockCurrentQuestion}
      nextQuestion={nextQuestionMock}
      addToStudyGuide={addToStudyGuideMock}
    />
  );

  it('should match a snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have default state', () => {
    expect(wrapper.state()).toEqual({contentDisplayed: "question"})
  });

  it('should check to make sure the answer is correct', () => {
    expect(wrapper.state("contentDisplayed")).toEqual("question")
    wrapper.instance().checkAnswer(mockedEvent)
    expect(wrapper.state("contentDisplayed")).toEqual("correct")
  })

  it('should fire next question method when clicked', () => {
    wrapper.find('.next-question').simulate('click');
    expect(nextQuestionMock).toBeCalled();
  });

  it('should fire add to study guide method when clicked', () => {
    wrapper.instance().checkAnswer(mockedEvent)
    expect(addToStudyGuideMock).toBeCalled();
  });

  it('should fire check answer method when clicked', () => {
    wrapper.find('.answer-buttons').simulate('click', mockedEvent);
    expect(checkAnswerMock).toBeCalled();
  });

})