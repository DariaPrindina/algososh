import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './stack-page.module.css'
import { delay } from "../utils/utils";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { nanoid } from "nanoid";
import { Stack  } from "./algorithm";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { IStack } from "../../types/stack-types";

const stackClass = new Stack<IStack>()

export const StackPage: React.FC = () => {
  const [loader, setLoader] = useState({
    loaderPush: false,
    loaderPop: false,
    loaderRemoveAll: false,
    loader: false
  });
  const [values, setValues] = useState<string>("");
  const [array, setArray] = useState<any>([]);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setValues(evt.target.value);
  };

  const pushItem = async(item: string) => {
    setLoader({...loader, loaderPush: true, loader: true})
    const itemObj = {
      item: item,
      state: ElementStates.Changing
    }
    stackClass.push(itemObj)
    setArray([...array, itemObj]);
    setValues("");
    await delay(SHORT_DELAY_IN_MS)
    itemObj.state = ElementStates.Default
    setLoader({...loader, loaderPush: false, loader: false})    
  };

  const popItem = async() => {
    setLoader({...loader, loaderPop: true, loader: true})
    const lastItem = stackClass.peak()
    if (lastItem) {
      lastItem.state = ElementStates.Changing
      await delay(SHORT_DELAY_IN_MS)
    }
    stackClass.pop()
    array.pop()
    setLoader({...loader, loaderPop: false, loader: false})
  }

  const removeAllItems = async() => {
    setLoader({...loader, loaderRemoveAll: true, loader: true})
    stackClass.returnStack().map((item) => item.state = ElementStates.Changing)
    await delay(SHORT_DELAY_IN_MS)
    stackClass.clear()
    setArray([])
    setLoader({...loader, loaderRemoveAll: false, loader: false})
  }

  return (
    <SolutionLayout title="Стек">
      <form className={styles.elements}>
        <div className={styles.input}>
          <Input
            name="str"
            value={values}
            onChange={handleChange}
            maxLength={4}
            extraClass={styles.input__string}
          ></Input>
          <span className={styles.span}>Максимум - 4 символа</span>
        </div>
        <Button 
          disabled={values ? false : true}
          isLoader={loader.loaderPush}
          type="button" 
          text="Добавить"
          onClick={() => {pushItem(values)}}
        >
        </Button>
        <Button 
          isLoader={loader.loaderPop}
          type="button" 
          text="Удалить"
          disabled={array.length > 0 && loader.loader === false ? false : true}
          onClick={() => {popItem()}}
        >
        </Button>
        <Button 
          disabled={array.length > 0 && loader.loader === false ? false : true}
          isLoader={loader.loaderRemoveAll}
          extraClass='ml-40' 
          type="button" 
          text="Очистить"
          onClick={() => {removeAllItems()}}
        >
        </Button>
      </form>
      <div className={styles.circles}>
        {array.map((item: IStack, index: number) => {
          return (
            <Circle
              key={nanoid()}
              index={index}
              letter={item.item}
              state={item.state}
              head={index === array.length - 1 ? 'top' : ''}
            ></Circle>
          );
        })}
      </div>
    </SolutionLayout>
  );
};
