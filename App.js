// In App.js in a new project

import * as React from "react";
import { StatusBar } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AddFriend from "./screens/add_friend";
import Chat from "./screens/chat";
import Contact from "./screens/contact";
import CreateGroup from "./screens/create_group";
import Explore from "./screens/explore";
import HomeScreen from "./screens/home";
import ListFriendsRequest from "./screens/list_friends_request";
import LoginScreen from "./screens/login";
import Logo from "./screens/logo";
import Profile from "./screens/profile";
import RegisterScreen from "./screens/register";
import RegisterPassword from "./screens/register_password";
import StartScreen from "./screens/start";
import UpdateProfile from "./screens/update_profile";
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Test" component={Test} /> */}
        <Stack.Screen name="Logo" component={Logo} />
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="RegisterPassword" component={RegisterPassword} />
        <Stack.Screen name="Home" component={Root} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="AddFriend" component={AddFriend} />

        <Stack.Screen
          name="ListFriendsRequest"
          component={ListFriendsRequest}
        />
        <Stack.Screen name="CreateGroup" component={CreateGroup} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function Root() {
  return (
    <Tab.Navigator
      headerShown={false}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#2f95dc",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          paddingBottom: 3,
          paddingTop: 3,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Tin nhắn",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              color={color}
              size={size}
            />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Contact"
        component={Contact}
        options={{
          tabBarLabel: "Danh bạ",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="call-outline" color={color} size={size} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarLabel: "Khám phá",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="apps-sharp" color={color} size={size} />
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Cá nhân",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

export default App;
