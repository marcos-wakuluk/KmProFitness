import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Checklist = () => {
  const [checks, setChecks] = useState(Array(10).fill(false));

  useEffect(() => {
    const loadChecks = async () => {
      try {
        const savedChecks = await AsyncStorage.getItem("checks");
        if (savedChecks !== null) {
          setChecks(JSON.parse(savedChecks));
        }
      } catch (error) {
        console.error("Failed to load checks from storage", error);
      }
    };

    loadChecks();
  }, []);

  const toggleCheck = async (index) => {
    const newChecks = [...checks];
    newChecks[index] = !newChecks[index];
    setChecks(newChecks);

    try {
      await AsyncStorage.setItem("checks", JSON.stringify(newChecks));
    } catch (error) {
      console.error("Failed to save checks to storage", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}></View>

      <Image source={require("../assets/KM-white.png")} style={styles.image} />
      <Text style={styles.title}>Tareas a completar</Text>
      {checks.map((checked, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => toggleCheck(index)}
          style={[styles.checkItem, checked && { filter: "brightness(60%)" }]}
        >
          <Text style={checked ? styles.checked : styles.unchecked}>{`Check ${index + 1}`}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  background: {
    position: "absolute",
    backgroundColor: "#0061a7",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  image: {
    position: "absolute",
    resizeMode: "contain",
    zIndex: 0,
    height: 200,
    width: 200,
    alignSelf: "center",
    top: "40%",
  },
  checkItem: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    opacity: 0.8,
  },
  checked: {
    textDecorationLine: "line-through",
    color: "#888",
    fontSize: 24,
  },
  unchecked: {
    textDecorationLine: "none",
    color: "#333",
    fontSize: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "Black",
    textAlign: "center",
    marginVertical: 20,
  },
});

export default Checklist;
