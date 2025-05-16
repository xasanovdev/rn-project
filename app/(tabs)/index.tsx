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
  Modal,
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
  setToastMessage: (message: string) => void
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

  const [count, setCount] = useState(0);

  // State for web toast
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

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

      <View style={styles.counterContainer}>
        <TouchableOpacity
          style={styles.counterButton}
          onPress={() => setCount(count - 1)}
        >
          <Text style={styles.counterButtonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.counterValue}>{count}</Text>

        <TouchableOpacity
          style={styles.counterButton}
          onPress={() => setCount(count + 1)}
        >
          <Text style={styles.counterButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Task 1: Bottom Sheet Dialog */}
      <TouchableOpacity style={styles.button} onPress={toggleBottomSheet}>
        <Text style={styles.buttonText}>Show Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Open Bottom Sheet</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.bottomSheet}>
            <Text style={styles.bottomSheetText}>This is a bottom sheet!</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

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
  counterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },

  counterButton: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 50,
    marginHorizontal: 20,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  counterButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },

  counterValue: {
    fontSize: 28,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },

  bottomSheet: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  bottomSheetText: {
    fontSize: 18,
    marginBottom: 20,
  },

  closeText: {
    color: "#2196F3",
    fontWeight: "bold",
    fontSize: 16,
  },
});
