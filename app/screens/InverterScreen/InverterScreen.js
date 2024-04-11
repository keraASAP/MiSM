import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import ExpandableElement from "../../components/ExpandableElement";
import InfoParameterRow from "../../components/InfoParameterRow";
import LiveChartExample from "../../components/LiveChart";

import { useSettings } from "../../settings/Settings";

const InverterScreen = () => {
  const { liveData, inverterGeneratedPower } = useSettings();

  return (
    <ScrollView style={styles.container}>
      <ExpandableElement
        title="Aktualne parametry AC"
        initialHeight={400}
        expandableContent={
          <View>
            <InfoParameterRow
              name="Napięcie fazy L1"
              value={`${liveData.FRONIUS_STATUS_AC_U1N.values[
                liveData.FRONIUS_STATUS_AC_U1N.values.length - 1
              ].toFixed(2)} ${liveData.FRONIUS_STATUS_AC_U1N.unit}`}
            ></InfoParameterRow>

            <InfoParameterRow
              name="Napięcie fazy L2"
              value={`${liveData.FRONIUS_STATUS_AC_U2N.values[
                liveData.FRONIUS_STATUS_AC_U2N.values.length - 1
              ].toFixed(2)} ${liveData.FRONIUS_STATUS_AC_U2N.unit}`}
            ></InfoParameterRow>

            <InfoParameterRow
              name="Napięcie fazy L3"
              value={`${liveData.FRONIUS_STATUS_AC_U3N.values[
                liveData.FRONIUS_STATUS_AC_U3N.values.length - 1
              ].toFixed(2)} ${liveData.FRONIUS_STATUS_AC_U3N.unit}`}
            ></InfoParameterRow>

            <InfoParameterRow
              name="Prąd fazy L1"
              value={`${liveData.FRONIUS_STATUS_AC_I_L1.values[
                liveData.FRONIUS_STATUS_AC_I_L1.values.length - 1
              ].toFixed(2)} ${liveData.FRONIUS_STATUS_AC_I_L1.unit}`}
            ></InfoParameterRow>

            <InfoParameterRow
              name="Prąd fazy L2"
              value={`${liveData.FRONIUS_STATUS_AC_I_L2.values[
                liveData.FRONIUS_STATUS_AC_I_L2.values.length - 1
              ].toFixed(2)} ${liveData.FRONIUS_STATUS_AC_I_L2.unit}`}
            ></InfoParameterRow>

            <InfoParameterRow
              name="Prąd fazy L3"
              value={`${liveData.FRONIUS_STATUS_AC_I_L3.values[
                liveData.FRONIUS_STATUS_AC_I_L3.values.length - 1
              ].toFixed(2)} ${liveData.FRONIUS_STATUS_AC_I_L3.unit}`}
            ></InfoParameterRow>

            <InfoParameterRow
              name="Częstotliwość"
              value={`${liveData.FRONIUS_STATUS_AC_FQ.values[
                liveData.FRONIUS_STATUS_AC_FQ.values.length - 1
              ].toFixed(2)} ${liveData.FRONIUS_STATUS_AC_FQ.unit}`}
            ></InfoParameterRow>

            <InfoParameterRow
              name="Nastawa mocy generowanej"
              value={`${inverterGeneratedPower.toFixed(2)} W`}
            ></InfoParameterRow>

            <InfoParameterRow
              name="Moc czynna"
              value={`${liveData.FRONIUS_STATUS_AC_P.values[
                liveData.FRONIUS_STATUS_AC_P.values.length - 1
              ].toFixed(2)} ${liveData.FRONIUS_STATUS_AC_P.unit}`}
            ></InfoParameterRow>

            <InfoParameterRow
              name="Moc bierna"
              value={`${liveData.FRONIUS_STATUS_Q.values[
                liveData.FRONIUS_STATUS_Q.values.length - 1
              ].toFixed(2)} ${liveData.FRONIUS_STATUS_Q.unit}`}
            ></InfoParameterRow>
          </View>
        }
      />

      <ExpandableElement
        title="Wykres mocy czynnej"
        initialHeight={335}
        expandableContent={
          <LiveChartExample
            liveData={liveData.FRONIUS_STATUS_AC_P.values}
            unit={" W"}
            decimals={2}
          ></LiveChartExample>
        }
      />

      <ExpandableElement
        title="Wykres mocy biernej"
        initialHeight={335}
        expandableContent={
          <LiveChartExample
            liveData={liveData.FRONIUS_STATUS_Q.values}
            unit={" Var"}
          ></LiveChartExample>
        }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flex: 1,
  },
});

export default InverterScreen;
