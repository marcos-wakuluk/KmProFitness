import React, { memo, useState } from "react";
import { StyleSheet, View, ScrollView, Alert, TouchableOpacity, Text } from "react-native";
import { TextInput } from "react-native-paper";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { API_BASE_URL } from "@env";

const Profile = memo(({ user }) => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [biceps, setBiceps] = useState(user.details[0]?.biceps || 0);
  const [waist, setWaist] = useState(user.details[0]?.waist || 0);
  const [thigh, setThigh] = useState(user.details[0]?.thigh || 0);
  const [chest, setChest] = useState(user.details[0]?.chest || 0);
  const [weight, setWeight] = useState(user.details[0]?.weight || 0);
  const [birthDate, setBirthDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [birthDateString, setBirthDateString] = useState(birthDate.toLocaleDateString());

  const handleSave = async () => {
    const updateUser = {
      biceps: parseInt(biceps),
      waist: parseInt(waist),
      thigh: parseInt(thigh),
      chest: parseInt(chest),
      weight: parseInt(weight),
    };

    try {
      const { data } = await axios.put(`${API_BASE_URL}/users/usersDetails/${user._id}`, {
        updateData: updateUser,
        name,
        lastName,
        phone,
        birthday: birthDate,
      });

      Alert.alert("Datos guardados exitosamente", "", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Home", { user: data.data.user }),
        },
      ]);
    } catch (error) {
      console.error("Error al guardar los datos del usuario:", error);
      alert("Ocurrió un error al guardar los datos. Por favor, inténtalo de nuevo.");
    }
  };

  const handlePositiveNumberInput = (value, setValue) => {
    const numericValue = value.replace(/\D/g, "");
    setValue(numericValue);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowPicker(false);
    setBirthDate(currentDate);
    setBirthDateString(currentDate.toLocaleDateString());
  };

  const showDatePicker = () => setShowPicker(true);
  const handleTextInputChange = (value) => setBirthDateString(value);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TextInput label="Nombre" value={name} onChangeText={setName} style={styles.input} />
        <TextInput label="Apellido" value={lastName} onChangeText={setLastName} style={styles.input} />
        <TextInput
          label="Fecha de nacimiento"
          value={birthDateString}
          onChangeText={handleTextInputChange}
          onFocus={showDatePicker}
          style={styles.input}
        />
        {showPicker && <DateTimePicker value={birthDate} mode="date" display="default" onChange={handleDateChange} />}
        <TextInput label="Teléfono" value={phone} onChangeText={setPhone} style={styles.input} />
        <TextInput
          label="Circunferencia de bíceps (cm)"
          value={biceps.toString()}
          onChangeText={(value) => handlePositiveNumberInput(value, setBiceps)}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          label="Circunferencia de cintura (cm)"
          value={waist.toString()}
          onChangeText={(value) => handlePositiveNumberInput(value, setWaist)}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          label="Circunferencia de muslo (cm)"
          value={thigh.toString()}
          onChangeText={(value) => handlePositiveNumberInput(value, setThigh)}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          label="Circunferencia de pecho (cm)"
          value={chest.toString()}
          onChangeText={(value) => handlePositiveNumberInput(value, setChest)}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          label="Peso (Kg)"
          value={weight.toString()}
          onChangeText={(value) => handlePositiveNumberInput(value, setWeight)}
          keyboardType="numeric"
          style={styles.input}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#0061a7",
    padding: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  saveButton: {
    backgroundColor: "#00aaff",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
Profile.propTypes = {
  user: PropTypes.shape({
    details: PropTypes.arrayOf(
      PropTypes.shape({
        biceps: PropTypes.number,
        waist: PropTypes.number,
        thigh: PropTypes.number,
        chest: PropTypes.number,
        weight: PropTypes.number,
      })
    ),
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Profile;
