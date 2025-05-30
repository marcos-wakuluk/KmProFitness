import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, TouchableOpacity, StyleSheet, Text, Image, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PropTypes from "prop-types";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Card from "./Card";
import Contact from "./Contact";
import { motivationalQuotes } from "../constants";
// import Video from "react-native-video";
import ProgressBarSection from "./ProgressBarSection";
import ReminderCard from "./ReminderCard";
import MenuSection from "./MenuSection";
import CardsSection1 from "./CardsSection1";

const API_BASE_URL = process.env.API_BASE_URL;

const ClientView = ({ navigation }) => {
  const route = useRoute();
  const { user } = route.params;
  const username = user?.name || "";

  const [showPPRSteps, setShowPPRSteps] = useState(false);
  const [showStep1Details, setShowStep1Details] = useState(false);
  const [showStep2Details, setShowStep2Details] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showReminderCard, setShowReminderCard] = useState(true);
  const [enabledCards, setEnabledCards] = useState({
    bienvenida: true,
    fichaTecnica: false,
    planEntrenamiento: false,
    checklist: false,
    mentalidad: false,
  });
  const [progress, setProgress] = useState(0);
  const isMainView = !showPPRSteps && !showStep1Details && !showStep2Details;

  const phases = {
    fase1: ["bienvenida", "fichaTecnica", "planEntrenamiento", "checklist", "mentalidad"],
    fase2: [
      "guia de entreno para tus objetivos y necesidades",
      "Guía descargable para calcular macros",
      "Checklist de hábitos diarios para profundizar el cambio",
      "Reto de 7 días",
    ],
    fase3: [
      "Formulario de actualización de medidas",
      "Entrenamiento progresivo",
      "Guía de comidas libres estratégicas",
      "Desafío de 3 días intensivos",
    ],
    fase4: [
      "Formulario de actualización de medidas",
      "Entrenamiento progresivo",
      "Guía de comidas libres estratégicas",
      "Desafío de 3 días intensivos",
    ],
  };

  useEffect(() => {
    const loadProgressFromDB = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/progress/${user._id}`);
        const { enabledCards: savedCards, progress: savedProgress } = response.data.data;

        if (savedCards) {
          setEnabledCards(savedCards);
        }
        if (savedProgress !== undefined) {
          setProgress(savedProgress);
        }
      } catch (error) {
        console.error("Error al cargar el progreso desde la base de datos:", error);
      }
    };

    loadProgressFromDB();
  }, [user?._id]);

  const saveProgressToDB = async (updatedCards, updatedProgress) => {
    try {
      await axios.post(`${API_BASE_URL}/progress/${user._id}`, {
        enabledCards: updatedCards,
        progress: updatedProgress,
      });
    } catch (error) {
      console.error("Error al guardar el progreso en la base de datos:", error);
    }
  };

  useEffect(() => {
    const calculateProgress = () => {
      const totalPhases = Object.keys(phases).length;
      const totalProgress = Object.values(phases).reduce((acc, phaseCards) => {
        const completedCards = phaseCards.filter((card) => enabledCards[card]);
        return acc + completedCards.length / phaseCards.length;
      }, 0);

      return totalProgress / totalPhases;
    };

    const newProgress = calculateProgress();
    setProgress(newProgress);
    saveProgressToDB(enabledCards, newProgress);
  }, [enabledCards]);

  const handleCardPress = async (cardName) => {
    const updatedCards = {
      ...enabledCards,
      [cardName]: true,
    };
    setEnabledCards(updatedCards);

    try {
      await AsyncStorage.setItem("enabledCards", JSON.stringify(updatedCards));
    } catch (error) {
      console.error("Error al guardar el estado de las tarjetas:", error);
    }
  };

  const handlePPRPress = () => {
    setShowPPRSteps(true);
  };

  const handleBackPress = (resetStep = false) => {
    setShowPPRSteps(false);
    if (resetStep) {
      setShowStep1Details(false);
    }
  };

  const handleBackPressCards = () => {
    setShowStep1Details(false);
  };

  const handleStep1Press = () => {
    setShowPPRSteps(false);
    setShowStep1Details(true);
  };

  const handleStep2Press = () => {
    setShowStep2Details(true);
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
        <MenuSection navigation={navigation} user={user} />
        {showReminderCard && <ReminderCard onClose={handleCloseReminderCard} />}
        <ProgressBarSection progress={progress} />
        {isMainView && (
          <>
            <Text style={styles.welcomeText}>{`Hola ${username}`}</Text>
            <TouchableOpacity onPress={handlePPRPress}>
              <Card title={"Tu Ruta de Transformación"} />
            </TouchableOpacity>
          </>
        )}

        {showPPRSteps && !showStep1Details && !showStep2Details && (
          <>
            <TouchableOpacity onPress={handleStep1Press}>
              <View style={styles.cardBase}>
                <Text style={styles.cardTitle}>Fase 1</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleStep2Press}>
              <View style={[styles.cardBase, styles.blockedCard]}>
                <Text style={styles.cardTitle}>Fase 2</Text>
                <Icon name="lock-closed" size={40} />
              </View>
            </TouchableOpacity>
            <View style={[styles.cardBase, styles.blockedCard]}>
              <Text style={styles.cardTitle}>Fase 3</Text>
              <Icon name="lock-closed" size={40} />
            </View>
            <View style={[styles.cardBase, styles.blockedCard]}>
              <Text style={styles.cardTitle}>Fase 4</Text>
              <Icon name="lock-closed" size={40} />
            </View>
            <TouchableOpacity onPress={handleBackPress}>
              <Text style={styles.backButton}>Volver</Text>
            </TouchableOpacity>
          </>
        )}

        {showStep1Details && (
          <CardsSection1
            enabledCards={enabledCards}
            handleCardPress={handleCardPress}
            handleBackPressCards={handleBackPressCards}
            handleVideoPress={handleVideoPress}
            navigation={navigation}
            user={user}
          />
        )}

        {showStep2Details && (
          <View style={styles.disabledCard}>
            <Text style={styles.cardTitle}>Fase 2</Text>
          </View>
        )}

        {!showPPRSteps && !showStep1Details && !showStep2Details && (
          <View style={styles.motivationalCardContainer}>
            <Card phrases={motivationalQuotes} />
          </View>
        )}
      </View>

      <View style={[styles.contactContainer]}>
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
  cardBase: {
    height: 60,
    backgroundColor: "#d8f0ff",
    borderRadius: 8,
    borderColor: "#53c0ff",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    padding: 10,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  blockedCard: {
    filter: "brightness(60%)",
  },
  cardTitle: {
    position: "absolute",
    top: 10,
    left: "45%",
    fontSize: 24,
    color: "black",
    transform: [{ translateY: 10 }],
  },
  lockIcon: {
    fontSize: 50,
    color: "white",
  },
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
  contactContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
  },
  welcomeText: {
    fontSize: 40,
    color: "black",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 20,
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
    bottom: 80,
    width: "100%",
  },
  disabledCard: {
    opacity: 0.5,
    position: "relative",
  },
  lockIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
});

ClientView.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default ClientView;
