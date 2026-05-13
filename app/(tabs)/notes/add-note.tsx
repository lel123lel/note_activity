import React, { useState } from "react";

import { addNote } from "@/lib/database";
import { router } from "expo-router";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const statusOptions = ["Pending", "Ongoing", "Finished"];

export default function AddNoteScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleSave = async () => {
    try {
      if (!title.trim()) {
        throw new Error("Note title is required");
      }

      addNote(title, description, status);
      Alert.alert("Saved", `Note "${title}" added successfully.`);
      router.back();
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Note</Text>

      <Text style={styles.fieldLabel}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter note title..."
        placeholderTextColor="#8DAE8C"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.fieldLabel}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Write your thoughts here..."
        placeholderTextColor="#8DAE8C"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Select Status</Text>
      <View style={styles.statusContainer}>
        {statusOptions.map((option) => (
          <Pressable
            key={option}
            style={[
              styles.statusButton,
              status === option && styles.statusButtonActive,
            ]}
            onPress={() => setStatus(option)}
          >
            <Text
              style={[
                styles.statusButtonText,
                status === option && styles.statusButtonTextActive,
              ]}
            >
              {option}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Note</Text>
      </Pressable>

      <Pressable style={styles.cancelButton} onPress={() => router.back()}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#E8F5E8",
  },
  input: {
    borderWidth: 1,
    borderColor: "#A5D6A7",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    backgroundColor: "#fff",
    color: "#1B5E20",
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2E7D32",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2E7D32",
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
    flexWrap: "wrap",
  },
  statusButton: {
    borderWidth: 1,
    borderColor: "#81C784",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
  },
  statusButtonActive: {
    backgroundColor: "#2E7D32",
    borderColor: "#2E7D32",
  },
  statusButtonText: {
    color: "#2E7D32",
    fontWeight: "600",
  },
  statusButtonTextActive: {
    color: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 24,
    color: "#2E7D32",
  },
  button: {
    backgroundColor: "#2E7D32",
    padding: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#2E7D32",
    padding: 16,
    borderRadius: 12,
  },
  cancelButtonText: {
    color: "#2E7D32",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});
