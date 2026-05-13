import { initDatabase } from "@/lib/database";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  useEffect(() => {
    try {
      initDatabase();
    } catch (error) {
      Alert.alert("Database Error", "Failed to initialize database");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Note App</Text>
      <Text style={styles.subtitle}>Welcome user</Text>
      <Pressable style={styles.button} onPress={() => router.push("/(tabs)/notes/notes")}>
        <Text style={styles.buttonText}>Open Notes</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#E8F5E8",
  },
  title: {
    fontSize: 50,
    fontWeight: "700",
    marginBottom: 12,
    color: "#2E7D32",
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 12,
    color: "#4CAF50",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
});
