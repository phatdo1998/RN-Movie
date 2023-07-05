import { View, Dimensions, ActivityIndicator } from "react-native";
import React from "react";
import { theme } from "../themes";

var { width, height } = Dimensions.get("window");
export default function Loading() {
  return (
    <View
      style={{ width, height }}
      className="flex-row flex-1 justify-center items-center"
    >
      <ActivityIndicator size={"large"} color={theme.background} />
    </View>
  );
}
