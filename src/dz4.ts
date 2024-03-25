class BCD {
  private numbers: number[] = [];

  constructor(numBigInt: BigInt) {
    let index1 = 0;
    let index2 = 0;
    let tempDigit = 0;
    let num = Math.abs(Number(numBigInt));

    while (num > 0) {
      const digit = num % 10;

      num = Math.floor(num / 10);
      tempDigit |= +digit << (index1++ * 4);

      if (index1 === 7) {
        this.numbers.push(tempDigit);
        index2++;
        index1 = 0;
        tempDigit = 0;
      }
    }

    if (tempDigit) this.numbers.push(tempDigit);

    if (Number(numBigInt) < 0n) {
      this.numbers[0] = (1 << 28) | this.numbers[0];
    }
  }

  static getDigitsLength(number: number): number {
    let currentDigit = 0;

    number = number & (2 ** 28 - 1);

    while (number > 0 && currentDigit !== 7) {
      currentDigit++;
      number >>= 4;
    }

    return currentDigit;
  }

  static binary(num: number) {
    return num.toString(2).padStart(32, "0");
  }

  static get9complement(num: BCD, len: number) {
    const nums = num.numbers;
    let cursor = 0;
    let result = 0n;

    for (let i = nums.length - 1; i >= 0; i--) {
      let temp = nums[i] & (2 ** 28 - 1);

      while (temp > 0) {
        result += BigInt((9 - (temp & 15)) * 10 ** cursor++);
        temp = temp >> 4;
      }
    }

    const difference = len - num.length;

    if (difference > 0) {
      for (let i = 0; i < difference; i++) {
        result += BigInt(9 * 10 ** (difference + i));
      }
    }

    return result;
  }

  static getSubstractWith9complement(bigger: BCD, smaller: BCD) {
    const complement = BCD.get9complement(smaller, bigger.length);

    return (bigger.add(complement) & (2 ** (bigger.length * 4) - 1)) + 1;
  }

  valueOf() {
    return this.numbers.reduce(
      (acc, cur, index) => acc | ((BigInt(cur) << (BigInt(index) * 28n)) & (2n ** 28n - 1n)),
      0n
    );
  }

  get(index: number) {
    if (index < 0) {
      index = this.length + index;
    }

    const innerIndex = index % 7;
    const length = BCD.getDigitsLength(this.numbers[Math.floor(index / 7)]);

    return (this.numbers[Math.floor(index / 7)] >> ((length - 1 - innerIndex) * 4)) & 15;
  }

  get isNegative() {
    return this.numbers[0] >> 28 ? true : false;
  }

  get length() {
    let result = (this.numbers.length - 1) * 7;
    let number = (this.numbers.at(-1) as number) & (2 ** 28 - 1);

    while (number > 0) {
      number = number >> 4;
      result += 1;
    }

    return result;
  }

  private addBCD(second: BCD) {
    const finalLength = Math.max(this.length, second.length);
    let debt = 0;
    let result = 0;

    for (let i = 0; i < finalLength; i++) {
      const sum = this.get((i + 1) * -1) + second.get((i + 1) * -1) + debt;

      debt = 0;

      if (sum > 9) {
        debt = 1;
        result += ((sum + 6) & 15) << (i * 4);
      } else {
        result += sum << (i * 4);
      }
    }

    if (debt) result += 1 << (finalLength * 4);

    return result;
  }

  add(n: BigInt) {
    const second = new BCD(n);
    return this.addBCD(second);
  }

  multiply(n: number) {
    if (n === 0) return 0;

    let result: number = 0;
    const sign = n < 0 ? (this.isNegative ? 1 : -1) : this.isNegative ? -1 : 1;

    for (let i = 0; i < Math.abs(n); i++) {
      result = this.addBCD(this);
    }

    return result * sign;
  }

  substract(n: BigInt) {
    const second = new BCD(n);

    if (this.isNegative && second.isNegative) {
      if (this.valueOf() > second.valueOf()) {
        return BCD.getSubstractWith9complement(this, second) * -1;
      }

      if (this.valueOf() < second.valueOf()) {
        return BCD.getSubstractWith9complement(second, this);
      }

      return 0;
    }

    if (this.isNegative && !second.isNegative) {
      return this.add(n) * -1;
    }

    if (!this.isNegative && second.isNegative) {
      return this.add(n);
    }

    if (!this.isNegative && !second.isNegative) {
      if (this.valueOf() > second.valueOf()) {
        return BCD.getSubstractWith9complement(this, second);
      }

      if (this.valueOf() < second.valueOf()) {
        return BCD.getSubstractWith9complement(second, this) * -1;
      }

      return 0;
    }
  }
}

const n = new BCD(65n);
const n2 = new BCD(-65n);

console.log("n.valueOf - " + n.valueOf()); // 0b01100101010100110110 или 415030
console.log("n.at(0) - " + n.get(0)); // 6
console.log("n.at(1) - " + n.get(1)); // 3
console.log("n.at(-1) - " + n.get(-1)); // 6
console.log("n.at(-2) - " + n.get(-2)); // 5

console.log("n2.valueOf - " + n2.valueOf());
console.log("n2[0] - " + n2.get(0)); // 6
console.log("n2[1] - " + n2.get(1)); // 3
console.log("isNegative - " + n2.isNegative); // true

console.log("сложение - " + n.add(2337n));

console.log("вычитание - " + n.substract(24n));
console.log("вычитание - " + n.substract(84n));
console.log("вычитание - " + n.substract(-24n));
console.log("вычитание - " + n.substract(-84n));

console.log("вычитание - " + n2.substract(24n));
console.log("вычитание - " + n2.substract(84n));
console.log("вычитание - " + n2.substract(-24n));
console.log("вычитание - " + n2.substract(-84n));

console.log("умножение - " + n.multiply(-2));
