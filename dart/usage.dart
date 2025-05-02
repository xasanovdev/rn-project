void main() {
  // Using default constructor
  var car1 = Car('Toyota', 'Camry', 2021);
  car1.displayInfo();

  // Using named constructor
  var car2 = Car.fromMap({'brand': 'BMW', 'model': 'X6', 'year': 2022});
  car2.displayInfo();

  // Using redirecting constructor
  var car3 = Car.latest('Tesla', 'Model Y');
  car3.displayInfo();

  // Using named constructor with default values
  var car4 = Car.unknown();
  car4.displayInfo();

  // Using factory constructor
  var car5 = Car.factoryCar('sports');
  car5.displayInfo();
}
