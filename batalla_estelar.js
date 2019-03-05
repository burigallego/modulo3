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
    super(10, 5, "Nave2");
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
  estableceEjercitos(ejercito) {
    let sectorNuevo = new Sector();
    this.ejercitos.push(ejercito);
    sectorNuevo.espacios = ejercito.listaNaves;
    this.sectores.push(sectorNuevo);
  }

  seleccionarObjetivo(posicion) {
    for (let value of this.sectores[posicion].espacios) {
      if (value.Estado == "activo") {
        return value;
      }
    }
  }

  disparar(posicion_ataca, posicion_defiende) {
    let objetivo = this.seleccionarObjetivo(posicion_defiende);
    let atacante = this.seleccionarObjetivo(posicion_ataca);
    objetivo.RecibirDisparo(atacante.dano);
  }

  realizaPartida() {
    while (true) {
      this.disparar(0, 1);
      this.ejercitos[1].CrearInforme();
      if (this.ejercitos[1].Derrotado) {
        console.log(this.ejercitos[0].nombre, "ha ganado");
        break;
      }
      this.disparar(1, 0);
      this.ejercitos[0].CrearInforme();
      if (this.ejercitos[0].Derrotado) {
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
}
let generador = new GeneradorNaves();
let ejercito1 = generador.crearEjercito("verde", 3, 4, 6);
let ejercito2 = generador.crearEjercito("rojo", 3, 7, 3);
console.log(ejercito1);
console.log(ejercito2);
let campo_batalla = generador.crearCampo(ejercito1, ejercito2);
campo_batalla.realizaPartida();
