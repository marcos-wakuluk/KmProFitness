import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";

const DietPlanScreen = ({ route }) => {
  const { mealPlan } = route.params;
  const [mealPlanUrl, setMealPlanUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/mealPlans/${mealPlan}`);

        setMealPlanUrl(response.data.mealPdfUrl);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching meal plan:", error);
        setLoading(false);
      }
    };

    fetchMealPlan();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.background}></View>
      {mealPlanUrl ? (
        <WebView
          source={{ uri: mealPlanUrl }}
          style={styles.pdf}
          onLoad={() => console.log("PDF loaded")}
          onError={(error) => console.log(error)}
        />
      ) : (
        <Text style={styles.errorText}>No se pudo cargar el PDF</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
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
  title: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 10,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#fff",
    marginTop: 10,
  },
});

export default DietPlanScreen;
