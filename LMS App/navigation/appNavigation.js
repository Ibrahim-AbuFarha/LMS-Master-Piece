import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SubjectDetails from "../screens/SubjectDetails";
import HomeScreen from "../screens/HomeScreen"; // Import HomeScreen
import ProfileScreen from "../screens/ProfileScreen"; // Import ProfileScreen
import BottomTab from "../components/BottomTab"; // Import your BottomTabNavigator
import CourseDetails from "../screens/CourseDetails";
import ImageTest from "../screens/ImagePicker";
import MarksScreen from "../screens/MarkScreen";
const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          options={{ headerShown: false }}
          component={WelcomeScreen}
        />
        <Stack.Screen
          name="ImagePicker"
          options={{ headerShown: false }}
          component={ImageTest}
        />
        <Stack.Screen
          name="CourseDetails"
          options={{ headerShown: false }}
          component={CourseDetails}
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="SignUp"
          options={{ headerShown: false }}
          component={SignUpScreen}
        />

        {/* Use your BottomTabNavigator as the component for Home and Profile */}
        <Stack.Screen
          name="HomeScreen"
          options={{ headerShown: false }}
          component={BottomTab}
        />
        <Stack.Screen
          name="ProfileScreen"
          options={{ headerShown: false }}
          component={BottomTab}
        />
        <Stack.Screen
          name="MarksScreen"
          options={{ headerShown: false }}
          component={BottomTab}
        />
        <Stack.Screen
          name="SubjectDetails"
          options={{ headerShown: false }}
          component={SubjectDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
