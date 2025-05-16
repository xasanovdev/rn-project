// components/BottomSheetDialog.tsx
import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

const BottomSheetDialog = ({
  isVisible,
  onClose,
  children,
}: {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.sheet}>{children}</View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
});

export default BottomSheetDialog;
