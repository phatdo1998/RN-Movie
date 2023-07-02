import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import Navigation from ".";
import SearchScreen from "../screens/SearchScreen";
import PersonScreen from "../screens/PersonScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import CustomDrawer from "../components/CustomDrawer";
import * as Icons from "react-native-heroicons/solid";
import { theme } from "../themes";
import Settings from "../screens/Settings";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerLabelStyle: { marginLeft: -25, fontSize: 16 },
        drawerActiveBackgroundColor: theme.background,
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Home"
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => {
            return <Icons.HomeIcon size={"20"} color={color} />;
          },
        }}
        component={Navigation}
      />
      <Drawer.Screen
        name="Setting"
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => {
            return <Icons.Cog8ToothIcon size={"20"} color={color} />;
          },
        }}
        component={Settings}
      />
    </Drawer.Navigator>
  );
}
