import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Alert,
  Animated,
} from "react-native";

export default function PublicCategoryList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Shimmer effect
  const shimmerTranslate = new Animated.Value(-1);
  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerTranslate, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const ShimmerItem = () => (
    <View style={styles.item}>
      <Animated.View
        style={[
          styles.shimmerBox,
          {
            transform: [
              {
                translateX: shimmerTranslate.interpolate({
                  inputRange: [-1, 1],
                  outputRange: [-300, 300],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.shimmerBox,
          {
            transform: [
              {
                translateX: shimmerTranslate.interpolate({
                  inputRange: [-1, 1],
                  outputRange: [-300, 300],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Categories (Users)</Text>
      {loading ? (
        <FlatList
          data={[1, 2, 3, 4, 5]} // Placeholder items for shimmer effect
          keyExtractor={(item) => item.toString()}
          renderItem={() => <ShimmerItem />}
        />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.email}>{item.email}</Text>
              <Text style={styles.username}>@{item.username}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  item: {
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  email: {
    fontSize: 14,
    color: "#555",
  },
  username: {
    fontSize: 14,
    color: "#888",
  },
  shimmerBox: {
    height: 12,
    width: "80%",
    backgroundColor: "#e0e0e0",
    marginBottom: 6,
    borderRadius: 4,
  },
});
