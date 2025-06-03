import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DietPlanList from "../components/DietPlanList";
import AssignDietView from "../components/AssignDietView";
import PdfViewer from "../screens/PdfViewer";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DietPlanList" component={DietPlanList} />
      <Stack.Screen name="AssignDietView" component={AssignDietView} />
      <Stack.Screen name="PdfViewer" component={PdfViewer} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
