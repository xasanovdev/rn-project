import React, { useState } from "react";
import { View, Text, Button, TextInput, FlatList } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  // In-memory array for CRUD operations
  const [items, setItems] = useState<
    { id: number; title: string; latitude: number; longitude: number }[]
  >([]);
  const [newItem, setNewItem] = useState("");
  const [currentLat, setCurrentLat] = useState(37.78825); // Default lat
  const [currentLong, setCurrentLong] = useState(-122.4324); // Default long

  // Add item to the array with coordinates
  const addItem = () => {
    if (newItem.trim() === "") return;
    setItems((prevItems) => [
      ...prevItems,
      {
        id: Math.random(),
        title: newItem,
        latitude: currentLat,
        longitude: currentLong,
      },
    ]);
    setNewItem("");
  };

  // Delete item from the array
  const deleteItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Update item title
  const updateItem = (id: number, newTitle: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, title: newTitle } : item
      )
    );
  };

  // Handle map press to get new coordinates
  const handleMapPress = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setCurrentLat(latitude);
    setCurrentLong(longitude);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Google Map View */}
      <MapView
        style={{ flex: 1 }}
        provider="google"
        initialRegion={{
          latitude: currentLat,
          longitude: currentLong,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        {items.map((item) => (
          <Marker
            key={item.id}
            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
            title={item.title}
            description={`ID: ${item.id}`}
          />
        ))}
      </MapView>

      {/* Input for adding new items */}
      <TextInput
        value={newItem}
        onChangeText={setNewItem}
        placeholder="Enter new item"
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          paddingLeft: 8,
        }}
      />
      <Button title="Add Item" onPress={addItem} />

      {/* FlatList to display CRUD items */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text style={{ flex: 1 }}>{item.title}</Text>
            <Button title="Delete" onPress={() => deleteItem(item.id)} />
            <Button
              title="Update"
              onPress={() =>
                updateItem(item.id, prompt("Enter new title:") || item.title)
              }
            />
          </View>
        )}
      />
    </View>
  );
}
