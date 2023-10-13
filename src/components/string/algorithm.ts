import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { modifiedStringToArray, swap, delay } from "../utils/utils";

export const reverseString = async (
  values: string,
  setLoader: any,
  setArray: any
) => {
  const value = modifiedStringToArray(values);
  setLoader(true);

  for (let i = 0; i < value.length / 2; i++) {
    let j = value.length - 1 - i;
    await delay(DELAY_IN_MS);

    if (value.length === 1) {
      value[i].state = ElementStates.Modified;
      setArray([...value]);
    }

    if (i === j) {
      value[i].state = ElementStates.Modified;
      setArray([...value]);
    }

    if (i !== j) {
      value[i].state = ElementStates.Changing;
      value[j].state = ElementStates.Changing;

      setArray([...value]);
      swap(value, i, j);
      await delay(DELAY_IN_MS);

      value[i].state = ElementStates.Modified;
      value[j].state = ElementStates.Modified;

      setArray([...value]);
    }
  }

  setLoader(false);
  return value;
};
