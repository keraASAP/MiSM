import React from "react";
import { useFonts } from "expo-font";
import { SettingsProvider } from "./settings/Settings";
import MainStackNavigation from "./navigation/MainStackNavigation";

const App = () => {
  const [fontsLoaded] = useFonts({
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SettingsProvider>
      <MainStackNavigation></MainStackNavigation>
    </SettingsProvider>
  );
};

export default App;
