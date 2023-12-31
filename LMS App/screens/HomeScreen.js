import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import ClassRoomContext from "../store/ClassRoomsContext";
import UserContext from "../store/authContext";
import { useContext } from "react";

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
  const { getClassRooms, classRooms } = useContext(ClassRoomContext);
  const { user } = useContext(UserContext);

  const navigation = useNavigation();

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

  if (!classRooms[0]) return;
  console.log("userHome", user);
  return (
    <SafeAreaView className="pt-7">
      <View className="flex flex-row justify-between px-4">
        <View>
          <Text className="text-4xl">Hi, {user.fullName}</Text>
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
