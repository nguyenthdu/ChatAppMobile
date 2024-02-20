// In App.js in a new project

import * as React from "react";
import { StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/LoginScreen/Login";
import StartScreen from "./screens/StartScreen/Start";
import HomeScreen from "./screens/HomeScreen/Home";
import RegisterScreen from "./screens/RegisterScreen/Register";
import RegisterScreen_1 from "./screens/RegisterScreen/Register_1";
import RegisterScreen_2 from "./screens/RegisterScreen/Register_2";
import Colors from "./themes/Colors";
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Register_1" component={RegisterScreen_1} />
        <Stack.Screen name="Register_2" component={RegisterScreen_2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
