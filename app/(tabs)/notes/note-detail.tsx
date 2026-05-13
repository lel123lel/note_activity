import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function NoteDetailScreen() {
  const { id, title, description, status } = useLocalSearchParams<{
    id: string;
    title: string;
    description: string;
    status: string;
  }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Note Detail</Text>
      <Text style={styles.label}>ID: {id}</Text>
      <Text style={styles.label}>Title: {title}</Text>
      <Text style={styles.label}>Description: {description}</Text>
      <Text style={styles.label}>Status: {status}</Text>

      <Pressable
        style={styles.editButton}
        onPress={() =>
          router.push({
            pathname: "/(tabs)/notes/edit-note",
            params: { id, title, description, status },
          })
        }
      >
        <Text style={styles.editButtonText}>Edit Note</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E8F5E8",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 16,
    color: "#2E7D32",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "#4CAF50",
  },
  editButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  editButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});
