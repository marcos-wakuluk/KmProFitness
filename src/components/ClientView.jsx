import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Image, Modal } from "react-native";
import PropTypes from "prop-types";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Card from "./Card";
import Contact from "./Contact";
import { motivationalQuotes } from "../constants";
// import Video from "react-native-video";
import { ProgressBar } from "react-native-paper";

const ClientView = ({ navigation }) => {
  const route = useRoute();
  const { user } = route.params;
  const username = user?.name || "Usuario";
  const [showPPRSteps, setShowPPRSteps] = useState(false);
  const [showStep1Details, setShowStep1Details] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showReminderCard, setShowReminderCard] = useState(true);

  const handlePPRPress = () => {
    setShowPPRSteps(true);
  };

  const handleBackPress = () => {
    setShowPPRSteps(false);
    setShowStep1Details(false);
  };

  const handleStep1Press = () => {
    setShowStep1Details(true);
  };

  const handleVideoPress = () => {
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  const handleCloseReminderCard = () => {
    setShowReminderCard(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      <View style={styles.background}></View>

      <Image source={require("../assets/KM-white.png")} style={styles.image} />

      <View style={styles.contentContainer}>
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile", { userId: user._id })}>
            <Icon name="person" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("DietPlanScreen", { mealPlan: user.mealPlan })}>
            <Icon name="restaurant" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Workout", { trainingPlan: user.trainingPlan })}>
            <Icon name="barbell-sharp" size={40} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Payment")}>
            <Icon name="wallet" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.welcomeText}>{`Hola ${username}`}</Text>
        {(() => {
          if (!showPPRSteps) {
            return (
              <>
                <Text style={styles.progressText}>Tu progreso</Text>
                <ProgressBar progress={0.5} style={styles.progressBar} />
                {showReminderCard && (
                  <View style={styles.reminderCardContainer}>
                    <Card title={"Recorda ir a entrenar hoy"} />
                    <TouchableOpacity style={styles.closeButtonReminder} onPress={handleCloseReminderCard}>
                      <Text style={styles.closeButtonTextReminder}>X</Text>
                    </TouchableOpacity>
                  </View>
                )}
                <TouchableOpacity onPress={handlePPRPress}>
                  <Card title={"Tu Ruta de Transformación"} />
                </TouchableOpacity>
              </>
            );
          } else if (showStep1Details) {
            return (
              <>
                <TouchableOpacity onPress={handleVideoPress}>
                  <Card title={"Video de bienvenida"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Profile", { user })}>
                  <Card title={"Formulario interactivo"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Workout", { trainingPlan: user.trainingPlan })}>
                  <Card title={"Plan de entrenamiento básico"} />
                </TouchableOpacity>
                <Card title={"Checklist semanal descargable"} />
                <Card title={"Ejercicio de mentalidad y reflexión"} />
                <TouchableOpacity onPress={handleBackPress}>
                  <Text style={styles.backButton}>Volver</Text>
                </TouchableOpacity>
              </>
            );
          } else {
            return (
              <>
                <TouchableOpacity onPress={handleStep1Press}>
                  <Card title={"Paso 1"} />
                </TouchableOpacity>
                <Card title={"Paso 2"} />
                <Card title={"Paso 3"} />
                <Card title={"Paso 4"} />
                <TouchableOpacity onPress={handleBackPress}>
                  <Text style={styles.backButton}>Volver</Text>
                </TouchableOpacity>
              </>
            );
          }
        })()}
      </View>
      {!showPPRSteps && (
        <View style={styles.motivationalCardContainer}>
          <Card phrases={motivationalQuotes} />
        </View>
      )}
      <View style={[styles.contactContainer, { backgroundColor: "white" }]}>
        <Contact />
      </View>
      <Modal visible={showVideo} transparent={true} animationType="slide">
        <View style={styles.videoContainer}>
          {/* <Video
            source={{ uri: "https://www.youtube.com/watch?v=C0DPdy98e4c" }}
            style={styles.video}
            controls={true}
            onEnd={handleCloseVideo}
          /> */}
          <TouchableOpacity onPress={handleCloseVideo} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  divider: {
    backgroundColor: "black",
    height: 2,
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    zIndex: 1,
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  contactContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: "5%",
  },
  welcomeText: {
    fontSize: 40,
    color: "black",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 20,
  },
  progressText: {
    fontSize: 30,
    color: "black",
    marginBottom: 5,
    textAlign: "center",
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
  backButton: {
    fontSize: 20,
    color: "blue",
    textAlign: "center",
    marginTop: 20,
  },
  videoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  video: {
    width: "90%",
    height: "50%",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "black",
    fontSize: 16,
  },
  progressBar: {
    margin: 10,
    height: 10,
    marginVertical: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  motivationalCardContainer: {
    position: "absolute",
    bottom: 50, // Adjust as needed to be above the contact section
    width: "100%",
    paddingHorizontal: 20,
  },
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
  closeButtonTextReminder: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

ClientView.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default ClientView;
