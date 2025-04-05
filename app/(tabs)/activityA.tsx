import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

export default function ActivityA() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");

  // Task 4: Send data to Activity B using Bundle
  const sendDataToActivityB = () => {
    // In React Native, we pass the data as params instead of Bundle
    router.push({
      pathname: "/activityB",
      params: {
        name,
        phoneNumber,
        age: parseInt(age) || 0,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Activity A</Text>
      <Text style={styles.subtitle}>Enter User Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={[
          styles.button,
          (!name || !phoneNumber || !age) && styles.buttonDisabled,
        ]}
        onPress={sendDataToActivityB}
        disabled={!name || !phoneNumber || !age}
      >
        <Text style={styles.buttonText}>Send Data to Activity B</Text>
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
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
