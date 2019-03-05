let transactions = [
  { animal: "perro", amount: 30 },
  { animal: "gato", amount: 50 }
];

let res1 = transactions
  .map(value => value.amount)
  .reduce((res, value) => {
    console.log(res);
    console.log(value.amount);
    if (transaction.animal == "gato") {
      console.log("Hola ", res - value);
      return res - value;
    } else if (transaction.animal == "perro") {
      console.log("Que tal ", res + value);
      return res + value;
    } else return res;
  }, 0);

console.log(res1);
