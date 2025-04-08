import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ReminderCard = ({ onClose }) => {
  return (
    <View style={styles.reminderCardContainer}>
      <View style={styles.card}>
        <Text style={styles.message}>Recorda ir a entrenar hoy.</Text>
        <TouchableOpacity style={styles.closeButtonReminder} onPress={onClose}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reminderCardContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 1000,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  message: {
    fontSize: 24,
    color: "#555",
    marginBottom: 20,
  },
  closeButtonReminder: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "black",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ReminderCard;
