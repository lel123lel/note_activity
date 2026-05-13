import { deleteNote, getNotes, Note } from "@/lib/database";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);

  const loadNotes = () => {
    try {
      const data = getNotes();
      setNotes(data);
    } catch (error) {
      Alert.alert("Load Error", "Failed to load notes");
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, []),
  );

  const handleDelete = (id: number) => {
    try {
      deleteNote(id);
      loadNotes();
    } catch (error) {
      Alert.alert("Delete Error", "Failed to delete note");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Notes</Text>
        <Text style={styles.subtitle}>
          {notes.length === 1 ? "1 note" : `${notes.length} notes`}
        </Text>
      </View>

      <View style={styles.content}>
        {notes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No notes yet. Add one!</Text>
          </View>
        ) : (
          <FlatList
            data={notes}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.noteTitle}>{item.title}</Text>
                <Text style={styles.noteDescription}>{item.description}</Text>
                <Text style={styles.noteStatus}>{item.status}</Text>

                <View style={styles.actions}>
                  <Pressable
                    style={styles.detailButton}
                    onPress={() =>
                      router.push({
                        pathname: "/(tabs)/notes/note-detail",
                        params: {
                          id: item.id,
                          title: item.title,
                          description: item.description,
                          status: item.status,
                        },
                      })
                    }
                  >
                    <Text style={styles.detailButtonText}>View Details</Text>
                  </Pressable>

                  <Pressable
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </Pressable>
                </View>
              </View>
            )}
          />
        )}
      </View>

      <Pressable
        style={styles.addButton}
        onPress={() => router.push("/(tabs)/notes/add-note")}
      >
        <Text style={styles.addButtonText}>+ Add Note</Text>
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
  header: {
    borderRadius: 24,
    padding: 24,
    backgroundColor: "#C8E6C9",
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    marginBottom: 8,
    color: "#1B5E20",
  },
  subtitle: {
    fontSize: 16,
    color: "#388E3C",
  },
  content: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#4CAF50",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#C8E6C9",
    padding: 16,
    borderRadius: 18,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: "#2E7D32",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: "#1B5E20",
  },
  noteDescription: {
    fontSize: 14,
    color: "#2E7D32",
    marginBottom: 10,
  },
  noteStatus: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
    color: "#388E3C",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  detailButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 10,
  },
  detailButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#2E7D32",
    padding: 10,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
