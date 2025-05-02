class Car {
  String brand;
  String model;
  int year;

  // ✅ Default constructor
  Car(this.brand, this.model, this.year);

  // ✅ Named constructor
  Car.fromMap(Map<String, dynamic> map)
      : brand = map['brand'],
        model = map['model'],
        year = map['year'];

  // ✅ Redirecting constructor
  Car.latest(String brand, String model)
      : this(brand, model, DateTime.now().year);

  // ✅ Named constructor with initializer list
  Car.unknown()
      : brand = 'Unknown',
        model = 'Unknown',
        year = 0;

  // ✅ Factory constructor
  factory Car.factoryCar(String type) {
    if (type == 'sports') {
      return Car('Ferrari', '488', 2023);
    } else {
      return Car.unknown();
    }
  }

  void displayInfo() {
    print('Brand: $brand, Model: $model, Year: $year');
  }
}
