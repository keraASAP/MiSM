import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import ExpandableElement from "../../components/ExpandableElement";
import InfoParameterRow from "../../components/InfoParameterRow";
import LiveChartExample from "../../components/LiveChart";

import { useSettings } from "../../settings/Settings";

const SolarPanelScreen = () => {
  const { liveData } = useSettings();

  return (
    <ScrollView style={styles.container}>
      <ExpandableElement
        title="Aktualne parametry DC"
        initialHeight={120}
        expandableContent={
          <View>
            <InfoParameterRow
              name="Napięcie"
              value={`${liveData.FRONIUS_STATUS_DCV.values[
                liveData.FRONIUS_STATUS_DCV.values.length - 1
              ].toFixed(2)} ${liveData.FRONIUS_STATUS_DCV.unit}`}
            ></InfoParameterRow>
            <InfoParameterRow
              name="Prąd"
              value={`${liveData.FRONIUS_STATUS_DCA.values[
                liveData.FRONIUS_STATUS_DCA.values.length - 1
              ].toFixed(2)} ${liveData.FRONIUS_STATUS_DCA.unit}`}
            ></InfoParameterRow>
            <InfoParameterRow
              name="Moc"
              value={`${(
                liveData.FRONIUS_STATUS_DCA.values[
                  liveData.FRONIUS_STATUS_DCA.values.length - 1
                ] *
                liveData.FRONIUS_STATUS_DCV.values[
                  liveData.FRONIUS_STATUS_DCV.values.length - 1
                ]
              ).toFixed(2)} W`}
            ></InfoParameterRow>
          </View>
        }
      />
      <ExpandableElement
        title="Wykres napięcia"
        initialHeight={335}
        expandableContent={
          <LiveChartExample
            liveData={liveData.FRONIUS_STATUS_DCV.values}
            unit={" V"}
          ></LiveChartExample>
        }
      />
      <ExpandableElement
        title="Wykres prądu"
        initialHeight={335}
        expandableContent={
          <LiveChartExample
            liveData={liveData.FRONIUS_STATUS_DCA.values}
            decimals={3}
            unit={" A"}
          ></LiveChartExample>
        }
      />
      <ExpandableElement
        title="Wykres mocy"
        initialHeight={335}
        expandableContent={
          <LiveChartExample
            liveData={liveData.FRONIUS_STATUS_DCV.values.map(
              (item, index) => item * liveData.FRONIUS_STATUS_DCA.values[index]
            )}
            unit={" W"}
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

export default SolarPanelScreen;
