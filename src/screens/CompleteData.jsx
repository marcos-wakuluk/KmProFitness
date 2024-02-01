import React, { useState } from 'react';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const Profile = () => {
  const [biceps, setBiceps] = useState(0);
  const [waist, setWaist] = useState(0);
  const [thigh, setThigh] = useState(0);
  const [chest, setChest] = useState(0);
  const [weight, setWeight] = useState(0);

  const handleSave = async () => {
    try {
      // Realizar la lógica de guardar aquí

      // Cambiar a modo de edición después de guardar
    } catch (error) {
      console.error('Error al guardar los datos del usuario:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}></View>
      <Image
        source={require('../assets/KM-white.png')}
        style={styles.image}
      />
      <TextInput
        label="Circunferencia de biceps (cm)"
        value={biceps.toString()}
        onChangeText={setBiceps}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Circunferencia de cintura (cm)"
        value={waist.toString()}
        onChangeText={setWaist}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Circunferencia de muslo (cm)"
        value={thigh.toString()}
        onChangeText={setThigh}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Circunferencia de pecho (cm)"
        value={chest.toString()}
        onChangeText={setChest}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Peso (Kg)"
        value={weight.toString()}
        onChangeText={setWeight}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button
        onPress={handleSave}
        style={styles.button}
      >
        Guardar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    backgroundColor: '#069af1',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
    backgroundColor: '#52c0ff',
    color: '#144a94'
  },
  image: {
    position: 'absolute',
    resizeMode: 'contain',
    zIndex: 0,
    height: 200,
    width: 200,
    alignSelf: 'center',
    top: '40%',
  },
});

export default Profile;