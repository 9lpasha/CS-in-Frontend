"use strict";
class BCD {
  private numbers: number[] = [];
  private binaryNum = 0;
  private _isNegative = false;

  constructor(num: number) {
    if (num > 0) {
      const digits = num.toString().split("").reverse();

      this.numbers = digits.map((digit) => parseInt(digit));
      digits.forEach((digit, index) => {
        this.binaryNum += +digit << (index * 4);
      });
    } else {
      const complementOf9 = 10 ** (`${num}`.length - 1) - 1 + num;
      const digits = num.toString().split("").splice(1).reverse();
      const negativeDigits = complementOf9.toString().split("").reverse();

      this._isNegative = true;
      this.numbers = digits.map((digit) => parseInt(digit));
      negativeDigits.forEach((digit, index) => {
        this.binaryNum += +digit << (index * 4);
      });
    }
  }

  valueOf() {
    return (
      "0b" + this.binaryNum.toString(2).padStart(this.numbers.length * 4, "0")
    );
  }

  get(index: number) {
    return this.numbers.at(index);
  }

  get isNegative() {
    return this._isNegative;
  }

  add(n: number) {
    const second = new BCD(n);
    let firstNumbers = [];
    let secondNumbers = [];
    let overflow = 0;

    for (let i = 0; i < this.numbers.length; i++) {}
  }
}
const n = new BCD(65536);

console.log(n.valueOf()); // 0b01100101010100110110 или 415030
console.log(n.get(0)); // 6
console.log(n.get(1)); // 3
console.log(n.get(-1)); // 6
console.log(n.get(-2)); // 5

const n2 = new BCD(-65536);

console.log(n2.get(0)); // 6
console.log(n2.get(1)); // 3

console.log(n2.isNegative); // true
