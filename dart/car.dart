class Car {
  // Properties with more complex information
  String brand;
  String model;
  int year;
  double engineSize;
  String fuelType;
  int horsePower;
  int seatingCapacity;
  List<String> features;
  Map<String, dynamic> specifications;
  bool isElectric;
  double mileage;
  String vin;
  DateTime manufacturingDate;
  String transmissionType;
  
  // ✅ Default constructor with all properties
  Car(
    this.brand,
    this.model,
    this.year, {
    required this.engineSize,
    required this.fuelType,
    required this.horsePower,
    this.seatingCapacity = 5,
    this.features = const [],
    this.specifications = const {},
    this.isElectric = false,
    this.mileage = 0.0,
    required this.vin,
    required this.manufacturingDate,
    this.transmissionType = 'Automatic',
  });
  
  // ✅ Named constructor from Map with error handling and defaults
  Car.fromMap(Map<String, dynamic> map)
      : brand = map['brand'] ?? 'Unknown',
        model = map['model'] ?? 'Unknown',
        year = map['year'] ?? DateTime.now().year,
        engineSize = (map['engineSize'] is num) ? (map['engineSize'] as num).toDouble() : 0.0,
        fuelType = map['fuelType'] ?? 'Gasoline',
        horsePower = map['horsePower'] ?? 0,
        seatingCapacity = map['seatingCapacity'] ?? 5,
        features = (map['features'] is List) 
            ? List<String>.from(map['features']) 
            : <String>[],
        specifications = (map['specifications'] is Map) 
            ? Map<String, dynamic>.from(map['specifications']) 
            : <String, dynamic>{},
        isElectric = map['isElectric'] ?? false,
        mileage = (map['mileage'] is num) ? (map['mileage'] as num).toDouble() : 0.0,
        vin = map['vin'] ?? 'UNKNOWN_VIN_${DateTime.now().millisecondsSinceEpoch}',
        manufacturingDate = map['manufacturingDate'] is DateTime 
            ? map['manufacturingDate'] 
            : DateTime.now(),
        transmissionType = map['transmissionType'] ?? 'Automatic' {
    // Validate VIN on creation
    if (vin.length != 17) {
      print('WARNING: VIN number is not standard 17 characters: $vin');
    }
  }
  
  // ✅ Redirecting constructor with expanded information
  Car.latest(
    String brand, 
    String model, {
    required double engineSize,
    String fuelType = 'Gasoline',
    required int horsePower,
    required String vin,
  }) : this(
          brand,
          model,
          DateTime.now().year,
          engineSize: engineSize,
          fuelType: fuelType,
          horsePower: horsePower,
          features: ['Bluetooth', 'Navigation', 'Parking Assist', 'Lane Departure Warning'],
          specifications: {
            'emissions': 'Euro 6',
            'topSpeed': '250 km/h',
            'acceleration': '0-100 km/h in 6.5s',
          },
          vin: vin,
          manufacturingDate: DateTime.now(),
        );
  
  // ✅ Named constructor with initializer list - expanded
  Car.unknown()
      : brand = 'Unknown',
        model = 'Unknown',
        year = 0,
        engineSize = 0.0,
        fuelType = 'Unknown',
        horsePower = 0,
        seatingCapacity = 0,
        features = [],
        specifications = {},
        isElectric = false,
        mileage = 0.0,
        vin = 'UNKNOWN_VIN_${DateTime.now().millisecondsSinceEpoch}',
        manufacturingDate = DateTime.now(),
        transmissionType = 'Unknown' {
    print('Creating an unknown car instance');
  }
  
  // ✅ Factory constructor with multiple car types
  factory Car.factoryCar(String type) {
    switch (type.toLowerCase()) {
      case 'sports':
        return Car(
          'Ferrari',
          '488',
          2023,
          engineSize: 3.9,
          fuelType: 'Premium',
          horsePower: 710,
          seatingCapacity: 2,
          features: ['Carbon Fiber Interior', 'Sport Mode', 'Track Telemetry'],
          specifications: {
            'topSpeed': '330 km/h',
            'acceleration': '0-100 km/h in 2.9s',
            'weight': '1,475 kg',
            'transmission': '8-speed dual-clutch',
          },
          vin: 'FERR48820230001',
          manufacturingDate: DateTime(2023, 5, 15),
          transmissionType: 'Dual-Clutch',
        );
        
      case 'suv':
        return Car(
          'Toyota',
          'Land Cruiser',
          2023,
          engineSize: 4.5,
          fuelType: 'Diesel',
          horsePower: 268,
          seatingCapacity: 7,
          features: ['4WD', 'Off-road Mode', 'Adaptive Cruise Control'],
          specifications: {
            'groundClearance': '225 mm',
            'towingCapacity': '3,500 kg',
            'fuelCapacity': '93 L',
          },
          vin: 'TOYO78920230034',
          manufacturingDate: DateTime(2023, 3, 10),
        );
        
      case 'electric':
        return Car(
          'Tesla',
          'Model S',
          2023,
          engineSize: 0.0,
          fuelType: 'Electric',
          horsePower: 1020,
          features: ['Autopilot', 'Ludicrous Mode', 'Bioweapon Defense Mode'],
          specifications: {
            'range': '650 km',
            'battery': '100 kWh',
            'chargingTime': '15-45 minutes (Supercharger)',
          },
          isElectric: true,
          vin: 'TESL00320230089',
          manufacturingDate: DateTime(2023, 1, 20),
        );
        
      case 'luxury':
        return Car(
          'Mercedes-Benz',
          'S-Class',
          2023,
          engineSize: 4.0,
          fuelType: 'Premium',
          horsePower: 496,
          seatingCapacity: 5,
          features: ['Massage Seats', 'Ambient Lighting', 'Augmented Reality Navigation'],
          specifications: {
            'soundSystem': 'Burmester 4D',
            'displaySize': '12.8-inch OLED',
            'drivingAssistance': 'Level 3 autonomous',
          },
          vin: 'MERC65420230012',
          manufacturingDate: DateTime(2023, 4, 5),
        );
        
      default:
        return Car.unknown();
    }
  }
  
  // Additional factory constructor for electric vehicles
  factory Car.electric(String brand, String model, int year, {
    required int batteryCapacity,
    required int range,
    required int chargingTime,
    required int horsePower,
    required String vin,
  }) {
    return Car(
      brand,
      model,
      year,
      engineSize: 0.0,
      fuelType: 'Electric',
      horsePower: horsePower,
      isElectric: true,
      features: ['Zero Emissions', 'Regenerative Braking'],
      specifications: {
        'batteryCapacity': '$batteryCapacity kWh',
        'range': '$range km',
        'chargingTime': '$chargingTime minutes',
      },
      vin: vin,
      manufacturingDate: DateTime.now(),
    );
  }
  
  // Display comprehensive car information
  void displayInfo() {
    print('=== CAR DETAILED INFORMATION ===');
    print('Brand: $brand');
    print('Model: $model');
    print('Year: $year');
    print('VIN: $vin');
    print('Manufacturing Date: ${manufacturingDate.toIso8601String().split('T')[0]}');
    print('----- TECHNICAL SPECS -----');
    print('Engine: ${isElectric ? "Electric motor" : "$engineSize L"}');
    print('Fuel Type: $fuelType');
    print('Horsepower: $horsePower HP');
    print('Transmission: $transmissionType');
    print('Seating Capacity: $seatingCapacity');
    print('Mileage: $mileage km');
    print('----- FEATURES -----');
    for (var feature in features) {
      print('• $feature');
    }
    print('----- SPECIFICATIONS -----');
    specifications.forEach((key, value) {
      print('• $key: $value');
    });
    print('==============================');
  }
  
  // Calculate approximate value based on year, mileage and condition
  double calculateApproximateValue({double condition = 1.0}) {
    // Base depreciation calculation
    int age = DateTime.now().year - year;
    double baseValue = isElectric ? 50000 : 30000; // Base starting value
    
    // Apply brand prestige factor
    switch (brand.toLowerCase()) {
      case 'ferrari':
      case 'lamborghini':
      case 'porsche':
        baseValue *= 2.5;
        break;
      case 'mercedes-benz':
      case 'bmw':
      case 'audi':
        baseValue *= 1.5;
        break;
      case 'tesla':
        baseValue *= 1.3;
        break;
    }
    
    // Apply depreciation based on age
    double valueAfterAge = baseValue * (1 - (age * 0.08));
    
    // Apply mileage factor (less impact on luxury/sports cars)
    bool isLuxury = brand.toLowerCase() == 'ferrari' || 
                   brand.toLowerCase() == 'mercedes-benz' ||
                   horsePower > 400;
    
    double mileageFactor = isLuxury ? 0.0000005 : 0.000001;
    double valueAfterMileage = valueAfterAge * (1 - (mileage * mileageFactor));
    
    // Apply condition factor (0.1-1.0)
    double finalValue = valueAfterMileage * condition;
    
    return double.parse(finalValue.toStringAsFixed(2));
  }
  
  // Convert to map for database storage
  Map<String, dynamic> toMap() {
    return {
      'brand': brand,
      'model': model,
      'year': year,
      'engineSize': engineSize,
      'fuelType': fuelType,
      'horsePower': horsePower,
      'seatingCapacity': seatingCapacity,
      'features': features,
      'specifications': specifications,
      'isElectric': isElectric,
      'mileage': mileage,
      'vin': vin,
      'manufacturingDate': manufacturingDate.millisecondsSinceEpoch,
      'transmissionType': transmissionType,
    };
  }
  
  // Calculate fuel efficiency based on engine size and fuel type
  double getFuelEfficiency() {
    if (isElectric) return 0.0; // Electric cars don't use fuel
    
    // Base efficiency by fuel type (km per liter)
    double baseEfficiency;
    switch (fuelType.toLowerCase()) {
      case 'diesel':
        baseEfficiency = 18.0;
        break;
      case 'hybrid':
        baseEfficiency = 22.0;
        break;
      case 'premium':
        baseEfficiency = 12.0;
        break;
      case 'gasoline':
      default:
        baseEfficiency = 14.0;
    }
    
    // Adjust for engine size (larger engines are less efficient)
    double engineFactor = 1.0 - (engineSize * 0.05);
    
    // Adjust for vehicle age (newer vehicles are more efficient)
    int age = DateTime.now().year - year;
    double ageFactor = 1.0 - (age * 0.01);
    
    return double.parse((baseEfficiency * engineFactor * ageFactor).toStringAsFixed(1));
  }
  
  // Calculate carbon footprint (CO2 emission in g/km)
  double getCO2Emission() {
    if (isElectric) return 0.0; // Direct emissions from electric cars
    
    // Base emissions by fuel type
    double baseEmission;
    switch (fuelType.toLowerCase()) {
      case 'diesel':
        baseEmission = 130.0;
        break;
      case 'hybrid':
        baseEmission = 90.0;
        break;
      case 'premium':
        baseEmission = 180.0;
        break;
      case 'gasoline':
      default:
        baseEmission = 150.0;
    }
    
    // Adjust for engine size and power
    double powerFactor = horsePower / 100;
    double engineFactor = engineSize / 2.0;
    
    // Adjust for vehicle age
    int age = DateTime.now().year - year;
    double ageFactor = 1.0 + (age * 0.02); // Older cars emit more
    
    return double.parse((baseEmission * powerFactor * engineFactor * ageFactor).toStringAsFixed(1));
  }
  
  // Override == operator for equality check
  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is Car && other.vin == vin;
  }
  
  // Override hashCode for consistency with == operator
  @override
  int get hashCode => vin.hashCode;
  
  // Override toString for debugging
  @override
  String toString() {
    return 'Car{brand: $brand, model: $model, year: $year, vin: $vin}';
  }
}