import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Contact = () => {
  const handleWhatsAppPress = () => {
    Linking.openURL(`whatsapp://send?text=Hola Lucas&phone=${process.env.WHATSAPP}`);
  };

  const handleInstagramPress = () => {
    Linking.openURL(`${process.env.INSTAGRAM}`);
  };
  return (
    <>
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
            <Icon name="instagram" size={30} color="red" />
            <Text style={styles.iconText}>Km Pro Fitness</Text>
          </View>
        </TouchableOpacity>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  divider: {
    backgroundColor: 'black',
    height: 2,
    width: '100%',
  },
  socialLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
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
