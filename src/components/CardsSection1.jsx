import { TouchableOpacity, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Card from "./Card";

const CardsSection1 = ({ enabledCards, handleCardPress, handleBackPressCards, handleVideoPress, navigation, user }) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          handleVideoPress();
          handleCardPress("fichaTecnica");
        }}
        disabled={!enabledCards.bienvenida}
        style={!enabledCards.bienvenida ? styles.disabledCard : null}
      >
        <Card title={"Bienvenida"} phrases={undefined} imageSource={undefined} description={undefined} />
        {!enabledCards.bienvenida && <Icon name="lock-closed" size={30} color="gray" style={styles.lockIcon} />}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Profile", { user });
          handleCardPress("planEntrenamiento");
        }}
        disabled={!enabledCards.fichaTecnica}
        style={!enabledCards.fichaTecnica ? styles.disabledCard : null}
      >
        <Card title={"Ficha técnica"} phrases={undefined} imageSource={undefined} description={undefined} />
        {!enabledCards.fichaTecnica && <Icon name="lock-closed" size={30} color="gray" style={styles.lockIcon} />}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Workout", { trainingPlan: user.trainingPlan });
          handleCardPress("checklist");
        }}
        disabled={!enabledCards.planEntrenamiento}
        style={!enabledCards.planEntrenamiento ? styles.disabledCard : null}
      >
        <Card
          title={"Plan de entrenamiento básico"}
          phrases={undefined}
          imageSource={undefined}
          description={undefined}
        />
        {!enabledCards.planEntrenamiento && <Icon name="lock-closed" size={30} color="gray" style={styles.lockIcon} />}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Checklist");
          handleCardPress("mentalidad");
        }}
        disabled={!enabledCards.checklist}
        style={!enabledCards.checklist ? styles.disabledCard : null}
      >
        <Card title={"Checklist semanal"} phrases={undefined} imageSource={undefined} description={undefined} />
        {!enabledCards.checklist && <Icon name="lock-closed" size={30} color="gray" style={styles.lockIcon} />}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Mentalidad");
        }}
        disabled={!enabledCards.mentalidad}
        style={!enabledCards.mentalidad ? styles.disabledCard : null}
      >
        <Card
          title={"Ejercicio de mentalidad y reflexión"}
          phrases={undefined}
          imageSource={undefined}
          description={undefined}
        />
        {!enabledCards.mentalidad && <Icon name="lock-closed" size={30} color="gray" style={styles.lockIcon} />}
      </TouchableOpacity>
      <TouchableOpacity onPress={handleBackPressCards}>
        <Text style={styles.backButton}>Volver</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    padding: 20,
  },
  card: {
    marginBottom: 15,
    backgroundColor: "#d8f0ff",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabledCard: {
    marginBottom: 15,
    borderRadius: 8,
    padding: 10,
    opacity: 0.5,
    position: "relative",
  },
  lockIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
  backButton: {
    fontSize: 20,
    color: "blue",
    textAlign: "center",
    marginTop: 20,
  },
});

export default CardsSection1;
