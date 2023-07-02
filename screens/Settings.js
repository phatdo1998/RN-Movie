import { View, Text, Image, SafeAreaView } from "react-native";
import React from "react";
import BackButton from "../components/BackButton";

export default function Settings() {
  return (
    <View className="flex-1 items-center bg-neutral-800">
      <View className="w-full z-20">
        <SafeAreaView className="w-full absolute top-2 z-20 flex-row justify-between items-center px-4">
          <BackButton />
        </SafeAreaView>
      </View>
      <Image
        className="w-96 h-96"
        source={require("../assets/images/movieTime.png")}
      />
      <Text className="text-white text-xl">
        This feature is under development !
      </Text>
    </View>
  );
}
