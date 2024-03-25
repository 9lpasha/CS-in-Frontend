"use strict";
const fizzbuzz = () => {
    return {
        value: 0n,
        next: function () {
            this.value += 1n;
            const number = this.value % 3n === 0n
                ? "fizz"
                : this.value % 5n === 0n
                    ? "buzz"
                    : this.value;
            console.log(number);
            return number;
        },
    };
};
const myFizzBazz = fizzbuzz();
myFizzBazz.next(); // 1n
myFizzBazz.next(); // 2n
myFizzBazz.next(); // Fizz
myFizzBazz.next(); // 4n
myFizzBazz.next(); // Buzz
myFizzBazz.next(); // Fizz
myFizzBazz.next(); // 7n
myFizzBazz.next(); // 8n
myFizzBazz.next(); // Fizz
myFizzBazz.next(); // Buzz
