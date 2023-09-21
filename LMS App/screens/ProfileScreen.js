import React, { version } from "react";
import { UserCircleIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
function ProfileScreen() {
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState({});
  const handleLogOut = async () => {
    await AsyncStorage.removeItem("student");
    navigation.navigate("Welcome");
  };

  const getUser = async () => {
    const user = await AsyncStorage.getItem("student");
    const newUser = JSON.parse(user);
    setCurrentUser(newUser);
  };
  
  return (
    <SafeAreaView className="flex-1  bg-white ">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 29 }}
        className={"px-4 pt-4"}
      >
        <View className="mt-4 px-6 flex flex-row items-center">
          <View className="w-20 h-20  rounded-[60px] ">
            <Image
              className="w-full h-full rounded-[60px]"
              source={require("../assets/profileImg.webp")}
            />
          </View>
          <View className="ml-10">
            <Text className="text-2xl">John snow</Text>
            <Text className="text-lg text-gray-500">jamesondunn@gmail.com</Text>
          </View>
        </View>
        <View className="mt-8 space-y-1">
          <Text className=" text-[#52B6DF] ml-4">Full Name</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value="john snow"
            placeholder="Enter Name"
            editable={false}
          />
          <Text className=" text-[#52B6DF] ml-4">Email</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Email"
            value="johnSnow@gmail.com"
            editable={false}
          />
          <Text className=" text-[#52B6DF] ml-4">grade</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value="10"
            placeholder="Enter grade"
            editable={false}
          />
          <Text className=" text-[#52B6DF] ml-4">mobile</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value="702-889-5347"
            placeholder="Enter mobile"
            editable={false}
          />
          <Text className=" text-[#52B6DF] ml-4">Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value="Amman"
            placeholder="Enter Address"
            editable={false}
          />
        </View>

        <TouchableOpacity
          className="py-2 w-80  m-auto bg-[#52B6DF] rounded-xl mt-10"
          onPress={handleLogOut}
        >
          <Text className="text-xl font-bold text-center text-white">
            Log out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfileScreen;
