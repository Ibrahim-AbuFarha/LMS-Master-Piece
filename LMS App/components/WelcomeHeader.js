import { View, Text, Image } from "react-native";
import React from "react";

export default function WelcomeHeader() {
  return (
    <View className="flex flex-row justify-between items-center">
      <View>
        <Text>Hello,</Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Ahmed</Text>
      </View>
      <Image
        source={{
          uri: "https://icon-library.com/images/google-user-icon/google-user-icon-16.jpg",
        }}
        style={{ width: 40, height: 40, borderRadius: 100 }}
      />
    </View>
  );
}
