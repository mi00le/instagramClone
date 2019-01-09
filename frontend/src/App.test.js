import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { shallow } from 'enzyme'

it('renders without crashing', () => {
  const fn = jest.fn()
  const wrapper = shallow(<App getUser={fn} />);
  expect(wrapper).toBeTruthy()
});
