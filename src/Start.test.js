import React from 'react';
import Start from './Start.js';
import { shallow } from 'enzyme';

const startPracticeMock = jest.fn();

describe('End', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Start
        startPractice={startPracticeMock}
      />
    )
  });

  it('should match a snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should fire start practice method when clicked', () => {
    wrapper.find('.start-practice').simulate('click');
    expect(startPracticeMock).toBeCalled();
  });

})