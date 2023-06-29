import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HeartIcon } from "react-native-heroicons/solid";
import { fetchPersonDetails, fetchPersonMovies, imageW500 } from "../api";
import BackButton from "../components/BackButton";
import Loading from "../components/Loading";
import MoviesList from "../components/MoviesList";
import { theme } from "../themes";

var { width, height } = Dimensions.get("window");
export default function PersonScreen() {
  const [isFavourite, toggleFavourite] = useState(false);
  const character = "John Wick";
  const [loading, setLoading] = useState(false);
  const [personMovies, setPersonMovies] = useState([1, 2, 3, 4, 5]);
  const [person, setPerson] = useState({});

  const { params: item } = useRoute();

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    setLoading(false);
    if (data) setPerson(data);
  };

  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    setLoading(false);
    if (data && data.cast) setPersonMovies(data.cast);
  };

  return (
    <ScrollView className="flex-1 bg-neutral-800">
      <View className="flex-row items-center justify-between mx-4 mt-2">
        <BackButton />
        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
          <HeartIcon
            size={35}
            color={isFavourite ? theme.background : "white"}
          />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loading />
      ) : (
        <View className=" items-center mt-5 ">
          <View className="items-center rounded-full overflow-hidden h-72 w-72 border-neutral-500 border-2">
            <Image
              style={{ height: height * 0.43, width: width * 0.74 }}
              // source={require("../assets/images/castImage2.png")}
              source={{ uri: imageW500(person?.profile_path) }}
            />
          </View>
          <View className="">
            <Text className="text-white text-3xl font-bold mt-4 text-center">
              {person?.name}
            </Text>
            <Text className="text-neutral-400 text-base text-center">
              {person?.place_of_birth || "N/A"}
            </Text>
          </View>
          <View className="flex-row items-center justify-between bg-neutral-700 mx-3 rounded-full p-4 mt-7">
            <View className="border-r-2 border-r-neutral-400 items-center px-2">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.gender == 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 items-center px-2">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.birthday || "N/A"}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 items-center px-2">
              <Text className="text-white font-semibold">Known for</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.known_for_department || "N/A"}
              </Text>
            </View>
            <View className=" items-center px-2">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.popularity?.toFixed(2)} %
              </Text>
            </View>
          </View>
          <View className="mx-4 mt-5 mb-5">
            <Text className="text-white font-bold text-xl mb-3">Biography</Text>
            <Text className="text-neutral-300 text-base text-center">
              {person?.biography || "N/A"}
            </Text>
          </View>
          <MoviesList title="Movies" data={personMovies} hideSeeAll={true} />
        </View>
      )}
    </ScrollView>
  );
}
