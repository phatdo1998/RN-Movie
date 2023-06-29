import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { styles } from "../themes";
import { useNavigation } from "@react-navigation/native";

export default function BackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.background}
      className="rounded-xl p-1"
      onPress={() => {
        navigation.goBack();
      }}
    >
      <ChevronLeftIcon size={30} strokeWidth={2.5} color={"white"} />
    </TouchableOpacity>
  );
}
