import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
    return (
        <Tabs
        screenOptions={{
                tabBarActiveTintColor: "#1565c0",
                headerStyle: {
                    backgroundColor: "#111"
                },
                headerTintColor: "#fff",
                tabBarStyle: {
                    paddingBottom: 6,
                    height: 60,
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="notes"
                options={{
                    title: "Notes",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="book" color={color} size={size} />
                    ),                
                }}
            />
        </Tabs>
    );
}