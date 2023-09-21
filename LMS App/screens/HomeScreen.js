import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const subjects = {
  math: require("../assets/images/home/Math.png"),
  physics: require("../assets/images/home/physics.png"),
  arts: require("../assets/images/home/arts.png"),
  biology: require("../assets/images/home/biology.png"),
  computer: require("../assets/images/home/technology.png"),
  economy: require("../assets/images/home/economy.png"),
  english: require("../assets/images/home/english.png"),
  geography: require("../assets/images/home/geography.png"),
  chemistry: require("../assets/images/home/chemical.png"),
};

export default function HomeScreen() {
  const [classRooms, SetClassRooms] = useState([]);
  const [userName, setUserName] = useState("");
  const navigation = useNavigation();
  const getClassRooms = async () => {
    try {
      const user = await AsyncStorage.getItem("student");
      const newUser = JSON.parse(user);
      setUserName(newUser.fullName);

      const { data } = await axios.get(
        `http://192.168.1.17:8000/api/v1/students/${newUser._id}`
      );
      console.log("data=", data);
      SetClassRooms(data.data.student.classRooms);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("classRooms====", classRooms);
  useEffect(() => {
    getClassRooms();
  }, []);
  const renderSubjectImages = () => {
    return classRooms.map((classRoom, index) => (
      <TouchableOpacity
        key={index}
        onPress={() =>
          navigation.navigate("SubjectDetails", {
            courseId: classRoom.courseId,
          })
        }
        className="  flex items-center "
      >
        <Image
          className="w-20 h-20"
          source={subjects[classRoom.subject.toLowerCase()]}
        />
        <Text className="mt-1 ">{classRoom.subject}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView className="pt-7">
      <View className="flex flex-row justify-between px-4">
        <View>
          <Text className="text-4xl">Hi, {userName}</Text>
          <Text className="text-gray-400 text-xl mt-3">
            Here is your activity today!
          </Text>
        </View>
        <Image source={require("../assets/images/home/bell.png")} />
      </View>
      <View className="px-4">
        <Image
          style={{ objectFit: "cover" }}
          className=" mt-4 w-full  rounded-3xl h-48"
          source={require("../assets/images/home/home.png")}
        />
      </View>

      <View>
        <Text className="text-3xl p-5">Subjects</Text>
        <View className=" flex flex-row gap-5 flex-wrap  px-4">
          {renderSubjectImages()}
        </View>
        <View></View>
      </View>
    </SafeAreaView>
  );
}
