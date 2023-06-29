import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { imageW500 } from "../api";

export default function Cast({ cast }) {
  const navigation = useNavigation();
  return (
    <View className="mx-4 mb-4">
      <Text className="text-white text-lg mb-5">Top Cast</Text>
      <ScrollView horizontal>
        {cast.map((person, index) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Person", person)}
              className="mr-4 items-center"
              key={index}
            >
              <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-300 ">
                <Image
                  className="w-24 h-20 rounded-2xl"
                  source={{ uri: imageW500(person.profile_path) }}
                />
              </View>
              <Text className="text-white mt-1 text-xs">
                {person?.character.length > 10
                  ? person?.character.slice(0, 10) + "..."
                  : person?.character}
              </Text>
              <Text className="text-neutral-400 text-xs">
                {person.original_name.length > 10
                  ? person.original_name.slice(0, 10) + "..."
                  : person?.original_name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
