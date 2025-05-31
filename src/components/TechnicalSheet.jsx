import { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Platform } from "react-native";

export default function TechnicalSheetForm() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    sex: "",
    weight: "",
    height: "",
    phone: "",
    address: "",
    arm: "",
    waist: "",
    hip: "",
    thigh: "",
    goals: "",
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    // Aquí puedes manejar el envío de la ficha técnica
    console.log(form);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Ficha Técnica</Text>
        </View>

        {/* Datos personales */}
        <View style={styles.section}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresá tu nombre"
            placeholderTextColor="#8daece"
            value={form.name}
            onChangeText={(v) => handleChange("name", v)}
          />
        </View>
        <View style={styles.row}>
          <View style={[styles.sectionHalf, { maxWidth: 180 }]}>
            <Text style={styles.label}>Edad</Text>
            <TextInput
              style={[styles.input]}
              placeholder="Edad"
              placeholderTextColor="#8daece"
              value={form.age}
              onChangeText={(v) => {
                let value = v.replace(/[^0-9]/g, "");
                handleChange("age", value);
              }}
              keyboardType="numeric"
              maxLength={2}
              minLength={1}
            />
          </View>
          <View style={styles.sectionHalf}>
            <Text style={styles.label}>Sexo</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity style={styles.radioOption} onPress={() => handleChange("sex", "Masculino")}>
                <View style={styles.radioCircle}>{form.sex === "Masculino" && <View style={styles.radioDot} />}</View>
                <Text style={styles.radioLabel}>Masculino</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.radioOption} onPress={() => handleChange("sex", "Femenino")}>
                <View style={styles.radioCircle}>{form.sex === "Femenino" && <View style={styles.radioDot} />}</View>
                <Text style={styles.radioLabel}>Femenino</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.sectionHalf}>
            <Text style={styles.label}>Peso (kg)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresá tu peso"
              placeholderTextColor="#8daece"
              value={form.weight}
              onChangeText={(v) => {
                let value = v.replace(/[^0-9.]/g, "");
                value = value.replace(/^([^.]*\.)|\./g, "$1");
                handleChange("weight", value);
              }}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.sectionHalf}>
            <Text style={styles.label}>Altura (cm)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresá tu altura"
              placeholderTextColor="#8daece"
              value={form.height}
              onChangeText={(v) => {
                let value = v.replace(/[^0-9.]/g, "");
                value = value.replace(/^([^.]*\.)|\./g, "$1");
                handleChange("height", value);
              }}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresá tu número de teléfono"
            placeholderTextColor="#8daece"
            value={form.phone || ""}
            onChangeText={(v) => handleChange("phone", v.replace(/[^0-9+]/g, ""))}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Dirección</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresá tu dirección"
            placeholderTextColor="#8daece"
            value={form.address || ""}
            onChangeText={(v) => handleChange("address", v)}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.sectionHalf}>
            <Text style={styles.label}>Circunferencia de brazo (cm)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresá circunferencia de brazo"
              placeholderTextColor="#8daece"
              value={form.arm}
              onChangeText={(v) => handleChange("arm", v)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.sectionHalf}>
            <Text style={styles.label}>Circunferencia de cintura (cm)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresá circunferencia de cintura"
              placeholderTextColor="#8daece"
              value={form.waist}
              onChangeText={(v) => handleChange("waist", v)}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.sectionHalf}>
            <Text style={styles.label}>Circunferencia de cadera (cm)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresá circunferencia de cadera"
              placeholderTextColor="#8daece"
              value={form.hip}
              onChangeText={(v) => handleChange("hip", v)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.sectionHalf}>
            <Text style={styles.label}>Circunferencia de muslo (cm)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresá circunferencia de muslo"
              placeholderTextColor="#8daece"
              value={form.thigh}
              onChangeText={(v) => handleChange("thigh", v)}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Objetivos */}
        <Text style={styles.sectionTitle}>Objetivos</Text>
        <View style={styles.section}>
          <Text style={styles.label}>¿Cuáles son tus objetivos?</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describí tus objetivos de entrenamiento"
            placeholderTextColor="#8daece"
            value={form.goals}
            onChangeText={(v) => handleChange("goals", v)}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f1a24",
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f1a24",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    justifyContent: "space-between",
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  section: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  sectionHalf: {
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 8,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#20364b",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
    fontSize: 16,
    marginBottom: 0,
    minHeight: 48,
  },
  textArea: {
    minHeight: 90,
    paddingTop: 12,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  saveButton: {
    backgroundColor: "#359dff",
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 24,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    color: "#0f1a24",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    height: 48,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#359dff",
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#8daece",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    backgroundColor: "#20364b",
  },
  radioCircleSelected: {
    borderColor: "#359dff",
    backgroundColor: "#359dff",
  },
  radioLabel: {
    color: "#fff",
    fontSize: 16,
  },
});
