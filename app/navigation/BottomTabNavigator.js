import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import DashboardScreen from "../screens/DashboardScreen/DashboardScreen";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={createTabScreenOptions("Ekran główny")}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={createTabScreenOptions("Ustawienia")}
      />
    </Tab.Navigator>
  );
};

const createTabScreenOptions = (title) => {
  return {
    title,
    headerTitleAlign: "center",
    headerTitleStyle: { fontFamily: "Montserrat-SemiBold" },
    headerStyle: { height: 120 },
  };
};

export default BottomTabNavigator;
