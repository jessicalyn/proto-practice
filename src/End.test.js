import React from 'react';
import End from './End.js';
import { shallow } from 'enzyme';

const mockStudyGuideQuestions = [{
  answerList: ["push", "includes", "shift"],
  category: "Array Prototype",
  correctAnswer: "shift",
  docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift",
  id: "a72913de-36c6-11e9-b210-d663bd873d93",
  img: "images/shift.png",
  },
  {
  answerList: ["push", "includes", "shift"],
  category: "Array Prototype",
  correctAnswer: "shift",
  docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift",
  id: "a72913de-36c6-11e9-b210-d663bd873d93",
  img: "images/shift.png",
}];
const clearStorageMock = jest.fn();
const useStudyGuideMock = jest.fn();

describe('End', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <End
        studyGuideQuestions={mockStudyGuideQuestions}
        clearStorage={clearStorageMock}
        useStudyGuide={useStudyGuideMock}
      />
    )
  });

  it('should match a snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should fire clear storage method when clicked', () => {
    wrapper.find('.start-over').simulate('click');
    expect(clearStorageMock).toBeCalled();
  });

  it('should fire use study guide method when clicked', () => {
    wrapper.find('.study-guide').simulate('click');
    expect(useStudyGuideMock).toBeCalled();
  });

})