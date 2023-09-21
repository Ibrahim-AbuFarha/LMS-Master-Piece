import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUpScreen() {
  // Define state to hold form data and validation errors
  const [student, setStudent] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    passwordConfirm: "",
  });

  const navigation = useNavigation();

  // Function to handle form input changes
  const handleInputChange = (field, value) => {
    // Clear the corresponding error when the user starts typing
    setErrors({
      ...errors,
      [field]: "",
    });

    setStudent({
      ...student,
      [field]: value,
    });
  };

  // Function to validate the form fields
  const validateForm = () => {
    const newErrors = {};

    if (!student.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!student.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(student.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!student.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!isValidMobile(student.mobile)) {
      newErrors.mobile = "Invalid mobile number";
    }

    if (!student.password) {
      newErrors.password = "Password is required";
    } else if (student.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (student.password !== student.passwordConfirm) {
      newErrors.passwordConfirm = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Function to handle sign-up
  const handleSignUp = async () => {
    if (validateForm()) {
      try {
        console.log(student);
        console.log("1");
        const { data } = await axios.post(
          "http://192.168.1.17:8000/api/v1/students/signUpStudent",
          student
        );
        console.log(data.newStudent);
        await AsyncStorage.setItem("student", JSON.stringify(data.newStudent));

        if (data.newStudent) {
          navigation.navigate("HomeScreen");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    // Implement your email validation logic here
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Function to validate mobile format
  const isValidMobile = (mobile) => {
    // Implement your mobile validation logic here
    return /^\d{10}$/.test(mobile);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 bg-white" style={{ backgroundColor: "#52B6DF" }}>
        <SafeAreaView className="flex">
          <View className="flex-row justify-start">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="bg-white  p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            >
              <ArrowLeftIcon size="20" color="#52B6DF" />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center">
            <Text className=" text-white text-4xl ">Sign Up</Text>
          </View>
        </SafeAreaView>
        <View
          className="flex-1 bg-white px-8 pt-8"
          style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        >
          <View className="form space-y-2">
            <Text className=" text-[#52B6DF] ml-4">Full Name</Text>
            <TextInput
              className="p-3 bg-[#f0f0f0] text-[#333] rounded-2xl mb-2"
              placeholder="Enter Name"
              value={student.fullName}
              onChangeText={(text) => handleInputChange("fullName", text)}
            />
            {errors.fullName ? (
              <Text style={{ color: "red" }}>{errors.fullName}</Text>
            ) : null}

            <Text className=" text-[#52B6DF] ml-4">Email </Text>
            <TextInput
              className="p-3 bg-[#f0f0f0] text-[#333] rounded-2xl mb-2"
              placeholder="Enter Email"
              value={student.email}
              onChangeText={(text) => handleInputChange("email", text)}
            />
            {errors.email ? (
              <Text style={{ color: "red" }}>{errors.email}</Text>
            ) : null}

            <Text className=" text-[#52B6DF] ml-4">Mobile </Text>
            <TextInput
              className="p-3 bg-[#f0f0f0] text-[#333] rounded-2xl mb-2"
              placeholder="Enter Mobile Number"
              value={student.mobile}
              onChangeText={(text) => handleInputChange("mobile", text)}
            />
            {errors.mobile ? (
              <Text style={{ color: "red" }}>{errors.mobile}</Text>
            ) : null}

            <Text className=" text-[#52B6DF] ml-4">Password</Text>
            <TextInput
              className="p-3 bg-[#f0f0f0] text-[#333] rounded-2xl mb-2"
              secureTextEntry
              placeholder="Enter Password"
              value={student.password}
              onChangeText={(text) => handleInputChange("password", text)}
            />
            {errors.password ? (
              <Text style={{ color: "red" }}>{errors.password}</Text>
            ) : null}

            <Text className=" text-[#52B6DF] ml-4">Password Confirm</Text>
            <TextInput
              className="p-3 bg-[#f0f0f0] text-[#333] rounded-2xl mb-2"
              secureTextEntry
              placeholder="Confirm Password"
              value={student.passwordConfirm}
              onChangeText={(text) =>
                handleInputChange("passwordConfirm", text)
              }
            />
            {errors.passwordConfirm ? (
              <Text style={{ color: "red" }}>{errors.passwordConfirm}</Text>
            ) : null}

            <TouchableOpacity
              className="p-4 bg-[#52B6DF] rounded-2xl"
              onPress={handleSignUp}
            >
              <Text className="text-2xl font-bold text-white text-center">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-lg text-[#777] font-bold text-center mt-9">
            Or
          </Text>
          <View className="flex flex-row justify-center my-4">
            <TouchableOpacity className="p-3 bg-[#f0f0f0] rounded-xl mr-2">
              <Image
                source={require("../assets/icons/google.png")}
                className="w-10 h-10"
              />
            </TouchableOpacity>
            <TouchableOpacity className="p-3 bg-[#f0f0f0] rounded-xl mr-2">
              <Image
                source={require("../assets/icons/apple.png")}
                className="w-10 h-10"
              />
            </TouchableOpacity>
            <TouchableOpacity className="p-3 bg-[#f0f0f0] rounded-2xl">
              <Image
                source={require("../assets/icons/facebook.png")}
                className="w-10 h-10"
              />
            </TouchableOpacity>
          </View>
          <View className="flex flex-row justify-center mt-3">
            <Text className="font-bold text-lg text-[#777]">
              Already have an account?
            </Text>
            <TouchableOpacity
              className="ml-1"
              onPress={() => navigation.navigate("Login")}
            >
              <Text className="text-lg text-[#52B6DF] font-bold">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
