import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import styles from './sorting-page.module.css'
import { Column } from "../ui/column/column";
import { bubbleSortMax, bubbleSortMin, crateRandomNumber, createRandomArray, selectionSortMax, selectionSortMin } from "./algorithm";
import { ISortingArray } from "../../types/sorting-page-types";

export const SortingPage: React.FC = () => {
  const [loader, setLoader] = useState<boolean>(false)
  const [array, setArray] = useState<ISortingArray[]>([])
  const [radioValue, setRadioValue] = useState('selection')

  const randomArr = () => {
    setLoader(true)
    const randomArray = createRandomArray(crateRandomNumber(3, 17), 1, 100)
    setArray(randomArray)
    setLoader(false)
  }

  const handleChangeRadioValue = (evt: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(evt.target.value)
  }

  const handleSelectionSortMin = () => {
    array.length > 0 ? selectionSortMin(array, setArray, setLoader) : randomArr()
  }

  const handleSelectionSortMax = () => {
    array.length > 0 ? selectionSortMax(array, setArray, setLoader) : randomArr()
  }

  const handleBubbleSortMin = () => {
    array.length > 0 ? bubbleSortMin(array, setArray, setLoader) : randomArr()
  }

  const handleBubbleSortMax = () => {
    array.length > 0 ? bubbleSortMax(array, setArray, setLoader) : randomArr()
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <main className={styles.sorting_page}>
        <div className={styles.inputs}>
          <RadioInput 
            label="Выбор" 
            name="sort" 
            value="selection" 
            onChange={handleChangeRadioValue}
            defaultChecked
          >
          </RadioInput>
          <RadioInput 
            label="Пузырёк" 
            name="sort" 
            value="bubble"
            onChange={handleChangeRadioValue}
          >
          </RadioInput>
        </div>
        <div className={styles.buttons}>
          <Button 
            onClick={radioValue === 'selection' ? handleSelectionSortMax : handleBubbleSortMax} 
            isLoader={loader} 
            type='button' 
            text="По возрастанию" 
            sorting={Direction.Ascending}
          >
          </Button>
          <Button 
            isLoader={loader} 
            onClick={radioValue === 'selection' ? handleSelectionSortMin : handleBubbleSortMin} 
            text="По убыванию" 
            sorting={Direction.Descending}
          >
          </Button>
        </div>
        <Button 
          text="Новый массив" 
          onClick={randomArr} 
          isLoader={loader}
        ></Button>
      </main>
      <div className={styles.columns}>
        {array.map((item, index) => {
          return(
            <Column 
              extraClass={styles.column} 
              index={item.number} 
              key={index}
              state={item.state}
            >
            </Column>
          )
        })}
      </div>
    </SolutionLayout>
  );
};
