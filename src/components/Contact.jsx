import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Contact = () => {
  const handleWhatsAppPress = () => {
    Linking.openURL('whatsapp://send?text=Hola Lucas&phone=+5493584373128');
  };

  const handleInstagramPress = () => {
    Linking.openURL('https://www.instagram.com/kmprofitness/');
  };
  return (
    <View style={styles.container}>
      <View style={styles.divider} />

      <View style={styles.socialLinksContainer}>
        <TouchableOpacity onPress={handleWhatsAppPress}>
          <View style={styles.iconContainer}>
            <Icon name="whatsapp" size={30} color="green" />
            <Text style={styles.iconText}>Lucas</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleInstagramPress}>
          <View style={styles.iconContainer}>
            <Icon name="instagram" size={30} color="blue" />
            <Text style={styles.iconText}>Km Pro Fitness</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  divider: {
    backgroundColor: 'black',
    height: 1,
    width: '100%',
  },
  socialLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconText: {
    marginTop: 5,
    color: 'black',
    fontSize: 12,
  },
});

export default Contact;
