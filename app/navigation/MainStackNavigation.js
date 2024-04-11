import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabNavigator from "./BottomTabNavigator";
import InverterScreen from "../screens/InverterScreen/InverterScreen";
import GridScreen from "../screens/GridScreen/GridScreen";
import EnergyStorageScreen from "../screens/EnergyStorageScreen/EnergyStorageScreen";
import LinearLoadScreen from "../screens/LinearLoadScreen/LinearLoadScreen";
import NonlinearLoadScreen from "../screens/NonlinearLoadScreen/NonlinearLoadScreen";
import WindTurbineScreen from "../screens/WindTurbineScreen/WindTurbineScreen";
import SolarPanelScreen from "../screens/SolarPanelScreen/SolarPanelScreen";

const Stack = createNativeStackNavigator();

const MainNavigationContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Montserrat-SemiBold",
          },
        }}
      >
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Falownik" component={InverterScreen} />
        <Stack.Screen name="Sieć dystrybucyjna" component={GridScreen} />
        <Stack.Screen name="Turbina wiatrowa" component={WindTurbineScreen} />
        <Stack.Screen name="Zasobnik energii" component={EnergyStorageScreen} />
        <Stack.Screen name="Obciążenie liniowe" component={LinearLoadScreen} />
        <Stack.Screen
          name="Obciążenie nieliniowe"
          component={NonlinearLoadScreen}
        />
        <Stack.Screen
          name="Ogniwa fotowoltaiczne"
          component={SolarPanelScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigationContainer;
