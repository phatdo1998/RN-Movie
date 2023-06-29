import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React, { useCallback, useState } from "react";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { imageW500, searchMovies } from "../api";
import { debounce } from "lodash";
import Loading from "../components/Loading";

var { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const navigation = useNavigation();
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (value) => {
    if (value && value.length > 2) {
      setLoading(true);
      searchMovies({
        query: value,
        include_adult: false,
        language: "en-US",
        page: "1",
      }).then((data) => {
        setLoading(false);
        if (data && data.results) setResult(data.results);
      });
    }
  };

  const handleTextDebounce = useCallback(debounce(handleChange, 400), []);

  return (
    <View className="flex-1 bg-neutral-800">
      <View className="mx-4 mb-3 flex-row border border-neutral-400 rounded-full justify-between">
        <TextInput
          onChangeText={handleTextDebounce}
          className="ml-6 flex-1 tracking-wide font-semibold text-base text-white"
          placeholder="Search Movies"
          placeholderTextColor={"lightgray"}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon
            className="bg-neutral-600 rounded-full"
            size={30}
            color={"white"}
          />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loading />
      ) : result.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false} className="mx-4  ">
          <Text className="text-white font-bold text-xl mb-5">
            Results ({result.length})
          </Text>
          <View className=" flex-row justify-between flex-wrap">
            {result.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  onPress={() => navigation.push("Movie", item)}
                  key={index}
                >
                  <View className="mb-4">
                    <Image
                      className="rounded-3xl"
                      style={{ width: width * 0.44, height: height * 0.3 }}
                      source={{
                        uri: imageW500(item?.backdrop_path || item.poster_path),
                      }}
                    />
                    <Text className="text-white text-center">
                      {item?.original_title && item?.original_title.length > 18
                        ? item?.original_title.slice(0, 18) + "..."
                        : item?.original_title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/movieTime.png")}
            className="h-96 w-96"
          />
        </View>
      )}
    </View>
  );
}
