import React, { useState } from "react";
import { View, Text, Button, TextInput, FlatList } from "react-native";

export default function App() {
  // Initial in-memory array
  const [items, setItems] = useState<{ id: number; title: string }[]>([]);
  const [newItem, setNewItem] = useState("");

  // Add item to the array
  const addItem = () => {
    if (newItem.trim() === "") return;
    setItems((prevItems) => [
      ...prevItems,
      { id: Math.random(), title: newItem }, // Use random id for simplicity
    ]);
    setNewItem(""); // Clear input
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

  return (
    <View style={{ padding: 20 }}>
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

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
              marginTop: 10,
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
