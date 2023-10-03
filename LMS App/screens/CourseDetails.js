import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useRoute } from "@react-navigation/native";
import { Video } from "expo-av";
import { LMS_API } from "../api/api";
export default function CourseDetails() {
  const route = useRoute();
  const { sectionId } = route.params;
  console.log("sectionId=========", sectionId);
  const navigation = useNavigation();
  const [section, setSection] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  useEffect(() => {
    const getSection = async () => {
      try {
        const { data } = await LMS_API.get(`/sections/${sectionId}`);
        console.log("data.section==============", data);
        setSection(data.section);

        // Set the initial video URI if lessons are available
        if (data.section?.lessons?.length > 0) {
          setVideoUri(data.section.lessons[0].url);
        }
      } catch (error) {
        console.log("API call error:", error);
      }
    };

    getSection();
  }, []);

  const pickVideo = (videoUrl) => {
    console.log("videoUrl=====", videoUrl);
    setVideoUri(videoUrl);
    setIsPlaying(true); // Start playing the video when selected
  };

  return (
    <ScrollView className="pt-3 bg-[ #f5f5f5]">
      <SafeAreaView className=" p-3">
        <View className="flex flex-row">
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
        </View>

        <View className="mt-5">
          <Text className="text-[#333] font-bold text-2xl mb-4">
            {section.title}
          </Text>

          <Video
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/rect-practice-b01ba.appspot.com/o/videos%2F1%20-%20How%20to%20Get%20Help.mp479684a6c-e5d9-4d5a-8834-4d64527c13dd?alt=media&token=14f27b24-5d04-4741-9c13-ffb885c87ade",
            }}
            style={{ width: "100%", aspectRatio: 16 / 9 }}
            shouldPlay={isPlaying}
            useNativeControls
          />
          <View className="h-[1px] mt-2 bg-[#ccc]" />
          <View className="mt-5">
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text className="font-bold text-xl mb-3">Contents</Text>
              <Text
                style={{ color: "#777", fontSize: 18 }}
                className="text-[#777] text-xl"
              >
                Videos
              </Text>
            </View>
          </View>
          {section?.lessons?.map((item) => (
            <TouchableOpacity
              onPress={() => pickVideo(item.url)} // Pass the lesson ID to pickVideo
              key={item._id}
              className="flex flex-row items-center bg-white mb-2 p-3 rounded-lg border border-[#ddd]"
            >
              <Image source={require("../assets/icons/play.png")} />
              <View className="ml-2">
                <Text className="text-xl font-bold text-[#333]">
                  {item.title}
                </Text>
                <Text className="text-[#777]">30min</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
