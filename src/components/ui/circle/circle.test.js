import React from 'react';
import { Circle } from "./circle"
import renderer from 'react-test-renderer';
import { ElementStates } from '../../../types/element-states';

describe('circle test', () => {

  it('circle without letter', () => {
    const circle = renderer
      .create(<Circle />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('circle with letter', () => {
    const circle = renderer
      .create(<Circle letter='V' />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('circle with head', () => {
    const circle = renderer
      .create(<Circle head='V' />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('circle with react element in head', () => {
    const circle = renderer
      .create(<Circle head={<Circle />} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  })
  
  it('circle with tail', () => {
    const circle = renderer
      .create(<Circle tail='V' />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('circle with react element in tail', () => {
    const circle = renderer
      .create(<Circle tail={<Circle />} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('circle with index', () => {
    const circle = renderer
      .create(<Circle index='3' />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('circle with prop isSmall === true', () => {
    const circle = renderer
      .create(<Circle isSmall={true} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('circle in Default state', () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('circle in Changing state', () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('circle in Modified state', () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  })
})