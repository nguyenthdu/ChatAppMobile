// In App.js in a new project

import * as React from "react";
import { StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Test from "./screens/test";
import Logo from "./screens/logo";
import LoginScreen from "./screens/login";
import StartScreen from "./screens/start";
import RegisterScreen from "./screens/register";
import RegisterPassword from "./screens/register_password";
import HomeScreen from "./screens/home";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Test" component={Test} /> */}
        <Stack.Screen name="Logo" component={Logo} />
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="RegisterPassword" component={RegisterPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
