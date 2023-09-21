import { View, Text } from "react-native";
import React from "react";

import { FlatList } from "react-native";
import { Image } from "react-native";
import Colors from "../Shared/Colors";
import { TouchableOpacity } from "react-native";

export default function CourseList() {
  return (
    <View style={{ marginTop: 10 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textTransform: "capitalize",
          marginBottom: 3,
        }}
      >
        Course
      </Text>

      <FlatList
        data={["1", "2", "3"]}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: Colors.white,
              marginRight: 10,
              borderRadius: 10,
            }}
          >
            <Image
              source={
                "https://icon-library.com/images/google-user-icon/google-user-icon-16.jpg"
              }
              style={{
                width: 180,
                height: 100,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                resizeMode: "cover",
              }}
            />
            <View style={{ padding: 10 }}>
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                {item.name}
              </Text>
              <Text style={{ color: Colors.gray, fontWeight: "300" }}>
                Lessons
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
