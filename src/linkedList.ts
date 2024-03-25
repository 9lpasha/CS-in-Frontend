interface LinkedListNode {
  value: number;
  next: LinkedListNode | null;
  prev: LinkedListNode | null;
}

class LinkedList {
  constructor(public first: LinkedListNode | null = null, public last: LinkedListNode | null = null) {}

  [Symbol.iterator]() {
    let currentNode: LinkedListNode | null = this.first;

    return {
      next(): IteratorResult<number, null> {
        const oldNode = currentNode;

        currentNode = oldNode?.next || null;

        if (oldNode) {
          return {
            done: false,
            value: oldNode.value,
          };
        }

        return {
          done: true,
          value: null,
        };
      },
    };
  }

  add(value: number) {
    if (!this.first) {
      this.first = this.last = {
        value,
        next: null,
        prev: null,
      };

      return;
    }

    const node = {
      value,
      next: null,
      prev: this.last,
    };

    (this.last as LinkedListNode).next = node;
    this.last = node;
  }
}

const list = new LinkedList();

list.add(1);
list.add(2);
list.add(3);

if (list.first) {
  console.log(list.first.value); // 1
}

if (list.last) {
  console.log(list.last.value); // 3
}

if (list.first && list.first.next) {
  console.log(list.first.next.value); // 2

  if (list.first.next.prev) console.log(list.first.next.prev.value); // 1
}

console.log("итерируемся...");

for (const value of list) {
  console.log(value);
}
