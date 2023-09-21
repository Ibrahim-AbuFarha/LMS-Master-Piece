import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 ">
      <ImageBackground
        className="flex-1 "
        source={require("../assets/images/getstarted.png")}
      >
        <View className="flex-1 flex justify-around mt-72">
          <View className="space-y-4 ">
            <Text className="text-white font-bold text-4xl px-5 text-center">
              Hello and Welcome here!
            </Text>
            <Text className="text-white font-bold  px-5 text-center">
              Get an overview of how you are performing and motivate yourself to
              achieve even moew.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp")}
              className="py-3 bg-[#52B6DF] mx-7 rounded-xl"
            >
              <Text className="text-xl font-bold  text-center text-white">
                Sign Up
              </Text>
            </TouchableOpacity>
            <View className="flex-row justify-center">
              <Text className="text-white font-semibold">
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="font-semibold text-[#52B6DF]"> Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
