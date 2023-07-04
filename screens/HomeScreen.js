import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Icons from "react-native-heroicons/outline";
import { styles } from "../themes";
import TrendingMovies from "../components/TrendingMovies";
import MoviesList from "../components/MoviesList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api";
// import DrawerNavigation from "../navigation/drawer";

export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    getTrendingMovies();
    getPopularMovies();
    getTopRatedMovies();
    getUpcomingMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) {
      setLoading(false);
      setTrending(data.results);
    }
  };
  const getPopularMovies = async () => {
    const data = await fetchPopularMovies();
    if (data && data.results) {
      setPopular(data.results);
    }
  };
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    if (data && data.results) {
      setUpComing(data.results);
    }
  };
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    if (data && data.results) {
      setTopRated(data.results);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-neutral-800 pt-2">
      <StatusBar barStyle={"default"} />
      {/* search bar */}
      <View className="flex-row justify-between px-4 mb-5 ">
        <Icons.Bars3CenterLeftIcon
          onPress={() => navigation.openDrawer()}
          size={30}
          strokeWidth={2}
          color={"white"}
        />
        <Text className="text-4xl text-white font-extrabold">
          <Text style={styles.text}>M</Text>ovie
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          {/* <DrawerNavigation /> */}
          <Icons.MagnifyingGlassIcon
            size={30}
            strokeWidth={2}
            color={"white"}
          />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView>
          <TrendingMovies data={trending} />
          <MoviesList data={popular} title="Popular" hideSeeAll={false} />
          <MoviesList data={topRated} title="TopRated" hideSeeAll={false} />
          <MoviesList data={upComing} title="UpComing" hideSeeAll={false} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
