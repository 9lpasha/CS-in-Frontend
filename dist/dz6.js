"use strict";
class LinkedList {
    first;
    last;
    constructor(first = null, last = null) {
        this.first = first;
        this.last = last;
    }
    [Symbol.iterator]() {
        let currentNode = this.first;
        return {
            next() {
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
    add(value) {
        if (!this.first) {
            const node = {
                value,
                next: null,
                prev: null,
            };
            this.first = this.last = node;
            return;
        }
        const node = {
            value,
            next: null,
            prev: this.last,
        };
        this.last.next = node;
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
    if (list.first.next.prev)
        console.log(list.first.next.prev.value); // 1
}
console.log("итерируемся...");
for (const value of list) {
    console.log(value);
}
