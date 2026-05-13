import { Stack } from "expo-router";
import React from "react";

export default function NotesLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#111",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold"
                }
            }}
        >
            <Stack.Screen 
            name="notes"
            options={{
                title: "Note Lists"
            }}
            />

            <Stack.Screen 
            name="add-note"
            options={{
                title: "Add Note"
            }}
            />

            <Stack.Screen 
            name="edit-note"
            options={{
                title: "Edit Note"
            }}
            />

            <Stack.Screen 
            name="notes-detail"
            options={{
                title: "Note Details"
            }}
            />


        </Stack>
    )
}