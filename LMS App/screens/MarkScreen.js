import React from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const subjects = [
  {
    id: "1",
    name: "Math",
    components: [
      { name: "First", marks: "30" },
      { name: "Mid", marks: "30" },
      { name: "Final", marks: "40" },
    ],
  },
  {
    id: "2",
    name: "Science",
    components: [
      { name: "First", marks: "25" },
      { name: "Mid", marks: "30" },
      { name: "Final", marks: "35" },
    ],
  },
  // Add more subjects with components here
];

const MarksPage = () => {
  return (
    <View className=" flex p-5 flex-1">
      <SafeAreaView>
        <Text className="text-[#52B6DF] text-2xl text-center font-bold mb-5">
          Subject Marks
        </Text>
      </SafeAreaView>
      <FlatList
        data={subjects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-5 rounded-lg p-5 shadow-md bg-[#fff]">
            <Text className="text-xl font-bold text-[#52B6DF]">
              {item.name}
            </Text>
            {item.components.map((component, index) => (
              <View
                key={index}
                className="flex flex-row  items-center justify-between mt-1"
              >
                <Text className="text-lg  ">{component.name}</Text>
                <Text className="text-xl font-bold">{component.marks}</Text>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
};

export default MarksPage;
