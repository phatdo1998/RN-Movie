import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { styles } from "../themes";
import { useNavigation } from "@react-navigation/native";
import { imageW500 } from "../api";

const { width, height } = Dimensions.get("window");

export default function MoviesList({ data, title, hideSeeAll }) {
  const navigation = useNavigation();
  return (
    <View className="mx-4 mb-5">
      <View className=" flex-row justify-between items-center">
        <Text className="text-white text-lg mb-3">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity className="mb-3">
            <Text style={styles.text} className="text-lg">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.navigate("Movie", item)}
            >
              <View style={{ width: 140 }} className="mr-3 space-y-1">
                <Image
                  className="rounded-3xl ml-1"
                  style={{ width: width * 0.33, height: height * 0.22 }}
                  source={{
                    uri: imageW500(item.backdrop_path || item.poster_path),
                  }}
                />
                <Text className="text-neutral-300 text-center ml-1">
                  {item.original_title && item.original_title.length > 14
                    ? item?.original_title.slice(0, 14) + "..."
                    : item?.original_title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
