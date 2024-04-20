import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const Profile = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [profileImage, setProfileImage] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const userId = '65b19269aec0c74211e854a4'
      const response = await fetch(`http://localhost:3000/users/${userId}`);
      const user = await response.json();
      setProfileImage(user.image)
      setName(user.name);
      setPhone(user.phoneNumber);
      setHeight(user.height);
      setWeight(user.weight);
      calcularEdad(user.dateOfBirth)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSave = async () => {
    try {
      // Realizar la lógica de guardar aquí

      // Cambiar a modo de edición después de guardar
      setEditMode(false);
    } catch (error) {
      console.error('Error al guardar los datos del usuario:', error);
    }
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleImagePick = () => {
    // Handle profile image pick
  };

  const calcularEdad = (date) => {
    const fechaNacimientoDate = new Date(date);
    const fechaActual = new Date();

    const diferenciaMilisegundos = fechaActual - fechaNacimientoDate;
    const edadCalculada = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24 * 365.25));

    setAge(edadCalculada);
  };

  return (
    <>
      <View style={styles.background}></View>
      <Image
        source={require('../assets/KM-white.png')}
        style={styles.image}
      />
      <View style={styles.container}>
        <Image
          source={profileImage || require('../assets/user-default.png')}
          style={styles.profileImage}
        />
        <Button
          onPress={handleImagePick}
          disabled={!editMode}
          style={styles.button}
        >
          Elegir imagen de perfil
        </Button>
        <TextInput
          label="Nombre"
          value={name}
          onChangeText={setName}
          editable={editMode}
          style={styles.input}
        />
        <TextInput
          label="Telefono"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          editable={editMode}
          style={styles.input}
        />
        <TextInput
          label="Edad"
          value={age.toString()}
          onChangeText={setAge}
          keyboardType="numeric"
          editable={editMode}
          style={styles.input}
        />
        <TextInput
          label="Altura"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          editable={editMode}
          style={styles.input}
        />
        <TextInput
          label="Peso"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          editable={editMode}
          style={styles.input}
        />
        <Button
          onPress={editMode ? handleSave : handleEdit}
          style={styles.button}
        >
          {editMode ? 'Guardar' : 'Editar'}
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    backgroundColor: '#069af1',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
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
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    alignSelf: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
    backgroundColor: '#52c0ff',
    color: '#144a94'
  },
});

export default Profile;