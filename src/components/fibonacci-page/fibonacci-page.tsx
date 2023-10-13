import React, { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './fibonacci.module.css'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { calculateFibonacci } from "./algorithm";
import { nanoid } from "nanoid";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const [loader, setLoader] = useState<boolean>(false)
  const [value, setValue] = useState<string | number>('')
  const [array, setArray] = useState<number[]>([])
  let number = Number(value)

  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setValue(evt.target.value)
  }

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    setLoader(true)
    await calculateFibonacci(number, setArray)
    setLoader(false)
  }

  const handleClear = () => {
    setArray([])
    setValue('')
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.elements} onSubmit={handleSubmit}>
        <div className={styles.input}>
          <Input 
            name="number"
            type="number"
            value={value}
            onChange={handleChange}
            maxLength={11} 
            extraClass={styles.input__string}>
          </Input>
          <span className={styles.span}>Максимальное число - 19</span>   
        </div>
        <Button 
          isLoader={loader} 
          disabled={number >= 1 && number <= 19 ? false : true}
          type='submit' 
          text='Рассчитать'>
        </Button>
        <Button 
          disabled={value !== '' ? false : true}
          type='button' 
          text='Очистить'
          onClick={handleClear}>
        </Button>
       </form>
       <div className={styles.circles}>
         {array.map((item, index) => {
            return (
              <Circle
                key={nanoid()}
                index={index}
                letter={item !== undefined ? item.toString() : ''}
              ></Circle>
            )
          })}
       </div>
    </SolutionLayout>
  );
};
