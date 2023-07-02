import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import * as Icons from "react-native-heroicons/solid";

import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";

export default function CustomDrawer(props) {
  const navigation = useNavigation();

  const handleSignOut = async () => {
    await signOut(auth).then(() => {
      navigation.navigate("Login");
    });
  };

  return (
    <View className="flex-1 bg-neutral-900">
      <DrawerContentScrollView {...props}>
        <View className="justify-center items-center bg-neutral-900 py-5 border-b border-red-600">
          <Image
            className="w-20 h-20 rounded-full mb-3"
            source={require("../assets/images/user-profile.jpg")}
          />
          <Text className="text-white text-center text-xl mb-1">User name</Text>
          <View className="flex-row items-center space-x-1">
            <Text className="text-white text-center text-sm">280 Coin</Text>
            <Icons.CircleStackIcon size={15} color={"white"} />
          </View>
        </View>
        <View className="flex-1 bg-neutral-900 pt-3">
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View className="p-4 border-t border-red-600 ">
        <TouchableOpacity onPress={handleSignOut}>
          <View className="flex-row items-center">
            <Icons.ArrowLeftOnRectangleIcon size={30} color={"red"} />
            <Text className="ml-2 text-lg text-white font-bold">Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
