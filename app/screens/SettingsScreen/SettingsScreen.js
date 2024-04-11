import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import DropDownPicker from "react-native-dropdown-picker";
import { useSettings } from "../../settings/Settings";

const SettingsScreen = () => {
  const {
    islandWork,
    synchronousWork,
    windTurbinePercentage,
    linearLoadPercentage,
    nonLinearLoadPercentage,
    inverterGeneratedPower,

    manualSettings,
    setManualSettings,
    currentDataProfile,
    allProfiles,
    changeProfile,
  } = useSettings();

  const [changeInProgress, setChangeInProgress] = useState(false);

  const [islandWorkCopy, setIslandWorkCopy] = useState(islandWork);
  const [synchronousWorkCopy, setSynchronousWorkCopy] =
    useState(synchronousWork);
  const [windTurbinePercentageCopy, setWindTurbinePercentageCopy] = useState(
    windTurbinePercentage
  );
  const [linearLoadPercentageCopy, setLinearLoadPercentageCopy] =
    useState(linearLoadPercentage);
  const [nonLinearLoadPercentageCopy, setNonlinearLoadPercentageCopy] =
    useState(nonLinearLoadPercentage);
  const [inverterGeneratedPowerCopy, setInverterGeneratedPowerCopy] = useState(
    inverterGeneratedPower
  );

  const newDataProfile = `data_${islandWorkCopy}_${windTurbinePercentageCopy}_${linearLoadPercentageCopy}_${nonLinearLoadPercentageCopy}_${inverterGeneratedPowerCopy}`;

  const handleIslandWorkChange = (value) => {
    setChangeInProgress(true);
    setIslandWorkCopy(value);
    setSynchronousWorkCopy(!value);
    setManualSettings(true);
  };

  const handleSynchronousWorkChange = (value) => {
    setChangeInProgress(true);
    setSynchronousWorkCopy(value);
    setIslandWorkCopy(!value);
    setManualSettings(true);
  };

  const handleWindTurbineChange = (value) => {
    setChangeInProgress(true);
    setWindTurbinePercentageCopy(parseInt(value));
    setManualSettings(true);
  };

  const handleLinearLoadChange = (value) => {
    setChangeInProgress(true);
    setLinearLoadPercentageCopy(parseInt(value));
    setManualSettings(true);
  };

  const handleNonlinearLoadChange = (value) => {
    setChangeInProgress(true);
    setNonlinearLoadPercentageCopy(parseInt(value));
    setManualSettings(true);
  };

  const handleInverterGeneratedPowerChange = (value) => {
    setChangeInProgress(true);
    setInverterGeneratedPowerCopy(value);
    setManualSettings(true);
  };

  const resetChanges = () => {
    setIslandWorkCopy(islandWork);
    setSynchronousWorkCopy(synchronousWork);
    setWindTurbinePercentageCopy(windTurbinePercentage);
    setLinearLoadPercentageCopy(linearLoadPercentage);
    setNonlinearLoadPercentageCopy(nonLinearLoadPercentage);
    setInverterGeneratedPowerCopy(inverterGeneratedPower);
    setChangeInProgress(false);
  };

  //DROP DOWN PICKER
  const dataProfiles = allProfiles.map((x) => {
    const [, islandWork, windTurbine, linearLoad, nonlinearLoad, inverter] =
      x.split(`_`);
    let label = `Praca ${islandWork == `true` ? `wyspowa` : `synchroniczna`}\n`;
    label += `Turbina wiatrowa ${windTurbine} %\n`;
    label += `Obciążenie liniowe ${linearLoad} %\n`;
    label += `Obciążenie nieliniowe ${nonlinearLoad} %\n`;
    label += `Zadana moc falownika ${inverter / 1000} kW`;
    return { label, value: x, containerStyle: { height: 110 } };
  });
  dataProfiles.push({
    label: "Konfiguracja ręczna",
    value: "manual",
  });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(currentDataProfile);
  const [items, setItems] = useState(dataProfiles);
  const handleOpen = () => {
    setManualSettings(false);
  };
  const handleValueChange = (value) => {
    if (value != `manual`) {
      setManualSettings(false);
      const [prefix, island, windTurbine, linearLoad, nonlinearLoad, inverter] =
        value.split(`_`);

      setIslandWorkCopy(JSON.parse(island));
      setSynchronousWorkCopy(!JSON.parse(island));
      setWindTurbinePercentageCopy(parseInt(windTurbine));
      setLinearLoadPercentageCopy(parseInt(linearLoad));
      setNonlinearLoadPercentageCopy(parseInt(nonlinearLoad));
      setInverterGeneratedPowerCopy(parseInt(inverter));
      setChangeInProgress(true);
    } else {
      setManualSettings(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingRow}>
        <Text style={[styles.text]}>Gotowe profile konfiguracji</Text>
      </View>

      <View style={styles.settingRow}>
        <DropDownPicker
          maxHeight={340}
          open={open}
          value={manualSettings ? `manual` : value}
          items={items}
          setOpen={setOpen}
          onOpen={handleOpen}
          setValue={setValue}
          onChangeValue={handleValueChange}
          setItems={setItems}
          autoScroll={true}
          style={{ height: 110, marginBottom: 10, marginTop: 10 }}
          textStyle={{
            fontFamily: "Montserrat-Regular",
            fontSize: 16,
          }}
        />
      </View>

      <View style={styles.settingRow}>
        {changeInProgress ? (
          <Text style={[styles.text]}>Profil w trakcie zmiany</Text>
        ) : (
          <Text style={[styles.text]}>Profil</Text>
        )}

        {allProfiles.includes(newDataProfile) ? (
          <Text style={[styles.text, styles.validText]}>Poprawny</Text>
        ) : (
          <Text style={[styles.text, styles.invalidText]}>Niepoprawny</Text>
        )}
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.text}>Praca wyspowa</Text>
        <Switch
          value={islandWorkCopy}
          onValueChange={handleIslandWorkChange}
          trackColor={{ false: lightBlueColor, true: blueColor }}
          thumbColor={whiteColor}
        />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.text}>Praca synchroniczna</Text>
        <Switch
          value={synchronousWorkCopy}
          onValueChange={handleSynchronousWorkChange}
          trackColor={{ false: lightBlueColor, true: blueColor }}
          thumbColor={whiteColor}
        />
      </View>

      <View style={styles.sliderContainer}>
        <Text style={[styles.text, styles.sliderLabel]}>Turbina wiatrowa</Text>
        <View style={styles.sliderRow}>
          <Slider
            style={styles.slider}
            value={windTurbinePercentageCopy}
            minimumValue={0}
            maximumValue={50}
            step={50}
            onValueChange={handleWindTurbineChange}
            minimumTrackTintColor={blueColor}
            maximumTrackTintColor={blueColor}
            thumbTintColor={blueColor}
          />
          <Text style={[styles.text, styles.sliderValue]}>
            {windTurbinePercentageCopy} %
          </Text>
        </View>
      </View>

      <View style={styles.sliderContainer}>
        <Text style={[styles.text, styles.sliderLabel]}>
          Obciążenie liniowe
        </Text>
        <View style={styles.sliderRow}>
          <Slider
            style={styles.slider}
            value={linearLoadPercentageCopy}
            minimumValue={0}
            maximumValue={100}
            step={50}
            onValueChange={handleLinearLoadChange}
            minimumTrackTintColor={blueColor}
            maximumTrackTintColor={blueColor}
            thumbTintColor={blueColor}
          />
          <Text style={[styles.text, styles.sliderValue]}>
            {linearLoadPercentageCopy} %
          </Text>
        </View>
      </View>

      <View style={styles.sliderContainer}>
        <Text style={[styles.text, styles.sliderLabel]}>
          Obciążenie nieliniowe
        </Text>
        <View style={styles.sliderRow}>
          <Slider
            style={styles.slider}
            value={nonLinearLoadPercentageCopy}
            minimumValue={0}
            maximumValue={90}
            step={50}
            onValueChange={handleNonlinearLoadChange}
            minimumTrackTintColor={blueColor}
            maximumTrackTintColor={blueColor}
            thumbTintColor={blueColor}
          />
          <Text style={[styles.text, styles.sliderValue]}>
            {nonLinearLoadPercentageCopy} %
          </Text>
        </View>
      </View>

      <View style={styles.sliderContainer}>
        <Text style={[styles.text, styles.sliderLabel]}>
          Zadana moc falownika
        </Text>
        <View style={styles.sliderRow}>
          <Slider
            style={styles.slider}
            value={inverterGeneratedPowerCopy}
            minimumValue={0}
            maximumValue={4000}
            step={1000}
            onValueChange={handleInverterGeneratedPowerChange}
            minimumTrackTintColor={blueColor}
            maximumTrackTintColor={blueColor}
            thumbTintColor={blueColor}
          />
          <Text style={[styles.text, styles.sliderValue]}>
            {inverterGeneratedPowerCopy / 1000} kW
          </Text>
        </View>
      </View>

      <View style={styles.btnRow}>
        <TouchableOpacity
          style={[styles.btn, styles.whiteBtn]}
          onPress={() => {
            resetChanges();
          }}
        >
          <Text style={[styles.text, styles.blueText]}>Odrzuć</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.blueBtn]}
          onPress={() => {
            if (allProfiles.includes(newDataProfile)) {
              changeProfile(newDataProfile);
              setChangeInProgress(false);
            }
          }}
        >
          <Text style={[styles.text, styles.whiteText]}>Zatwierdź</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const blueColor = "#047AF8";
const lightBlueColor = "#6FB5FF";
const whiteColor = "#FFFFFF";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    width: "80%",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  btnRow: {
    width: "80%",
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sliderContainer: {
    alignItems: "flex-start",
    marginTop: 10,
    width: "80%",
  },
  sliderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  slider: {
    flex: 1,
    width: "40%",
    marginLeft: -15,
    marginRight: 10,
  },
  sliderLabel: {
    marginBottom: 5,
  },
  sliderValue: {
    width: 50,
  },
  btn: {
    width: 150,
    borderRadius: 10,
    padding: 10,
  },
  blueBtn: {
    backgroundColor: blueColor,
  },
  whiteBtn: {
    backgroundColor: whiteColor,
    borderColor: blueColor,
    borderWidth: 1,
  },
  text: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 16,
    textAlign: "center",
  },
  validText: {
    color: `green`,
  },
  invalidText: {
    color: `red`,
  },
  whiteText: {
    color: whiteColor,
  },
  blueText: { color: blueColor },
});

export default SettingsScreen;
