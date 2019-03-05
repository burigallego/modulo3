class Profesor {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }
  soyElProfe() {
    console.log("Soy el profe " + this.nombre);
  }
  get edadMinima() {
    return 12;
  }
  get edad() {
    return this._edad;
  }
  set edad(value) {
    if (value < this.edadMinima) {
      console.log("Demasiado joven para dar clase");
      this._edad = 0;
      return;
    }
    this._edad = value;
  }
}

const profesor1 = new Profesor("Marcos", 8);

console.log(profesor1.edad);

console.log(profesor1.edadMinima);

profesor1.edad = 20;
console.log(profesor1.edad);

profesor1.edad = 11;
console.log(profesor1._edad);
