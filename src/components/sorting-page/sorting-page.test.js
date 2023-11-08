import { ElementStates } from "../../types/element-states"
import { bubbleSort, selectionSort } from "./algorithm"


describe('Testing sorting algorithms by selection and bubble', () => {
  const setLoader = jest.fn()
  const setArray = jest.fn()
  const arrSortMax = [
      {number: '1', state: ElementStates.Modified},
      {number: '2', state: ElementStates.Modified},
      {number: '3', state: ElementStates.Modified}
  ]
  const arrSortMin = [
      {number: '3', state: ElementStates.Modified},
      {number: '2', state: ElementStates.Modified},
      {number: '1', state: ElementStates.Modified}
  ]

  const arrOneEl = [
    {number: '1', state: ElementStates.Modified} 
  ]

  const numbersDefault = [
    {number: '2', state: ElementStates.Default},
    {number: '3', state: ElementStates.Default},
    {number: '1', state: ElementStates.Default}
  ]

  const oneNumberDefault = [
    {number: '1', state: ElementStates.Default}
  ]

  const emptyArray = []

  it('Correct sorting by ascending selection of an empty array', async() => {
    await selectionSort(emptyArray, setArray, setLoader, false)
    expect(setArray).toBeCalledTimes(0)
  })

  it('Correct sorting by ascending selection of an array of one element', async() => {
    await selectionSort(oneNumberDefault, setArray, setLoader, false)
    expect(setArray).toHaveBeenLastCalledWith(arrOneEl)
  })

  it('Correct selection sorting by ascending of an array of several elements', async() => {
    await selectionSort(numbersDefault, setArray, setLoader, false)
    expect(setArray).toHaveBeenLastCalledWith(arrSortMax)
  })

  it('Correct selection sorting by descending of an array of several elements', async() => {
    await selectionSort(numbersDefault, setArray, setLoader, true)
    expect(setArray).toHaveBeenLastCalledWith(arrSortMin)
  })

  it('Correct bubble sorting by ascending of an array of several elements', async() => {
    await bubbleSort(numbersDefault, setArray, setLoader, false)
    expect(setArray).toHaveBeenLastCalledWith(arrSortMax)
  })

  it('Correct bubble sorting by descending of an array of several elements', async() => {
    await bubbleSort(numbersDefault, setArray, setLoader, true)
    expect(setArray).toHaveBeenLastCalledWith(arrSortMin)
  })
})