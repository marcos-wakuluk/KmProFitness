import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/components/Login";
import SignIn from "./src/components/SignIn";
import PasswordRecovery from "./src/components/PasswordRecovery";
import Home from "./src/components/Home";
import Profile from "./src/components/Profile";
import DietPlanScreen from "./src/screens/DietPlanScreen";
import Workout from "./src/screens/Workout";
import Payment from "./src/components/Payment";
import UserList from "./src/components/UserList";
import DietPlanList from "./src/components/DietPlanList";
import WorkoutList from "./src/components/WorkoutList";
import UserDetail from "./src/components/UserDetail";
import AssignDietView from "./src/components/AssignDietView";
import AssignWorkoutView from "./src/components/AssignWorkoutView";
import Checklist from "./src/components/Checklist";
import { SafeAreaView, StatusBar } from "react-native";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar />
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
          <Stack.Screen options={{ headerShown: false }} name="Signin" component={SignIn} />
          <Stack.Screen options={{ headerShown: false }} name="PasswordRecovery" component={PasswordRecovery} />
          <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
          <Stack.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
          <Stack.Screen options={{ headerShown: false }} name="Workout" component={Workout} />
          <Stack.Screen options={{ headerShown: false }} name="Payment" component={Payment} />
          <Stack.Screen options={{ headerShown: false }} name="UserList" component={UserList} />
          <Stack.Screen options={{ headerShown: false }} name="UserDetail" component={UserDetail} />
          <Stack.Screen options={{ headerShown: false }} name="DietPlanList" component={DietPlanList} />
          <Stack.Screen options={{ headerShown: false }} name="AssignDietView" component={AssignDietView} />
          <Stack.Screen options={{ headerShown: false }} name="AssignWorkoutView" component={AssignWorkoutView} />
          <Stack.Screen options={{ headerShown: false }} name="WorkoutList" component={WorkoutList} />
          <Stack.Screen options={{ headerShown: false }} name="Checklist" component={Checklist} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="DietPlanScreen"
            component={DietPlanScreen}
            initialParams={{
              user: {
                /* user data */
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
