import React, { useContext } from "react";
import { UserCircleIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import UserContext from "../store/authContext";
import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import { LMS_API } from "../api/api";
function ProfileScreen() {
  const navigation = useNavigation();
  const { signOut, user, setUser } = useContext(UserContext);

  const [updatedUser, setUpdatedUser] = useState({
    fullName: user.fullName,
    email: user.email,
    grade: user.grade,
    mobile: user.mobile,
    address: user.address,
  });

  console.log("userrrrrrrrrrrrrr", user);
  const handleLogOut = () => {
    signOut();
    navigation.navigate("Welcome");
  };

  const handleSave = async () => {
    const { data } = await LMS_API.patch(`students/${user._id}`, updatedUser);
    console.log("dataProfile==========0", data);
    setUser(data.student);
  };

  const handleInputChange = (field, value) => {
    setUpdatedUser({
      ...updatedUser,
      [field]: value,
    });
  };

  console.log(updatedUser);
  return (
    <SafeAreaView className="flex-1  bg-white ">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 29, flexGrow: 1 }}
          className={"px-4 pt-4"}
          keyboardShouldPersistTaps="handled"
        >
          <View className="mt-4 px-6 flex flex-row items-center">
            <View className="w-20 h-20  rounded-[60px] ">
              <Image
                className="w-full h-full rounded-[60px]"
                source={require("../assets/profileImg.webp")}
              />
            </View>
            <View className="ml-10">
              <Text className="text-2xl">{user.fullName}</Text>
              <Text className="text-lg text-gray-500">{user.email}</Text>
            </View>
          </View>
          <View className="mt-8 space-y-1">
            <Text className=" text-[#52B6DF] ml-4">Full Name</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={updatedUser.fullName}
              placeholder="Enter Name"
              onChangeText={(text) => handleInputChange("fullName", text)}
            />
            <Text className=" text-[#52B6DF] ml-4">Email</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="Email"
              value={updatedUser.email}
              onChangeText={(text) => handleInputChange("email", text)}
            />
            <Text className=" text-[#52B6DF] ml-4">grade</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={updatedUser.grade.toString()}
              placeholder="Enter grade"
              onChangeText={(text) => handleInputChange("grade", text)}
            />
            <Text className=" text-[#52B6DF] ml-4">mobile</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={updatedUser.mobile}
              placeholder={"Enter mobile"}
              onChangeText={(text) => handleInputChange("mobile", text)}
            />
            <Text className=" text-[#52B6DF] ml-4">Address</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={updatedUser.address}
              placeholder="Enter Address"
              onChangeText={(text) => handleInputChange("address", text)}
            />
          </View>

          <TouchableOpacity
            onPress={handleSave}
            className="py-2 w-80  m-auto bg-[#52B6DF] rounded-xl mt-10"
          >
            <Text className="text-xl font-bold text-center text-white">
              Save
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="py-2 w-80  m-auto bg-[#52B6DF] rounded-xl mt-5"
            onPress={handleLogOut}
          >
            <Text className="text-xl font-bold text-center text-white">
              Log out
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default ProfileScreen;
