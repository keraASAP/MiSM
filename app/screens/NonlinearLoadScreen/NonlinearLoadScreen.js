import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import ExpandableElement from "../../components/ExpandableElement";
import InfoParameterRow from "../../components/InfoParameterRow";
import LiveChartExample from "../../components/LiveChart";

import { useSettings } from "../../settings/Settings";

const NonlinearLoadScreen = () => {
  const { liveData, nonLinearLoadPercentage } = useSettings();

  return (
    <ScrollView style={styles.container}>
      <ExpandableElement
        title="Aktualne parametry"
        initialHeight={145}
        expandableContent={
          <View>
            <InfoParameterRow
              name="Nastawa obiążenia nieliniowego"
              value={`${nonLinearLoadPercentage} %`}
            ></InfoParameterRow>

            <InfoParameterRow
              name="Moc czynna"
              value={`${(
                liveData.PAC_Pa.values[liveData.PAC_Pa.values.length - 1] +
                liveData.PAC_Pb.values[liveData.PAC_Pb.values.length - 1] +
                liveData.PAC_Pc.values[liveData.PAC_Pc.values.length - 1]
              ).toFixed(2)} ${liveData.PAC_Pa.unit}`}
            ></InfoParameterRow>

            <InfoParameterRow
              name="Moc bierna"
              value={`${(
                liveData.PAC_Qa.values[liveData.PAC_Qa.values.length - 1] +
                liveData.PAC_Qb.values[liveData.PAC_Qb.values.length - 1] +
                liveData.PAC_Qc.values[liveData.PAC_Qc.values.length - 1]
              ).toFixed(2)} ${liveData.PAC_Qa.unit}`}
            ></InfoParameterRow>
          </View>
        }
      />

      <ExpandableElement
        title="Wykres mocy czynnej"
        initialHeight={335}
        expandableContent={
          <LiveChartExample
            liveData={liveData.PAC_Pa.values
              .map((item, index) => item + liveData.PAC_Pb.values[index])
              .map((item, index) => item + liveData.PAC_Pc.values[index])}
            unit={" W"}
          ></LiveChartExample>
        }
      />

      <ExpandableElement
        title="Wykres mocy biernej"
        initialHeight={335}
        expandableContent={
          <LiveChartExample
            liveData={liveData.PAC_Qa.values
              .map((item, index) => item + liveData.PAC_Qb.values[index])
              .map((item, index) => item + liveData.PAC_Qc.values[index])}
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

export default NonlinearLoadScreen;
