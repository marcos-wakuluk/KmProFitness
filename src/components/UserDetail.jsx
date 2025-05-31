import { useState } from "react";
import { View, Image, StyleSheet, Text, FlatList } from "react-native";
import { Card, Divider } from "react-native-paper";
import { calculateAge } from "../utils/functions";

const getUserFromParams = (userDetail) => {
  if (userDetail?.data?.user) return userDetail.data.user;
  if (userDetail?.user) return userDetail.user;
  return userDetail || {};
};

const UserDetail = ({ route }) => {
  const { userDetail } = route.params;
  const [user] = useState(getUserFromParams(userDetail));

  const keyTranslations = {
    date: "Fecha",
    biceps: "Bíceps",
    waist: "Cintura",
    chest: "Pecho",
    thigh: "Muslo",
    dietPlan: "Plan de alimentación",
    trainingPlan: "Plan de entrenamiento",
    weight: "Peso",
  };

  const renderHeader = () => (
    <View style={styles.headerRow}>
      {user.details &&
        user.details.length > 0 &&
        Object.keys(user.details[0])
          .filter((key) => key !== "_id")
          .sort((a, b) => (a === "date" ? -1 : b === "date" ? 1 : 0))
          .map((key, index) => (
            <Text style={styles.headerCell} key={index}>
              {keyTranslations[key] || key}
            </Text>
          ))}
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      {Object.entries(item)
        .filter(([key]) => key !== "_id")
        .sort(([a], [b]) => (a === "date" ? -1 : b === "date" ? 1 : 0))
        .map(([key, value], idx) => (
          <Text style={styles.cell} key={idx}>
            {key === "date"
              ? new Date(value).toLocaleDateString("es-AR", { year: "2-digit", month: "2-digit", day: "2-digit" })
              : value ?? "-"}
          </Text>
        ))}
    </View>
  );

  const renderUserInfo = () => (
    <Card style={styles.userDetailContainer}>
      <Card.Title title="Detalles del Usuario" />
      <Card.Content>
        <Text style={styles.userInfo}>{`ID: ${user?._id ?? "-"}`}</Text>
        <Text style={styles.userInfo}>{`Nombre: ${user?.name ?? "-"} ${user?.lastName ?? "-"}`}</Text>
        <Text style={styles.userInfo}>{`Edad: ${user?.birthday ? calculateAge(user.birthday) + " años" : "-"}`}</Text>
        <Text style={styles.userInfo}>{`Fecha de nacimiento: ${
          user?.birthday ? new Date(user.birthday).toLocaleDateString("es-AR") : "-"
        }`}</Text>
        <Text style={styles.userInfo}>{`Email: ${user?.email ?? "-"}`}</Text>
        <Text style={styles.userInfo}>{`Teléfono: ${user?.phone ?? "-"}`}</Text>
        <Text style={styles.userInfo}>{`Altura: ${user?.height ? user.height + " cm" : "-"}`}</Text>
        <Text style={styles.userInfo}>{`Plan de alimentación: ${
          typeof user.mealPlan === "object" ? user.mealPlan?.name ?? "-" : user.mealPlan ?? "-"
        }`}</Text>
        <Text style={styles.userInfo}>{`Plan de entrenamiento: ${
          typeof user.trainingPlan === "object" ? user.trainingPlan?.name ?? "-" : user.trainingPlan ?? "-"
        }`}</Text>
        <Text style={styles.userInfo}>{`Última actualización general: ${
          user?.lastUpdate ? new Date(user.lastUpdate).toLocaleDateString("es-AR") : "-"
        }`}</Text>
        <Text style={styles.userInfo}>{`Última actualización alimentación: ${
          user?.lastUpdateMeal ? new Date(user.lastUpdateMeal).toLocaleDateString("es-AR") : "-"
        }`}</Text>
        <Text style={styles.userInfo}>{`Última actualización entrenamiento: ${
          user?.lastUpdateTraining ? new Date(user.lastUpdateTraining).toLocaleDateString("es-AR") : "-"
        }`}</Text>
        <Text style={styles.userInfo}>{`Nuevo usuario: ${user?.newUser ? "Sí" : "No"}`}</Text>
        <Text style={styles.userInfo}>{`Progreso: ${user?.progress ?? "-"}`}</Text>
        <Text style={styles.userInfo}>{`enabledCards: ${
          user?.enabledCards ? JSON.stringify(user.enabledCards) : "-"
        }`}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <Image source={require("../assets/KM-white.png")} style={styles.image} />
      <FlatList
        data={user.details && Array.isArray(user.details) ? user.details : []}
        ListHeaderComponent={() => (
          <>
            {renderUserInfo()}
            {user.details && user.details.length > 0 && (
              <>
                <Divider style={styles.divider} />
                {renderHeader()}
              </>
            )}
          </>
        )}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.tableContainer}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: "#888", marginTop: 20 }}>No hay detalles para mostrar.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    top: "10%",
  },
  userDetailContainer: {
    marginTop: 250,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  userInfo: {
    marginBottom: 10,
    fontSize: 18,
    color: "#333",
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 5,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    padding: 5,
    color: "#0061a7",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    padding: 5,
    color: "#333",
  },
  tableContainer: {
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  divider: {
    marginVertical: 10,
  },
});

export default UserDetail;
