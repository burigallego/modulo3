// class Bank {
//   constructor(name) {
//     this.name = name;
//     this.accountList = [];
//     this.clientList = [];
//     this.subscriberList = [];
//     this.baseAccount = null;
//   }

//   subscribeClient(client) {

//   }

// }

//   createBaseAccount(baseAccount) {
//     this.baseAccount = baseAccount;
//   }

//   createComission(client) {
//     let newAccount = new Account(client, this);
//     if (this.baseAccount) {
//       newAccount.comission = this.baseAccount.comission;
//     }
//     return newAccount;
//   }

//   createAccount(client) {
//     let isClient = false;
//     let newAccount = this.createComission(client);
//     this.accountList.push(newAccount);
//     for (let value of this.clientList) {
//       if (value == client) isClient = true;
//     }
//     if (isClient == false) this.clientList.push(client);
//     client.addAccount(newAccount);
//     return newAccount;
//   }

//   createClient(name) {
//     let newClient = new Client(name);
//     this.clientList.push(newClient);
//     return newClient;
//   }
//   createComission(baseAccount) {
//     this._baseAccount = baseAccount;
//   }
// }

// class Client {
//   constructor(name) {
//     this.name = name;
//     this.accountList = [];
//   }
//   getTotalBalance() {}
//   readAdvert() {}
//   addAccount(account) {
//     this.accountList.push(account);
//   }
// }

// class Account {
//   constructor(client, bank) {
//     this.client = client;
//     this.bank = bank;
//     this.balance = 0;
//     this._comission = 0;
//   }
//   get comission() {
//     return this._comission;
//   }
//   set comission(newComission) {
//     this._comission = newComission;
//   }
// }

// let bank = new Bank("Banco Santander");
// let baseAccount = new Account(null, bank);
// baseAccount.comission = 3;
// bank.createBaseAccount(baseAccount);
// let client = new Client("Iago Gallego");
// bank.createAccount(client);
// bank.createClient("Alexandre Gallego");

class Banco {
  constructor(nombre) {
    this.nombre = nombre;
    this.cuentas = [];
    this.clientes = [];
    this.subscriptores = [];
    this.cuentaBase = null;
  }

  SubscribirCliente(cliente) {
    this.AnadirSubscriptor(cliente);
  }

  DesubscribirCliente(cliente) {
    this.subscriptores = this.subscriptores.filter(function(item) {
      if (item !== fn) {
        return item;
      }
    });
  }

  EnviarPublicidad(evento) {
    this.subscriptores.forEach(function(item) {
      item.LeerPublicidad(evento);
    });
  }

  CrearCuenta(cliente) {
    const nuevaCuenta = this.GenerarCuenta(cliente);
    this.AnadirCuenta(nuevaCuenta);
    this.AnadirCliente(cliente);
    cliente.AnadirCuenta(nuevaCuenta);
    return nuevaCuenta;
  }
  CrearCliente(nombreCliente) {
    const nuevoCliente = new Cliente(nombreCliente);
    this.AnadirCliente(nuevoCliente);
    return nuevoCliente;
  }

  AnadirCliente(cliente) {
    if (this.clientes.indexOf(cliente) === -1) {
      this.clientes.push(cliente);
    }
  }

  AnadirSubscriptor(subscriptor) {
    if (this.subscriptores.indexOf(subscriptor) === -1) {
      this.subscriptores.push(subscriptor);
    }
  }

  AnadirCuenta(cuenta) {
    if (this.cuentas.indexOf(cuenta) === -1) {
      this.cuentas.push(cuenta);
    }
  }
  EstablecerCondiciones(cuentaBase) {
    this.cuentaBase = cuentaBase;
  }
  GenerarCuenta(cliente) {
    const nuevaCuenta = new Cuenta(cliente, this);
    if (this.cuentaBase) {
      nuevaCuenta.Comision = this.cuentaBase.Comision;
    }
    return nuevaCuenta;
  }
}

class Cuenta {
  constructor(cliente, banco) {
    this.cliente = cliente;
    this.banco = banco;
    this.saldo = 0;
    this._comision = 0;
  }
  get Comision() {
    return this._comision;
  }
  set Comision(nuevaComision) {
    this._comision = nuevaComision;
  }
}
class Cliente {
  constructor(nombre) {
    this.nombre = nombre;
    this.cuentas = [];
  }
  AnadirCuenta(cuenta) {
    if (this.cuentas.indexOf(cuenta) === -1) {
      this.cuentas.push(cuenta);
    }
  }
  LeerPublicidad(evento) {
    console.log(
      this.nombre,
      "ha leido la publicidad consistente en el mensaje:",
      evento
    );
  }
}

const banco = new Banco("BBVA");
const cliente1 = banco.CrearCliente("Marcos");
const cliente2 = banco.CrearCliente("Javier");
const cuenta1 = banco.CrearCuenta(cliente1);

const cuentaFicticia = new Cuenta(null, banco);
cuentaFicticia.Comision = 1;
banco.EstablecerCondiciones(cuentaFicticia);
const cuenta2 = banco.CrearCuenta(cliente1);
const cuentaFicticia2 = new Cuenta(null, banco);
cuentaFicticia2.Comision = 2;
banco.EstablecerCondiciones(cuentaFicticia2);

const cuenta3 = banco.CrearCuenta(cliente2);

banco.SubscribirCliente(cliente1);
banco.SubscribirCliente(cliente2);
banco.EnviarPublicidad("Somos el mejor banco del mundo");
