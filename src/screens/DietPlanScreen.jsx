import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground } from "react-native";
// import Pdf from 'react-native-pdf';

const DietPlanScreen = () => {
  // const [numberOfPages, setNumberOfPages] = useState(0);
  // const [currentPage, setCurrentPage] = useState(0);

  // useEffect(() => {
  //   const source = require('../assets/mesocicloGuía2meses.pdf');

  //   const onLoadComplete = (numberOfPages, filePath) => {
  //     console.log(`Number of pages: ${numberOfPages}`);
  //     setNumberOfPages(numberOfPages);
  //   };

  //   const onPageChanged = (page, numberOfPages) => {
  //     console.log(`Current page: ${page}`);
  //     setCurrentPage(page);
  //   };

  //   const onError = (error) => {
  //     console.log(error);
  //   };

  //   return () => {
  //     console.log('Cleaning up');
  //   };
  // }, []);
  //   return (
  //     // <View style={style.container}>
  //     //   <Text>Plan de Alimentación</Text>
  //     //   {/* <Pdf
  //     //     source={source}
  //     //     onLoadComplete={onLoadComplete}
  //     //     onPageChanged={onPageChanged}
  //     //     onError={onError}
  //     //     onPressLink={(uri) => {
  //     //       console.log(`Link pressed: ${uri}`);
  //     //     }}
  //     //     style={styles.pdf} /> */}
  //     // </View>
  //   );
  // };

  // style = StyleSheet.create({
  //   // container: {
  //   //   flex: 1,
  //   //   justifyContent: 'flex-start',
  //   //   alignItems: 'center',
  //   //   marginTop: 25,
  //   // },
  //   // pdf: {
  //   //   flex: 1,
  //   //   width: Dimensions.get('window').width,
  //   //   height: Dimensions.get('window').height,
  //   // }
  // })
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Image source={require("../assets/KM-white.png")} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0061a7",
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});

export default DietPlanScreen;
