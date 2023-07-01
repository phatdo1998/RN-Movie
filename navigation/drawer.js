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
        name="Search"
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => {
            return <Icons.HomeIcon size={"20"} color={color} />;
          },
        }}
        component={SearchScreen}
      />
      <Drawer.Screen
        name="Person"
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => {
            return <Icons.HomeIcon size={"20"} color={color} />;
          },
        }}
        component={PersonScreen}
      />
      <Drawer.Screen
        name="Login"
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => {
            return <Icons.HomeIcon size={"20"} color={color} />;
          },
        }}
        component={LoginScreen}
      />
      <Drawer.Screen
        name="Register"
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => {
            return <Icons.HomeIcon size={"20"} color={color} />;
          },
        }}
        component={RegisterScreen}
      />
    </Drawer.Navigator>
  );
}
