import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { LMS_API } from "../api/api";
import { useState } from "react";
import { useContext } from "react";
import UserContext from "../store/authContext";
export default function LoginScreen() {
  const { signIn } = useContext(UserContext);
  const navigation = useNavigation();
  const [student, setStudent] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (field, value) => {
    setStudent({
      ...student,
      [field]: value,
    });
  };
  const handleSignIn = async () => {
    try {
      const { data } = await LMS_API.post("/students/signInStudent", student);
      console.log("LOGINdATa", data.student);
      signIn(data.student);
      if (data) {
        navigation.navigate("HomeScreen");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 bg-[#52b6df]">
      <SafeAreaView className="flex  ">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-white p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <ArrowLeftIcon size="20" color="#52B6DF" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Text className=" text-white text-4xl ">Sign In</Text>
        </View>
      </SafeAreaView>
      <View
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        className="flex-1 bg-white px-8 pt-8 "
      >
        <View className="form space-y-2">
          <Text className="text-[#52B6DF] ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Email"
            value={student.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
          <Text className="text-[#52B6DF] ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            secureTextEntry
            placeholder="Password"
            value={student.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />
          <TouchableOpacity className="flex items-end">
            <Text className="text-gray-700 mb-5">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="py-3 bg-[#52B6DF] rounded-xl"
            onPress={handleSignIn}
          >
            <Text className="text-xl font-bold text-center text-white">
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-xl text-gray-700 font-bold text-center py-5">
          Or
        </Text>
        <View className="flex-row justify-center space-x-12">
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image
              source={require("../assets/icons/google.png")}
              className="w-10 h-10"
            />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image
              source={require("../assets/icons/apple.png")}
              className="w-10 h-10"
            />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image
              source={require("../assets/icons/facebook.png")}
              className="w-10 h-10"
            />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text className="font-semibold text-[#52B6DF]"> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
