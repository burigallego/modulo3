class Polygon {
  constructor(name, sides) {
    this.name = name;
    this.sides = sides;
  }
  getArea() {}
}

class Triangle extends Polygon {
  constructor(base, heigth) {
    super("triangle", 3);
    this.base = base;
    this.heigth = heigth;
  }
  getArea() {
    return (this.base * this.heigth) / 2;
  }
}

class Circle extends Polygon {
  constructor(radius) {
    super("circle", 1);
    this.radius = radius;
  }
  getArea() {
    return Math.PI * this.radius ** 2;
  }
}

class Parallelepiped extends Polygon {
  constructor(base, heigth) {
    super("parallelepiped", 4);
    this.base = base;
    this.heigth = heigth;
  }
  getArea() {
    return this.base * this.heigth;
  }
}

class Square extends Parallelepiped {
  constructor(side) {
    super(side, side);
    this.name = "square";
  }
}

let triangle = new Triangle(2, 3);

console.log(triangle);

let square = new Square(2);

console.log(square);

let circle = new Circle(2);

console.log(circle);

let parallelepiped = new Parallelepiped(2, 3);

console.log(parallelepiped);

let polygon = new Polygon("pentagon", 5);

console.log(polygon);

console.log("triangle area = ", triangle.getArea());
console.log("square area = ", square.getArea());
console.log("parallelepiped area = ", parallelepiped.getArea());
console.log("circle area = ", circle.getArea());
