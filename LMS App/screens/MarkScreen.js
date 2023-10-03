import React from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import ClassRoomContext from "../store/ClassRoomsContext";
import UserContext from "../store/authContext";

const MarksPage = () => {
  const { classRooms } = useContext(ClassRoomContext);
  const { user } = useContext(UserContext);
  console.log("marksPage====", classRooms);
  console.log("marksPage====", user);

  return (
    <View className=" flex p-5 flex-1">
      <SafeAreaView>
        <Text className="text-[#52B6DF] text-2xl text-center font-bold mb-5">
          Subject Marks
        </Text>
      </SafeAreaView>
      <FlatList
        data={classRooms}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View className="mb-5 rounded-lg p-5 shadow-md bg-[#fff]">
            <Text className="text-xl font-bold text-[#52B6DF]">
              {item.subject}
            </Text>
            {item.students.map((student) => {
              if (student._id == user._id)
                return (
                  <View key={student._id}>
                    <View className="flex flex-row  items-center justify-between mt-1">
                      <Text className="text-lg  ">first</Text>
                      <Text className="text-xl font-bold">
                        {student.marks.first}
                      </Text>
                    </View>
                    <View className="flex flex-row  items-center justify-between mt-1">
                      <Text className="text-lg  ">mid</Text>
                      <Text className="text-xl font-bold">
                        {student.marks.mid}
                      </Text>
                    </View>
                    <View className="flex flex-row  items-center justify-between mt-1">
                      <Text className="text-lg  ">final</Text>
                      <Text className="text-xl font-bold">
                        {student.marks.final}
                      </Text>
                    </View>
                  </View>
                );
            })}
          </View>
        )}
      />
    </View>
  );
};

export default MarksPage;
