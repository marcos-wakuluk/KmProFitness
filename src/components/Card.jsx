import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Card = ({ phrases, title, imageSource, description }) => {
  const phraseOfTheDay = phrases ? Math.floor(Math.random() * phrases.length) : ''

  return (
    <View style={styles.card}>
      {imageSource && <Image source={imageSource} style={styles.image} />}
      <View style={styles.cardContent}>
        {title && <Text style={styles.title}>{title}</Text>}
        {description && <Text>{description}</Text>}
        {phrases && <Text>{phrases[phraseOfTheDay]}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'gray',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
  },
  cardContent: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});

export default Card;
