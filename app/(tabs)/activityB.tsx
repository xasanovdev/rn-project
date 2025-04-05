import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function ActivityB() {
  // Task 4: Receive data from Bundle (route.params in React Native)
  const params = useLocalSearchParams();
  const name = params.name as string;
  const phoneNumber = params.phoneNumber as string;
  const age = params.age as string;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Activity B</Text>
      <Text style={styles.subtitle}>Received User Information:</Text>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Name:</Text>
          <Text style={styles.infoValue}>{name}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Phone Number:</Text>
          <Text style={styles.infoValue}>{phoneNumber}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Age:</Text>
          <Text style={styles.infoValue}>{age}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  infoCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoLabel: {
    fontWeight: "bold",
    width: "40%",
    fontSize: 16,
  },
  infoValue: {
    width: "60%",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
