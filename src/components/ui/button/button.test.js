import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from './button';
import { render, screen, fireEvent } from '@testing-library/react';

describe('button test', () => {

  it('button with text', () => {
    const button = renderer
      .create(<Button text="text" />)
      .toJSON();
    expect(button).toMatchSnapshot();
  }); 

  it('button without text', () => {
    const button = renderer
      .create(<Button />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });

  it('button is disabled', () => {
    const button = renderer
      .create(<Button disabled />)
      .toJSON();
    expect(button).toMatchSnapshot();
  }); 

  it('button with loader', () => {
    const button = renderer
      .create(<Button isLoader={true} />)
      .toJSON();
    expect(button).toMatchSnapshot();
  }); 

  it('click on the button causes a callback ', () => {
    window.alert = jest.fn();
    render(<Button text='text' onClick={() => {alert('Everything is right')}}/>)
    const button = screen.getByText("text");
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith('Everything is right');
  }); 
})