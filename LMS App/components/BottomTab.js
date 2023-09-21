import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import {
  HomeIcon,
  UserIcon,
  ViewColumnsIcon,
} from "react-native-heroicons/solid";
import MarksScreen from "../screens/MarkScreen";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#52B6DF",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <HomeIcon style={{ color }} />,
        }}
      />
      <Tab.Screen
        name="Marks"
        component={MarksScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <ViewColumnsIcon style={{ color }} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <UserIcon style={{ color }} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
