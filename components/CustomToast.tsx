import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const CustomNotification = ({ text1, onConfirm, onCancel }) => {
  return (
    <View style={styles.customContainer}>
      <Text style={styles.title}>{text1}</Text>
      <View style={styles.buttonRow}>
        <Button title="Confirm" onPress={onConfirm} />
        <Button title="Cancel" color="red" onPress={onCancel} />
      </View>
    </View>
  );
};

export default function NotificationWithActions() {
  const showNotification = () => {
    Toast.show({
      type: "custom_action",
      text1: "Are you sure?",
      props: {
        onConfirm: () => {
          Toast.hide();
          alert("Confirmed!");
        },
        onCancel: () => {
          Toast.hide();
          alert("Cancelled!");
        },
      },
    });
  };

  return (
    <View style={{ marginTop: 10, zIndex: 1000 }}>
      <Button title="Show Action Notification" onPress={showNotification} />
      <Toast config={toastConfig} />
    </View>
  );
}

const toastConfig = {
  custom_action: ({ text1, props }) => (
    <CustomNotification
      text1={text1}
      onConfirm={props.onConfirm}
      onCancel={props.onCancel}
    />
  ),
};

const styles = StyleSheet.create({
  customContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    borderColor: "#ddd",
    borderWidth: 1,
    position: "absolute",
    alignSelf: "center",
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
