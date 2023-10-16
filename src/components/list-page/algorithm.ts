export class Node<T> {
  value: T
  next: Node<T> | null
  prev: Node<T> | null
  constructor(value: T, next?: Node<T> | null,  prev?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
    this.prev = (prev === undefined ? null : prev);
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  deleteFromHead: () => void;
  deleteFromTail: () => void;
  addByIndex: (element: string, index: number) => void;
  deleteByIndex: (index: number) => void;
  getSize: () => number;
  print: () => void;
  toArray: () => T[]
  findItemByIndex: (index: number) => T | undefined
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  
  constructor(items?: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    items?.forEach(item => this.prepend(item))
  }

  returnHead() {
    return this.head
  }

  returnTail() {
    return this.tail
  }

  getSize() {
    return this.size
  }

  addByIndex(element: any, index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index')
      return
    } else {
      const node = new Node(element)
      let currentNode = this.head
      let prevNode = null
      let currentIndex = 0
      if (index === 0) {
        node.next = this.head
        this.head = node
        this.size++
        return
      } else {
        while (currentIndex < index) {
          prevNode = currentNode;
          if(currentNode){currentNode = currentNode.next}
          currentIndex++;
        }
        while (currentIndex < index) {
          prevNode = currentNode
          if(currentNode){currentNode = currentNode.next}
          currentIndex++
        }
        node.next = currentNode
        if(prevNode){prevNode.next = node}
        this.size++
      }
      this.size++
    }
  }

  append(element: T) {
    const node = new Node(element)
    if (!this.head) this.head = node
    if (!this.tail) this.tail = node
    this.tail.next = node
    this.tail = node

    this.size++
  }

  prepend(element: T) {
    const node = new Node(element);
    if (!this.tail) this.tail = node;

    node.next = this.head
    this.head = node

    this.size++
  }

  deleteFromHead() {
    if (!this.head) return null
    const deletedHead = this.head
    if (this.head.next) {
      this.head = this.head.next
    } else {
      this.head = null
      this.tail = null
    }
    this.size--
    return deletedHead
  }

  deleteFromTail() {
    if (!this.tail) return null
    const deletedTail = this.tail
    if (this.head === this.tail) {
      this.head = null
      this.tail = null
      return deletedTail
    }
    let currentNode = this.head
    while (currentNode?.next) {
      if (!currentNode.next.next) {
        currentNode.next = null
      } else {
        currentNode = currentNode.next
      }
    }
    this.tail = currentNode
    this.size--
    return deletedTail
  }

  deleteByIndex(index: number) {
    if (this.head === null) return
    let temp: any = this.head
    if (index === 0) { 
      this.head = temp.next;
      return
    }
    for(let i = 0; temp != null && i < index - 1; i++) { 
      temp = temp.next
    }
    if (temp == null || temp.next == null) return;
    let next = temp.next.next
    temp.next = next
  }

  findItemByIndex(index: number) {
    let current
    if (index < 0 || index >= this.size) return undefined;

    if (index <= this.size / 2) {
      current = this.head;
      for (let i = 0; i < index; i++) {
        if(current) current = current.next;
      }
    } else {
      current = this.tail;
      for (let i = this.size; i > index; i--) {
        if(current) current = current.prev;
      }
    }
    return current?.value;
  }

  print() {
    let curr = this.head
    let res = ''
    while (curr) {
      res += `${curr.value} `
      curr = curr.next
    }
    console.log(res)
  }

  toArray(): T[] {
    let array = []
    let currentNode = this.head
    while (currentNode) {
      array.push(currentNode.value)
      currentNode = currentNode.next
    }
    return array
  }
}