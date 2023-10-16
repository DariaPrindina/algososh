import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from './list-page.module.css'
import { LinkedList } from "./algorithm";
import { nanoid } from "nanoid";
import { ElementStates } from "../../types/element-states";
import { delay } from "../utils/utils";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";


export interface IList {
  item: string,
  state: ElementStates,
  headCircle?: string,
  tailCircle?: string
}

const arrayDefault = [0, 34, 8, 1]
const arrayDefaultObj = arrayDefault.map((item) => ({
  item: item.toString(),
  state: ElementStates.Default
}))

const list = new LinkedList<IList>(arrayDefaultObj);


export const ListPage: React.FC = () => {
  const [loader, setLoader] = useState({
    addInHead: false,
    addInTail: false,
    deleteFromHead: false,
    deleteFromTail: false,
    addByIndex: false,
    deleteByIndex: false,
    loader: false
  });

  const [values, setValues] = useState<string>("");
  const [index, setIndex] = useState<string>("");
  const [array, setArray] = useState<IList[]>(list.toArray());
  console.log("🚀 ~ file: list-page.tsx:33 ~ array:", array)

  const [circleItem, setCircleItem] = useState({
    circleAddItemHead: false,
    circleAddItemTail: false,
    circleDeleteItemHead: false,
    circleDeleteItemTail: false
  })

  const handleChangeValue = (evt: ChangeEvent<HTMLInputElement>): void => {
    setValues(evt.target.value);
  };

  const handleChangeIndex = (evt: ChangeEvent<HTMLInputElement>): void => {
    setIndex(evt.target.value);
  };

  const addInHead = async() => {
    const item = {item: values, state: ElementStates.Modified}
    setLoader({...loader, addInHead: true, loader: true})
    const headItem = list.returnHead()
    if(headItem) headItem.value.headCircle = values
    setValues('')
    setCircleItem({...circleItem, circleAddItemHead: true})
    await delay(DELAY_IN_MS)
    list.prepend(item)
    setCircleItem({...circleItem, circleAddItemHead: false})
    if(headItem) headItem.value.headCircle = undefined
    setArray(list.toArray())
    await delay(DELAY_IN_MS)
    item.state = ElementStates.Default
    setArray(list.toArray())
    setLoader({...loader, addInHead: false, loader: false})
  }

  const addInTail = async() => {
    const item = {item: values, state: ElementStates.Modified}
    setLoader({...loader, addInTail: true, loader: true})
    const tailItem = list.returnTail()
    if(tailItem) tailItem.value.tailCircle = values
    setValues('')
    setCircleItem({...circleItem, circleAddItemTail: true})
    await delay(DELAY_IN_MS)
    list.append(item)
    setCircleItem({...circleItem, circleAddItemTail: false})
    if(tailItem) tailItem.value.tailCircle = undefined
    setArray(list.toArray())
    await delay(DELAY_IN_MS)
    item.state = ElementStates.Default
    setArray(list.toArray())
    setLoader({...loader, addInTail: false, loader: false})
  }

  const deleteFromHead = async() => {
    setLoader({...loader, deleteFromHead: true, loader: true})
    const headItem = list.returnHead()
    if(headItem) {
      headItem.value.headCircle = headItem.value.item
      headItem.value.item = ''
    }
    setCircleItem({...circleItem, circleDeleteItemHead: true})
    await delay(DELAY_IN_MS)
    list.deleteFromHead()
    setCircleItem({...circleItem, circleDeleteItemHead: false})
    if(headItem) headItem.value.headCircle = undefined
    setArray(list.toArray())
    setLoader({...loader, deleteFromHead: false, loader: false})
  }

  const deleteFromTail = async() => {
    setLoader({...loader, deleteFromTail: true, loader: true})
    const tailItem = list.returnTail()
    if(tailItem) {
      tailItem.value.tailCircle = tailItem.value.item
      tailItem.value.item = ''
    }
    setCircleItem({...circleItem, circleDeleteItemTail: true})
    await delay(DELAY_IN_MS)
    list.deleteFromTail()
    setCircleItem({...circleItem, circleDeleteItemTail: false})
    if(tailItem) tailItem.value.tailCircle = undefined
    setArray(list.toArray())
    setLoader({...loader, deleteFromTail: false, loader: false})
  }

  const addByIndex = async() => {
    const item = {item: values, state: ElementStates.Modified}
    setLoader({...loader, deleteByIndex: true, loader: true})
    for (let i = 0; i < Number(index); i++) {
      let itemByIndexall = list.findItemByIndex(i)
      if(i <= Number(index)) {
        if (itemByIndexall){
          itemByIndexall.headCircle = values
          itemByIndexall.state = ElementStates.Changing
        } 
      }
      setArray(list.toArray())
      await delay(DELAY_IN_MS)
      if(i < Number(index)) {
        if (itemByIndexall){
          itemByIndexall.headCircle = undefined
        } 
      }
    }
    list.addByIndex(item, Number(index))
    setArray(list.toArray())
    await delay(DELAY_IN_MS)
    setArray(list.toArray().map((item) => {return {item: item.item, state: ElementStates.Default}}))
    setLoader({...loader, deleteByIndex: false, loader: false})
  }

  const deleteByIndex = async() => {
    setLoader({...loader, deleteByIndex: true, loader: true})
    for (let i = 0; i < Number(index); i++) {
      let itemByIndexall = list.findItemByIndex(i)
      let itemByIndex = list.findItemByIndex(Number(index))
      if(i <= Number(index)) {
        if (itemByIndexall){
          itemByIndexall.state = ElementStates.Changing
        } 
      }
      setArray(list.toArray())
      await delay(DELAY_IN_MS)
        if (itemByIndex){
          itemByIndex.headCircle = itemByIndex.item
      }
      setArray(list.toArray())
      await delay(DELAY_IN_MS)
        if (itemByIndex){
          itemByIndex.item = ''
          itemByIndex.headCircle = undefined
      }
    }
    await delay(DELAY_IN_MS)
    list.deleteByIndex(Number(index))
    setArray(list.toArray())
    await delay(DELAY_IN_MS)
    setArray(list.toArray().map((item) => {return {item: item.item, state: ElementStates.Default}}))
    setLoader({...loader, deleteByIndex: false, loader: false})
  }


  return (
    <SolutionLayout title="Связный список">
      <main className={styles.main}>
        <form className={styles.elements}>
          <div className={styles.input}>
            <Input
              name="value"
              value={values}
              onChange={handleChangeValue}
              maxLength={4}
              extraClass={styles.input__string}
              placeholder='Введите значение'
            ></Input>
            <span className={styles.span}>Максимум - 4 символа</span>
          </div>
          <Button
            extraClass={styles.button_form}
            isLoader={loader.addInHead}
            type="button" 
            text="Добавить в head"
            onClick={addInHead}
            disabled={loader.addInHead || loader.loader || values.length === 0 ? true : false}
          >
          </Button>
          <Button 
            isLoader={loader.addInTail}
            extraClass={styles.button_form}
            type="button" 
            text="Добавить в tail"
            onClick={addInTail}
            disabled={loader.addInTail || loader.loader ||  values.length === 0 ? true : false}
          >
          </Button>
          <Button
            extraClass={styles.button_form}
            isLoader={loader.deleteFromHead}
            type="button" 
            text="Удалить из head"
            onClick={deleteFromHead}
            disabled={loader.deleteFromHead || loader.loader || list.returnHead() === null ? true : false}
          >
          </Button>
          <Button 
            isLoader={loader.deleteFromTail}
            extraClass={styles.button_form}
            type="button"
            text="Удалить из tail"
            onClick={deleteFromTail}
            disabled={loader.deleteFromTail || loader.loader || list.returnTail() === null ? true : false}
          >
          </Button>
        </form>
        <form className={styles.index_form}>
          <div className={styles.input}>
            <Input
              name="str"
              value={index}
              onChange={handleChangeIndex}
              maxLength={4}
              extraClass={styles.input__string}
              placeholder='Введите индекс'
            ></Input>
          </div>
          <Button
            extraClass={styles.button}
            isLoader={loader.addByIndex}
            type="button" 
            text="Добавить по индексу"
            onClick={addByIndex}
            disabled={!index || values.length === 0 ? true : false}
          >
          </Button>
          <Button
            extraClass={styles.button}
            isLoader={loader.deleteByIndex}
            type="button" 
            text="Удалить по индексу"
            onClick={deleteByIndex}
            disabled={!index || Number(index) > list.getSize() ? true : false}
          >
          </Button>
        </form>
      </main>
      <ul className={styles.circles_list}>
        {array.map((item: any, index: number) => {
          return (
            <li className={styles.circle}>
              <div className={styles.mini_circles}>
              {item.headCircle && (
                <Circle
                  isSmall={true}
                  letter={item.headCircle}
                  state={ElementStates.Changing}
                >
                </Circle>
              )}
              </div>
              <Circle
                key={nanoid()}
                index={index}
                letter={item.item}
                state={item.state}
                head={!circleItem.circleAddItemHead && !circleItem.circleDeleteItemHead && index === 0 ? 'top' : ''}
                tail={!circleItem.circleAddItemTail && !circleItem.circleDeleteItemTail && index === array.length - 1 ? 'tail' : ''}
              >
              </Circle>
              <div className={styles.mini_circles_tail}>
              {item.tailCircle && (
                <Circle
                  isSmall={true}
                  letter={item.tailCircle}
                  state={ElementStates.Changing}
                >
                </Circle>
              )}
              </div>
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
