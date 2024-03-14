const fizzbuzz = () => {
  return {
    value: 0n,
    label: 0n,
    next: function () {
      this.value += 1n;
      this.label =
        this.value % 3n === 0n
          ? "fizz"
          : this.value % 5n === 0n
          ? "buzz"
          : this.value;
      console.log(this.label);
    },
  };
};

const myFizzBazz = fizzbuzz();

myFizzBazz.next(); // 1n
myFizzBazz.next(); // 2n
myFizzBazz.next(); // Fizz
myFizzBazz.next(); // Buzz
myFizzBazz.next(); // Fizz
