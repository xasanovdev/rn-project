void main() {
  // Create a sports car using factory constructor
  var ferrari = Car.factoryCar('sports');
  ferrari.displayInfo();
  
  // Calculate car value and efficiency
  print('Estimated value: \$${ferrari.calculateApproximateValue()}');
  print('Fuel efficiency: ${ferrari.getFuelEfficiency()} km/L');
  print('CO2 emissions: ${ferrari.getCO2Emission()} g/km');
  
  // Create an electric car
  var tesla = Car.electric(
    'Tesla', 
    'Model Y', 
    2023,
    batteryCapacity: 75,
    range: 505,
    chargingTime: 30,
    horsePower: 450,
    vin: 'TSLA202304567'
  );
  tesla.displayInfo();
}