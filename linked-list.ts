class Node<T> {
  public next: Node<T> | null = null;
  public prev: Node<T> | null = null;
  public value: T;
  constructor(value: T) {
    this.value = value;
  }
}

export class LinkedList<T = number> {
  private _head: Node<T> | null = null;
  private _size: number = 0;

  constructor() {}

  //Big O  = O(1)
  public prepend(value: T): void {
    const newNode: Node<T> = new Node<T>(value);
    if (!this._head) {
      this._head = newNode;
    } else {
      this._head.prev = newNode;
      newNode.next = this._head;
      this._head = newNode;
    }

    this._size++;
  }

  //Big O  = O(n)
  public append(value: T): void {
    const newNode: Node<T> = new Node<T>(value);
    if (!this._head) {
      this._head = newNode;
    } else {
      let lastNode: Node<T> = this._head;

      while (lastNode.next) {
        lastNode = lastNode.next;
      }
      newNode.prev = lastNode;
      lastNode.next = newNode;
    }
    this._size++;
  }

  //Big O  = O(n)
  public insert(value: T, index: number): boolean {
    if (this._size < index || index < 0) {
      return false;
    }

    if (index === 0) {
      this.prepend(value);
    } else {
      let newNode: Node<T> = new Node<T>(value);
      let prev: Node<T> = this._head as Node<T>;
      for (let i = 0; i < index - 1; i++) {
        prev = prev.next as Node<T>;
      }
      newNode.next = prev.next;
      newNode.prev = prev;
      prev.next = newNode;
    }

    this._size++;
    return true;
  }

  //Big O  = O(n)
  public remove(index: number): T | null {
    if (this._size < index || index < 0) {
      return null;
    }

    let removeNode: Node<T>;

    if (index === 0) {
      removeNode = this._head as Node<T>;
      this._head = removeNode.next;
    } else {
      let prev: Node<T> = this._head as Node<T>;
      for (let i = 0; i < index - 1; i++) {
        prev = prev.next as Node<T>;
      }
      removeNode = prev.next as Node<T>;
      prev.next = removeNode.next;
    }

    this._size--;
    return removeNode.value;
  }

  //Big O  = O(n)
  public removeValue(value: T): boolean {
    if (!this._head) {
      return false;
    }

    if (this._head.value === value) {
      this._head = this._head.next;
      this._size--;
      return true;
    }

    let prev: Node<T> = this._head;
    while (prev.next && prev.next.value !== value) {
      prev = prev.next;
    }

    if (prev.next) {
      prev.next = prev.next.next;
      this._size--;
      return true;
    }
    return false;
  }

  //Big O = O(n)
  public search(value: T): Node<T> | null {
    if (!this._head) {
      return null;
    }
    let curr: Node<T> = this._head;

    while (curr.next && curr.next.value !== value) {
      curr = curr.next;
    }

    return curr.next;
  }

  //Big O = O(n)
  public reverse(): void {
    let prev: Node<T> | null = null;
    let curr: Node<T> | null = this._head;
    while (curr) {
      let next: Node<T> | null = curr.next;
      curr.next = prev;
      curr.prev = next;
      prev = curr;
      curr = next;
    }
    this._head = prev;
  }

  //Big O  = O(1)
  public isEmpty(): boolean {
    return this._size === 0;
  }

  //Big O  = O(1)
  public size(): number {
    return this._size;
  }

  //Big O  = O(n)
  public print() {
    if (!this._head) {
      console.log("List is empty!");
    } else {
      let curr: Node<T> | null = this._head;
      let listStr: string = "";

      while (curr) {
        listStr += `${curr.value} <->`;
        curr = curr.next;
      }

      console.log(listStr);
    }
  }
}

const list: LinkedList = new LinkedList();

console.log("List is empty? ", list.isEmpty());
list.prepend(10);
list.prepend(20);
list.prepend(30);
list.prepend(40);
list.append(50);
list.insert(60, 3);

console.log(list.remove(-1));
console.log(list.remove(10));
console.log(list.remove(3));
console.log(list.removeValue(35));
console.log(list.removeValue(20));
// console.log(list.search(10));

list.print();
console.log(list.size());

list.reverse();
list.print();
