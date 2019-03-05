class TransactionBook {
  constructor(bankName) {
    this.transactions = [];
    this.bankName = bankName;
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
  calcAmountForAccount(account) {
    return this.transactions.reduce((res, value) => {
      if (value.sender.name == account.name) {
        return res - value.amount;
      } else if (value.receiver.name == account.name) {
        return res + value.amount;
      } else return res;
    }, 0);
  }

  findTransactionsForAccount(account) {
    return this.transactions.filter(
      item => item.sender == account || item.receiver == account
    );
  }
}

class Account {
  constructor(transactionBook, name) {
    this.transactionBook = transactionBook;
    this.name = name;
  }
  createTransaction(receiver, amount, reference) {
    this.transactionBook.transactions.push(
      new Transaction(receiver, amount, reference, this)
    );
  }
  get totalAmount() {
    return this.transactionBook.calcAmountForAccount(this);
  }
  get myTransactions() {
    return this.transactionBook.findTransactionsForAccount(this);
  }
}

class Transaction {
  constructor(receiver, amount, reference, sender) {
    this.receiver = receiver;
    this.amount = amount;
    this.reference = reference;
    this.sender = sender;
  }
}

class BusinessAccount extends Account {
  constructor(transactionBook, name) {
    super(transactionBook, name);
  }
  get comission() {
    return 0.02;
  }
  createTransaction(receiver, amount, reference) {
    super.createTransaction(receiver, amount, reference);
    this.transactionBook.transactions.push(
      new Transaction(
        this.transactionBook.bankName,
        this.comission,
        reference,
        this
      )
    );
  }
}
class PrivateAccount extends Account {
  constructor(transactionBook, name) {
    super(transactionBook, name);
  }

  get comission() {
    return 0.01;
  }
  createTransaction(receiver, amount, reference) {
    super.createTransaction(receiver, amount, reference);
    this.transactionBook.transactions.push(
      new Transaction(
        this.transactionBook.bankName,
        this.comission,
        reference,
        this
      )
    );
  }
}

let bankName1 = new Account({ transactions: [], bankname: {} }, "Santander");
let transactionBook1 = new TransactionBook(bankName1);

let account1 = new PrivateAccount(transactionBook1, "Iago");
let account2 = new BusinessAccount(transactionBook1, "Amparo");
let account3 = new PrivateAccount(transactionBook1, "Pedro");
let account4 = new BusinessAccount(transactionBook1, "Anton");
account1.createTransaction(account3, 40, "Aqui");
let transaction1 = new Transaction(account4, 30, "Pago en tienda", account1);
let transaction2 = new Transaction(account1, 50, "Pago en especie", account4);
transactionBook1.addTransaction(transaction1);
transactionBook1.addTransaction(transaction2);
console.log(transactionBook1.calcAmountForAccount(account1));
