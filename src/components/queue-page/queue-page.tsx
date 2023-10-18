import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './queue-page.module.css'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../utils/utils";
import { Queue } from "./algorithm";
import { Circle } from "../ui/circle/circle";

const queueClass = new Queue(7)

export interface IQueue {
  item: string,
  state: ElementStates
}

export const QueuePage: React.FC = () => {
  const [loader, setLoader] = useState({
    loaderEnqueue: false,
    loaderDequeue: false,
    loaderRemoveAll: false,
    loader: false
  });
  const [values, setValues] = useState<string>("");
  const [queue, setQueue] = useState<string[] | undefined[] | any>([...queueClass.returnQueue()]);
  const [error, setError] = useState<any>()

  const head = queueClass.returnHead()
  const tail = queueClass.returnTail()
  const lengthOfQueue = queueClass.returnQueue()
  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setValues(evt.target.value);
  };

  const enqueue = async(item: string) => {
    try{
      setLoader({...loader, loaderEnqueue: true, loader: true})
      const itemObj = {
        item: item,
        state: ElementStates.Changing
      }
      queueClass.enqueue(itemObj)
      setQueue([...queueClass.returnQueue()])
      setValues('')
      await delay(SHORT_DELAY_IN_MS)
      itemObj.state = ElementStates.Default
      setLoader({...loader, loaderEnqueue: false, loader: false})
    } catch(err) {
        setError(err)
        await delay(2000)
        setValues('')
        setLoader({...loader, loaderEnqueue: false, loader: false})
        setError('')
    }
  }

  const dequeue = async() => {
    setLoader({...loader, loaderDequeue: true, loader: true})
    const lastItem: any = queueClass.peak()
    if (lastItem) {
      lastItem.state = ElementStates.Changing
    }
    await delay(SHORT_DELAY_IN_MS)
    queueClass.dequeue()
    setQueue([...queueClass.returnQueue()])
    setLoader({...loader, loaderDequeue: false, loader: false})
  }

  const removeAllItems = async() => {
    setLoader({...loader, loaderRemoveAll: true, loader: true})
    queueClass.returnQueue().forEach((item: any) => item.state = ElementStates.Changing)
    await delay(SHORT_DELAY_IN_MS)
    queueClass.clear()
    setQueue([...queueClass.returnQueue()])
    setLoader({...loader, loaderRemoveAll: false, loader: false})
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.elements}>
        <div className={styles.input}>
          <Input
            name="str"
            value={values}
            onChange={handleChange}
            maxLength={4}
            extraClass={styles.input__string}
          ></Input>
          <span className={styles.span}>{!error ? `Максимум - 4 символа` : `${error}`}</span>
        </div>
        <Button
          disabled={values ? false : true}
          isLoader={loader.loaderEnqueue}
          type="button" 
          text="Добавить"
          onClick={() => {enqueue(values)}}
        >
        </Button>
        <Button 
          isLoader={loader.loaderDequeue}
          type="button" 
          text="Удалить"
          disabled={lengthOfQueue.length > 0 && loader.loader === false ? false : true}
          onClick={() => {dequeue()}}
        >
        </Button>
        <Button 
          disabled={lengthOfQueue.length > 0 && loader.loader === false ? false : true}
          isLoader={loader.loaderRemoveAll}
          extraClass='ml-40' 
          type="button" 
          text="Очистить"
          onClick={() => {removeAllItems()}}
        >
        </Button>
      </form>
      <div className={styles.circles}>
        {queue.map((item: IQueue, index: number) => {
          return (
            <Circle
              key={index}
              index={index}
              letter={item?.item}
              state={item?.state}
              head={queue.length !== 0 && index === head && item ? 'head' : ''}
              tail={queue.length !== 0 && index === tail - 1 ? 'tail' : ''}
            ></Circle>
          );
        })}
      </div>
    </SolutionLayout>
  );
};
