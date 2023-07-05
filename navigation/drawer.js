import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import * as Icons from "react-native-heroicons/solid";
import Navigation from ".";
import CustomDrawer from "../components/CustomDrawer";
import Settings from "../screens/Settings";
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
