import React, { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { reverseString } from "./algorithm";
import { modifiedStringToArray } from "../utils/utils";
import { ILetter } from "../../types/string-types";

export const StringComponent: React.FC = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [values, setValues] = useState<string>("");
  const [array, setArray] = useState<ILetter[]>([]);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setValues(evt.target.value);
  };

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setArray(modifiedStringToArray(values));
    await reverseString(values, setLoader, setArray);
    setValues("");
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.elements} onSubmit={handleSubmit}>
        <div className={styles.input}>
          <Input
            name="str"
            value={values}
            onChange={handleChange}
            maxLength={11}
            extraClass={styles.input__string}
          ></Input>
          <span className={styles.span}>Максимум 11 символов</span>
        </div>
        <Button isLoader={loader} type="submit" text="Развернуть"></Button>
      </form>
      <div className={styles.circles}>
        {array.map((item, index) => {
          return (
            <Circle
              key={index}
              letter={item.value}
              state={item.state}
            ></Circle>
          );
        })}
      </div>
    </SolutionLayout>
  );
};
