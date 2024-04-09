import * as React from "react";
import { StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AppProvider } from "./hooks/AppProvider";
import StackNavigator from "./navigator/StackNavigator";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <StackNavigator />
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;
