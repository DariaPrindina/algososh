import { ElementStates } from "../../types/element-states";
import { ILetter } from "../../types/string-types";

export const delay = (time: number) => new Promise(
 resolve => setTimeout(resolve, time)
);

export const swap = (arr: ILetter[], i: number, j: number): void => {
  [arr[i], arr[j]] = [arr[j], arr[i]]
} 

export const modifiedStringToArray = (str: string) => {
 return str.toUpperCase().split('').map(item => {
   return {
     value: item,
     state: ElementStates.Default
   }
  })
}