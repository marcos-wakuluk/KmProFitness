import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, Animated } from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import { API_BASE_URL } from "@env";

const DietPlanScreen = ({ route }) => {
  const { mealPlan } = route.params;
  const [mealPlanUrl, setMealPlanUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/meal-plans/${mealPlan}`);
        setMealPlanUrl(data.mealPdfUrl);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching meal plan:", error);
        setLoading(false);
      }
    };

    fetchMealPlan();
  }, []);

  useEffect(() => {
    if (pdfLoading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.5,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [pdfLoading, pulseAnim]);

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
        <>
          {pdfLoading && (
            <View style={styles.overlay}>
              <View style={styles.pdfLoadingContainer}>
                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                  <Ionicons name="restaurant" size={50} color="#ffffff" />
                </Animated.View>
              </View>
            </View>
          )}
          <WebView
            source={{ uri: mealPlanUrl }}
            style={styles.pdf}
            onLoad={() => setPdfLoading(false)}
            onError={(error) => {
              console.log(error);
              setPdfLoading(false);
            }}
          />
        </>
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
  pdfLoadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  errorText: {
    color: "#fff",
    marginTop: 10,
  },
});

export default DietPlanScreen;
