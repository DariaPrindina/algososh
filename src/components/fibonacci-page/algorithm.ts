import { SHORT_DELAY_IN_MS } from "../../constants/delays"
import { delay } from "../utils/utils"

export const calculateFibonacci = async(number: number, setArray: any) => {
  let array = [0, 1]
  for (let i = 2; i <= number + 1; i++) {
    array.push(array[i - 1] + array[i - 2])
  }
  for (let i = 0; i < array.length; i++) {
    await delay(SHORT_DELAY_IN_MS)
    setArray(array.slice(0, i))
  }
  return array
}