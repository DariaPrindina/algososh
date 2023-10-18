<<<<<<< HEAD
=======
import { Dispatch, SetStateAction } from "react";
>>>>>>> month-12/step-1
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { ISortingArray } from "../../types/sorting-page-types";
import { delay } from "../utils/utils";

export const crateRandomNumber = (min: number, max: number) => {
  if (max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return Math.floor(Math.random() * (min + 1));
  }
};

export const createRandomArray = (limit: number, min: number, max: number) => {
  let arr = new Array(limit);
  for (let i = 0; i < limit; i++) {
    arr[i] = {
      number: crateRandomNumber(min, max),
      state: ElementStates.Default
    };
  }
  return arr;
};

const swap = (arr: ISortingArray[], i: number, j: number): void => {
  [arr[i], arr[j]] = [arr[j], arr[i]]
};

<<<<<<< HEAD
export const selectionSortMin = async(arr: ISortingArray[], setArray: any, setLoader: any) => {
=======
export const selectionSortMin = async(
    arr: ISortingArray[], 
    setArray: Dispatch<SetStateAction<ISortingArray[]>>, 
    setLoader: Dispatch<SetStateAction<boolean>>
  ) => {
>>>>>>> month-12/step-1
  setLoader(true)
  const { length } = arr; 
  if(!length) return
  for (let i = 0; i < length; i++) {
    let maxInd = i;
    arr[i].state = ElementStates.Changing
    setArray([...arr])
    for (let j = i + 1; j < length; j++) {
      arr[j].state = ElementStates.Changing
      setArray([...arr])
      await delay(SHORT_DELAY_IN_MS)
      if (arr[j].number > arr[maxInd].number) {
        maxInd = j;
      }
      arr[j].state = ElementStates.Default
      setArray([...arr])
    }
    if (maxInd !== i) {
      swap(arr, i, maxInd);
      arr[maxInd].state = ElementStates.Default
    }
    arr[i].state = ElementStates.Modified
    setArray([...arr])
  }
  setLoader(false)
};

<<<<<<< HEAD
export const selectionSortMax = async(arr: ISortingArray[], setArray: any, setLoader: any) => {
=======
export const selectionSortMax = async(
    arr: ISortingArray[], 
    setArray: Dispatch<SetStateAction<ISortingArray[]>>, 
    setLoader: Dispatch<SetStateAction<boolean>>
  ) => {
>>>>>>> month-12/step-1
  setLoader(true)
  const { length } = arr; 
  if(!length) return
  for (let i = 0; i < length; i++) {
    let minInd = i;
    arr[i].state = ElementStates.Changing
    setArray([...arr])
    for (let j = i + 1; j < length; j++) {
      arr[j].state = ElementStates.Changing
      setArray([...arr])
      await delay(SHORT_DELAY_IN_MS)
      if (arr[j].number < arr[minInd].number) {
        minInd = j;
      }
      arr[j].state = ElementStates.Default
      setArray([...arr])
    }
    if (minInd !== i) {
      swap(arr, i, minInd);
      arr[minInd].state = ElementStates.Default
    }
    arr[i].state = ElementStates.Modified
    setArray([...arr])
  }
  setLoader(false)
}

<<<<<<< HEAD
export const bubbleSortMin = async(arr: ISortingArray[], setArray: any, setLoader: any) => {
=======
export const bubbleSortMin = async(
    arr: ISortingArray[], 
    setArray: Dispatch<SetStateAction<ISortingArray[]>>, 
    setLoader: Dispatch<SetStateAction<boolean>>
  ) => {
>>>>>>> month-12/step-1
  setLoader(true)
  const { length } = arr; 
  if(!length) return
  setArray([...arr])
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      arr[j].state = ElementStates.Changing
      arr[j + 1].state = ElementStates.Changing
      setArray([...arr])
      await delay(SHORT_DELAY_IN_MS)
      if (arr[j].number < arr[j + 1].number) {
        swap(arr, j, j + 1)
      }
      arr[j].state = ElementStates.Default
      arr[j + 1].state = ElementStates.Default
    }
    arr[length - i - 1].state = ElementStates.Modified
    setArray([...arr])
  }
  setLoader(false)
} 

<<<<<<< HEAD
export const bubbleSortMax = async(arr: ISortingArray[], setArray: any, setLoader: any) => {
=======
export const bubbleSortMax = async(
    arr: ISortingArray[], 
    setArray: Dispatch<SetStateAction<ISortingArray[]>>, 
    setLoader: Dispatch<SetStateAction<boolean>>
  ) => {
>>>>>>> month-12/step-1
  setLoader(true)
  const { length } = arr; 
  if(!length) return
  setArray([...arr])
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      arr[j].state = ElementStates.Changing
      arr[j + 1].state = ElementStates.Changing
      setArray([...arr])
      await delay(SHORT_DELAY_IN_MS)
      if (arr[j].number > arr[j + 1].number) {
        swap(arr, j, j + 1)
      }
      arr[j].state = ElementStates.Default
      arr[j + 1].state = ElementStates.Default
    }
    arr[length - i - 1].state = ElementStates.Modified
    setArray([...arr])
  }
  setLoader(false)
} 