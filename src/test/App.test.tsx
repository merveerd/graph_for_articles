import React from 'react';
import App from '../components/App';
import { render, fireEvent, within } from '@testing-library/react';

it('renders without crashing', () => {
  render(<App />);
});

it('renders Account header', () => {
  const wrapper = render(<App />);
  // const inputArea = <h1>Display Active Users Account Details</h1>;
  // expect(wrapper.contains(inputArea)).toEqual(true);
});
