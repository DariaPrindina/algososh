interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
}

export class Stack<T> implements IStack<T> {
  private container: any = [];

  push = (item: T): void => {
    this.container.push(item)
  };

  pop = (): void => {
    if (this.getSize() > 0) {
      this.container.pop()
    }
  };

  peak = (): T | null => {
    if (this.getSize() <= 0) {
      return null;
    } else {
      return this.container[this.getSize() - 1]
    }
  };

  getSize = () => this.container.length;

  returnStack = (): T[] => this.container

  clear = () => this.container = []
}