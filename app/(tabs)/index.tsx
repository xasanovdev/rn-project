import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  FlatList,
  ToastAndroid,
  Platform,
  Alert,
} from "react-native";
import { router } from "expo-router";
import BottomSheetDialog from "@/components/BottomSheet";
import NotificationWithActions from "@/components/CustomToast";
import Toast from "react-native-toast-message";

// Custom Toast component for web
const Toast2 = ({ visible, message, onDismiss }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 2000); // Dismiss after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [visible, onDismiss]);

  if (!visible) return null;

  return (
    <View style={styles.toastContainer}>
      <Text style={styles.toastText}>{message}</Text>
    </View>
  );
};

// Cross-platform toast function
const showToast = (
  message: string,
  setToastVisible: (visible: boolean) => void,
  setToastMessage: (message: string) => void,
) => {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else if (Platform.OS === "ios") {
    Alert.alert("", message, [{ text: "OK" }], { cancelable: true });
  } else if (Platform.OS === "web") {
    // Web toast
    setToastMessage(message);
    setToastVisible(true);
  } else {
    console.log(message);
  }
};

export default function TasksScreen() {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const rotationAnim = useRef(new Animated.Value(0)).current;

  // State for web toast
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Sample data for RecyclerView (FlatList in React Native)
  const items = [
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 2" },
    { id: "3", name: "Item 3" },
    { id: "4", name: "Item 4" },
    { id: "5", name: "Item 5" },
  ];

  // 1. BottomSheetDialog functionality
  const toggleBottomSheet = () => {
    setIsBottomSheetVisible(!isBottomSheetVisible);
  };

  // 2. Rotating Image with ObjectAnimator (Animated in React Native)
  const rotateImage = () => {
    Animated.timing(rotationAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      rotationAnim.setValue(0); // Reset for next animation
    });
  };

  const rotation = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const showNotification = () => {
    Toast.show({
      type: "success",
      text1: "Hello 👋",
      text2: "This is a simple notification",
    });
  };

  // 3. ClickListener for RecyclerView items
  const handleItemClick = (item: { id: string; name: string }) => {
    showToast(`Clicked: ${item.name}`, setToastVisible, setToastMessage);
  };

  return (
    <View style={styles.container}>
      {/* Web toast component */}
      {Platform.OS === "web" && (
        <Toast2
          visible={toastVisible}
          message={toastMessage}
          onDismiss={() => setToastVisible(false)}
        />
      )}

      <Text style={styles.header}>Mobile Development Tasks</Text>

      {/* Task 1: Bottom Sheet Dialog */}
      <TouchableOpacity style={styles.button} onPress={toggleBottomSheet}>
        <Text style={styles.buttonText}>Show Menu</Text>
      </TouchableOpacity>

      <View style={{ display: "flex", gap: 16 }}>
        <NotificationWithActions />
        <TouchableOpacity style={styles.button} onPress={showNotification}>
          <Text style={styles.buttonText}>Show Notification</Text>
        </TouchableOpacity>
      </View>

      <BottomSheetDialog
        isVisible={isBottomSheetVisible}
        onClose={toggleBottomSheet}
      >
        <View style={styles.bottomSheetContainer}>
          <TouchableOpacity
            style={styles.bottomSheetItem}
            onPress={() => {
              toggleBottomSheet();
              showToast("Profile selected", setToastVisible, setToastMessage);
            }}
          >
            <Text style={styles.bottomSheetText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomSheetItem}
            onPress={() => {
              toggleBottomSheet();
              showToast("Settings selected", setToastVisible, setToastMessage);
            }}
          >
            <Text style={styles.bottomSheetText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomSheetItem}
            onPress={() => {
              toggleBottomSheet();
              showToast("Logout selected", setToastVisible, setToastMessage);
            }}
          >
            <Text style={styles.bottomSheetText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetDialog>

      {/* Task 3: RecyclerView with ClickListener */}
      <Text style={styles.sectionTitle}>RecyclerView Items:</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => handleItemClick(item)}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
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
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  bottomSheetContainer: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  bottomSheetText: {
    fontSize: 16,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  listItem: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  // Toast styles
  toastContainer: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 12,
    borderRadius: 8,
    zIndex: 1000,
    alignItems: "center",
  },
  toastText: {
    color: "white",
    fontSize: 16,
  },
});
