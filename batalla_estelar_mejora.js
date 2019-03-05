class Nave {
  constructor(dano, puntosVida, codigo) {
    this.dano = dano;
    this.puntosVida = puntosVida;
    this.codigo = codigo;
  }
  get Estado() {
    if (this.puntosVida <= 0) return "destruido";
    else return "activo";
  }

  RecibirDisparo(dano) {
    this.puntosVida -= dano;
    return this.puntosVida;
  }
}

class Nave1 extends Nave {
  constructor() {
    super(5, 10, "Nave1");
  }
}

class Nave2 extends Nave {
  constructor() {
    super(10, 5, "Nave1");
  }
}

class Nave3 extends Nave {
  constructor() {
    super(7, 8, "Nave3");
  }
}

class Ejercito {
  constructor(nombre, listaNaves) {
    this.nombre = nombre;
    this.listaNaves = listaNaves;
  }
  CrearInforme() {
    let activas = this.listaNaves.filter(item => item.Estado == "activo");
    let destruidas = this.listaNaves.filter(item => item.Estado == "destruido");
    console.log(
      "Las unidades activas del",
      this.nombre,
      "son",
      activas.length,
      "y las destruidas",
      destruidas.length
    );
  }
  get Derrotado() {
    let isDerrotado = true;
    for (let value of this.listaNaves) {
      if (value.Estado == "activo") isDerrotado = false;
    }
    if (isDerrotado) return true;
    else return false;
  }
}

class GeneradorNaves {
  constructor() {}

  crearEjercito(nombre, cantClase1, cantClase2, cantClase3) {
    let listaNaves = [];
    for (let i = 1; i <= cantClase1; i++) {
      listaNaves.push(new Nave1());
    }
    for (let i = 1; i <= cantClase2; i++) {
      listaNaves.push(new Nave2());
    }
    for (let i = 1; i <= cantClase3; i++) {
      listaNaves.push(new Nave3());
    }
    let nuevoEjercito = new Ejercito(nombre, listaNaves);
    return nuevoEjercito;
  }

  distribuirEjercito(campoBatalla, ejercito) {
    campoBatalla.estableceEjercitos(ejercito);
  }
  crearCampo(ejercito1, ejercito2) {
    let nuevoCampo = new CampoBatalla();
    this.distribuirEjercito(nuevoCampo, ejercito1);
    this.distribuirEjercito(nuevoCampo, ejercito2);
    return nuevoCampo;
  }
}

class CampoBatalla {
  constructor() {
    this.sectores = [];
    this.ejercitos = [];
  }

  reordenar(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
      var randomIndex = Math.floor(Math.random() * (i + 1));
      var itemAtIndex = arr[randomIndex];

      arr[randomIndex] = arr[i];
      arr[i] = itemAtIndex;
    }
    return arr;
  }

  estableceEjercitos(ejercito) {
    this.ejercitos.push(ejercito);
    let sectorNuevo = new Sector();
    let arrnull = [null, null, null, null, null];
    sectorNuevo.espacios = ejercito.listaNaves.slice();
    sectorNuevo.espacios = sectorNuevo.espacios.concat(arrnull);
    sectorNuevo.espacios = this.reordenar(sectorNuevo.espacios);
    this.sectores.push(sectorNuevo);
  }

  seleccionarAtacante(posicion) {
    while (true) {
      let randomIndex = Math.floor(
        Math.random() * this.sectores[posicion].espacios.length
      );
      if (
        this.sectores[posicion].espacios[randomIndex] !== null &&
        this.sectores[posicion].espacios[randomIndex].Estado == "activo"
      ) {
        return this.sectores[posicion].espacios[randomIndex];
      }
    }
  }

  seleccionarObjetivo(posicion) {
    while (true) {
      let randomIndex = Math.floor(
        Math.random() * this.sectores[posicion].espacios.length
      );

      if (
        this.sectores[posicion].espacios[randomIndex] === null ||
        this.sectores[posicion].espacios[randomIndex].Estado == "activo"
      ) {
        return this.sectores[posicion].espacios[randomIndex];
      }
    }
  }

  disparar(posicion_ataca, posicion_defiende) {
    let objetivo = this.seleccionarObjetivo(posicion_defiende);
    let atacante = this.seleccionarAtacante(posicion_ataca);
    if (objetivo) {
      objetivo.RecibirDisparo(atacante.dano);
    } else {
      console.log("Disparo al aire");
    }
  }

  realizaPartida() {
    while (true) {
      this.disparar(0, 1);
      console.log(this.ejercitos[1].nombre, ":");
      this.sectores[1].CrearInformeTurno();
      if (this.sectores[1].Derrotado) {
        console.log(this.ejercitos[0].nombre, "ha ganado");
        break;
      }
      this.disparar(1, 0);
      console.log(this.ejercitos[0].nombre, ":");
      this.sectores[0].CrearInformeTurno();
      if (this.sectores[0].Derrotado) {
        console.log(this.ejercitos[1].nombre, "ha ganado");
        break;
      }
    }
  }
}

class Sector {
  constructor() {
    this.espacios = [];
  }
  ObtenerElemPos(posicion) {
    return this.espacios[posicion];
  }
  get Derrotado() {
    let isDerrotado = true;
    for (let value of this.espacios) {
      if (value !== null && value.Estado == "activo") isDerrotado = false;
    }
    if (isDerrotado) return true;
    else return false;
  }
  CrearInformeTurno() {
    let activas = this.espacios.filter(item => {
      if (item !== null) return item.Estado == "activo";
    });
    let destruidas = this.espacios.filter(item => {
      if (item !== null) return item.Estado == "destruido";
    });
    console.log(
      "Las unidades activas son",
      activas.length,
      "y las destruidas",
      destruidas.length
    );
  }
}

let generador = new GeneradorNaves();
let ejercito1 = generador.crearEjercito("Ejercito bueno", 5, 5, 7);
let ejercito2 = generador.crearEjercito("Ejercito malo", 7, 7, 3);
let campo_batalla = generador.crearCampo(ejercito1, ejercito2);
campo_batalla.realizaPartida();
