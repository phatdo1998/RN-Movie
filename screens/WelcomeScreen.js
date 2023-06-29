import {
  View,
  Text,
  BackHandler,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { styles, theme } from "../themes";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <ImageBackground
      className="flex-1"
      source={require("../assets/images/backgroundImage2.jpeg")}
    >
      <View className="flex-1 justify-center items-center">
        <Image
          className="w-72 h-72 mt-20"
          source={require("../assets/images/logo.jpg")}
        />
      </View>
      <View className="flex-1 justify-center items-center ">
        <Text className="text-5xl  text-white">Welcome to </Text>
        <View className="mt-10">
          <Text
            style={{ color: "#fe0000" }}
            className="font-extrabold text-7xl"
          >
            M<Text className="text-white">ovie</Text>
          </Text>
        </View>
      </View>
      <View className="flex-1 justify-center items-center mx-4 space-y-5">
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{
            backgroundColor: theme.background,
          }}
          className={`p-4 w-full rounded-full`}
        >
          <View className=" justify-center items-center">
            <Text className="text-white font-bold text-2xl">Get started</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
