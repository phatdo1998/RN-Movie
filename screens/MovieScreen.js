import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { SafeAreaView } from "react-native";
import { HeartIcon } from "react-native-heroicons/solid";
import { theme } from "../themes";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MoviesList from "../components/MoviesList";
import Loading from "../components/Loading";
import { useRoute } from "@react-navigation/native";
import {
  fetchCreditsMovies,
  fetchMoviesDetails,
  fetchSimilarMovies,
  imageW500,
} from "../api";

var { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  const [isFavourite, toggleFavourite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([1, 2, 3, 4, 5]);
  const [movie, setMovie] = useState({});

  const { params: item } = useRoute();

  useEffect(() => {
    setLoading(true);
    getMovieDetials(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetials = async (id) => {
    const data = await fetchMoviesDetails(id);
    setLoading(false);
    if (data) setMovie({ ...movie, ...data });
  };
  const getMovieCredits = async (id) => {
    const data = await fetchCreditsMovies(id);
    setLoading(false);
    if (data && data.cast) setCast(data.cast);
  };
  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);

    setLoading(false);
    if (data && data.results) setSimilar(data.results);
  };

  return (
    <ScrollView className="flex-1 bg-neutral-900 ">
      <StatusBar barStyle={"light-content"} />
      <View className="w-full">
        <SafeAreaView className="w-full absolute z-20 flex-row justify-between items-center px-4 mt-2">
          <BackButton />
          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
            <HeartIcon
              size={35}
              color={isFavourite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <>
            <View>
              <Image
                className="relative"
                style={{ width, height: height * 0.4 }}
                source={{ uri: imageW500(movie.backdrop_path) }}
              />
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(23, 23, 23, 0.8)",
                  "rgba(23, 23, 23, 1)",
                ]}
                style={{ width, height: height * 0.4 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className="absolute bottom-0"
              />
            </View>
            <View
              style={{ marginTop: -(height * 0.06) }}
              className="mx-4 items-center space-y-3"
            >
              <Text className="text-white font-bold text-3xl text-center tracking-widest">
                {movie?.title}
              </Text>
              {movie?.id ? (
                <Text className="text-neutral-400 font-semibold text-base text-center">
                  {movie?.status} •{" "}
                  {movie?.release_date?.split("-")[0] || "N/A"} •{" "}
                  {movie?.runtime} min
                </Text>
              ) : null}
              <View className="flex-row justify-center mx-4 space-x-2">
                {movie?.genres?.map((genre, index) => {
                  let showDot = index + 1 != movie.genres.length;
                  return (
                    <Text
                      key={index}
                      className="text-neutral-400 font-semibold text-base text-center"
                    >
                      {genre?.name} {showDot ? "•" : null}
                    </Text>
                  );
                })}
              </View>
              <Text className="text-neutral-400 font-semibold text-base text-center mb-5">
                {movie?.overview}
              </Text>
            </View>
            {/* cast */}
            <Cast cast={cast} />
            {/* similar */}
            <MoviesList title="Similar" data={similar} hideSeeAll={true} />
          </>
        )}
      </View>
    </ScrollView>
  );
}
