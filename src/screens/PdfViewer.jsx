import React from "react";
import { WebView } from "react-native-webview";
import { View, StyleSheet } from "react-native";

const PdfViewer = ({ route }) => {
  const { pdfUrl } = route.params;

  return (
    <View style={styles.container}>
      <WebView source={{ uri: pdfUrl }} style={{ flex: 1 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PdfViewer;
