import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
// import Pdf from "react-native-pdf";

const DietPlanScreen = () => {
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const source = {
    uri: "file://" + require("../assets/mesocicloGuía2meses.pdf"),
    cache: true,
  };

  const onLoadComplete = (numberOfPages) => {
    console.log(`Number of pages: ${numberOfPages}`);
    setNumberOfPages(numberOfPages);
  };

  const onPageChanged = (page) => {
    console.log(`Current page: ${page}`);
    setCurrentPage(page);
  };

  const onError = (error) => {
    console.log(error);
  };

  return (
    <View style={styles.container}>
      <Text>Plan de Alimentación</Text>
      {/* <Pdf
        source={source}
        onLoadComplete={onLoadComplete}
        onPageChanged={onPageChanged}
        onError={onError}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      /> */}
      <Text>{`Página ${currentPage} de ${numberOfPages}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 100, // Ajusta el tamaño según la barra de título
  },
});

export default DietPlanScreen;

//   return (
//     <View style={styles.container}>
//       <View style={styles.overlay}>
//         <Image source={require("../assets/KM-white.png")} style={styles.image} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0061a7",
//   },
//   overlay: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   image: {
//     width: 200,
//     height: 200,
//     resizeMode: "contain",
//   },
// });

// export default DietPlanScreen;
