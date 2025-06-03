import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProgressBar } from "react-native-paper";

const ProgressBarSection = ({ progress }) => {
  return (
    <View>
      <Text style={styles.progressText}>Tu progreso</Text>
      <ProgressBar progress={progress} style={styles.progressBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressText: {
    fontSize: 30,
    color: "black",
    marginBottom: 5,
    textAlign: "center",
  },
  progressBar: {
    margin: 10,
    height: 10,
    marginVertical: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
});

export default ProgressBarSection;
