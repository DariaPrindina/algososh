import React from "react"
import { reverseString } from "./algorithm"
import { modifiedStringToArray } from "../utils/utils"
import { ElementStates } from "../../types/element-states"


describe('testing the string reversal algorithm', () => {
  const setLoader = jest.fn()
  const setArray = jest.fn()

  it('reversal of a line with an even number of characters', async() => {
    const str = 'ABCD'
    const result = await reverseString(str, setLoader, setArray)
    expect(result).toEqual([
      {value: 'D', state: ElementStates.Modified},
      {value: 'C', state: ElementStates.Modified},
      {value: 'B', state: ElementStates.Modified},
      {value: 'A', state: ElementStates.Modified}
    ])
  })

  it('reversal of a string with an odd number of characters', async() => {
    const str = 'ABC'
    const result = await reverseString(str, setLoader, setArray)
    expect(result).toEqual([
      {value: 'C', state: ElementStates.Modified},
      {value: 'B', state: ElementStates.Modified},
      {value: 'A', state: ElementStates.Modified}
    ])
  })

  it('reversal of a single-character string', async() => {
    const str = 'A'
    const result = await reverseString(str, setLoader, setArray)
    expect(result).toEqual([
      {value: 'A', state: ElementStates.Modified}
    ])
  })

  it('reversal of an empty line', async() => {
    const str = ''
    const result = await reverseString(str, setLoader, setArray)
    expect(result).toEqual([])
  })

})