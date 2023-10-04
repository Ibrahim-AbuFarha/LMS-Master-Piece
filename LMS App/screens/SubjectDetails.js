import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronRightIcon, ArrowLeftIcon } from "react-native-heroicons/solid";
import { useState, useEffect } from "react";
import { LMS_API } from "../api/api";

export default function SubjectDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { courseId } = route.params;
  console.log(courseId);
  const [course, SetCourse] = useState(null);

  const getCourse = async () => {
    try {
      const { data } = await LMS_API.get(`/courses/${courseId}`);
      console.log("data course=====================", data);
      SetCourse(data.course);
    } catch (error) {
      console.log("API call error:", error);
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  if (!course) return;
  console.log(course.teacherId.img);
  const renderSections = () => {
    return course.sections.map((item, index) => (
      <View key={item._id} className="flex flex-row  justify-around">
        <Text className="text-lg px-5 mb-3">
          {index + 1}. {item.title}
        </Text>
        <Text className="text-lg text-gray-400">
          ({item.lessons.length} materials)
        </Text>
        <TouchableOpacity
          className="ml-5"
          onPress={() =>
            navigation.navigate("CourseDetails", {
              sectionId: item._id,
            })
          }
        >
          <ChevronRightIcon />
        </TouchableOpacity>
      </View>
    ));
  };
  return (
    <ScrollView className="p-5 pt-10">
      <SafeAreaView className="flex flex-row">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="py-2 rounded-tr-2xl rounded-bl-2xl"
          >
            <ArrowLeftIcon size="25" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-black text-3xl">Subject Details</Text>
        </View>
      </SafeAreaView>
      <View className="flex flex-row px-4">
        <View className="flex flex-row items-center gap-4">
          <Image
            className="w-20 h-20"
            source={require("../assets/courseImg.png")}
          />
          <View>
            <Text className="text-2xl">{course.name}</Text>
            <Text className="text-gray-400 text-xl">
              lorem ipsum dolor sit amet
            </Text>
          </View>
        </View>
      </View>

      <View>
        <Text className="text-2xl p-5">About this class</Text>
        <Text className="text-xl text-gray-400 px-5 border-b-[0.7px]  border-gray-400">
          {course.desc}
        </Text>
        <View className="border-b p-3 border-gray-400"></View>
      </View>
      {/*teachers*/}
      <View>
        <Text className="text-2xl p-5">Teachers</Text>
        <View className="flex flex-row items-center gap-4 px-4 mb-4">
          <View>
            <Text className="text-2xl">{course.teacherId.fullName}</Text>
            <Text className="text-gray-400 text-xl">
              {course.teacherId.course} Teacher
            </Text>
          </View>
        </View>
      </View>
      <View className="border-b p-3 border-gray-400"></View>
      <Text className="text-2xl p-5">What you will learn</Text>

      {renderSections()}
    </ScrollView>
  );
}
