import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import ExpandableElement from "../../components/ExpandableElement";
import InfoParameterRow from "../../components/InfoParameterRow";
import LiveChartExample from "../../components/LiveChart";

import { useSettings } from "../../settings/Settings";

const GridScreen = () => {
  const { liveData } = useSettings();

  return (
    <ScrollView style={styles.container}>
      <ExpandableElement
        title="Aktualne parametry"
        initialHeight={260}
        expandableContent={
          <View>
            <InfoParameterRow
              name="Częstotliwość"
              value={`${liveData.PAC_FQ.values[
                liveData.PAC_FQ.values.length - 1
              ].toFixed(2)} ${liveData.PAC_FQ.unit}`}
            ></InfoParameterRow>
            <InfoParameterRow
              name="Współczynnik mocy"
              value={
                liveData.PAC_PFa.values[liveData.PAC_PFa.values.length - 1] > 1
                  ? `----`
                  : `${(
                      (liveData.PAC_PFa.values[
                        liveData.PAC_PFa.values.length - 1
                      ] +
                        liveData.PAC_PFb.values[
                          liveData.PAC_PFb.values.length - 1
                        ] +
                        liveData.PAC_PFc.values[
                          liveData.PAC_PFc.values.length - 1
                        ]) /
                      3
                    ).toFixed(2)}`
              }
            ></InfoParameterRow>
            <InfoParameterRow
              name="Współczynnik migotania światła"
              value={`${(
                (liveData.PAC_Pst_a.values[
                  liveData.PAC_Pst_a.values.length - 1
                ] +
                  liveData.PAC_Pst_b.values[
                    liveData.PAC_Pst_b.values.length - 1
                  ] +
                  liveData.PAC_Pst_c.values[
                    liveData.PAC_Pst_c.values.length - 1
                  ]) /
                3
              ).toFixed(2)}`}
            ></InfoParameterRow>
            <InfoParameterRow
              name="Współczynnik harmonicznych prądu"
              value={
                liveData.PAC_THDS_Ia.values[
                  liveData.PAC_THDS_Ia.values.length - 1
                ] > 1
                  ? `----`
                  : `${(
                      (liveData.PAC_THDS_Ia.values[
                        liveData.PAC_THDS_Ia.values.length - 1
                      ] +
                        liveData.PAC_THDS_Ib.values[
                          liveData.PAC_THDS_Ib.values.length - 1
                        ] +
                        liveData.PAC_THDS_Ic.values[
                          liveData.PAC_THDS_Ic.values.length - 1
                        ]) /
                      3
                    ).toFixed(2)} ${liveData.PAC_THDS_Ia.unit}`
              }
            ></InfoParameterRow>
            <InfoParameterRow
              name="Współczynnik harmonicznych napięcia"
              value={`${(
                (liveData.PAC_THDS_Vab.values[
                  liveData.PAC_THDS_Vab.values.length - 1
                ] +
                  liveData.PAC_THDS_Vbc.values[
                    liveData.PAC_THDS_Vbc.values.length - 1
                  ] +
                  liveData.PAC_THDS_Vca.values[
                    liveData.PAC_THDS_Vca.values.length - 1
                  ]) /
                3
              ).toFixed(2)} ${liveData.PAC_THDS_Vab.unit}`}
            ></InfoParameterRow>
          </View>
        }
      />
      <ExpandableElement
        title="Wykres częstotliwości"
        initialHeight={335}
        expandableContent={
          <LiveChartExample
            liveData={liveData.PAC_FQ.values}
            unit={"Hz"}
          ></LiveChartExample>
        }
      />
      <ExpandableElement
        title="Wykres wsp. harm. napięcia"
        initialHeight={335}
        expandableContent={
          <LiveChartExample
            liveData={liveData.PAC_THDS_Vab.values
              .map((item, index) => item + liveData.PAC_THDS_Vbc.values[index])
              .map((item, index) => item + liveData.PAC_THDS_Vca.values[index])
              .map((item, index) => item / 3)}
            unit={"%"}
            decimals={2}
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

export default GridScreen;
