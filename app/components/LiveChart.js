import React, { useState } from "react";
import { View, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const LiveChartExample = ({
  liveData,
  unit,
  decimals = 2,
  additionalLines = [],
}) => {
  const [isFromZero, setIsFromZero] = useState(true);
  const toggleIsFromZero = () => {
    setIsFromZero(!isFromZero);
  };

  const datasets = [
    {
      data: liveData,
      color: () => "#047AF8",
    },
  ];

  for (let additionalLine of additionalLines) {
    datasets.push({
      data: Array(liveData.length).fill(additionalLine),
      color: () => "#fa4848",
      strokeWidth: 0,
      withDots: false,
    });
  }

  const chartConfig = {
    backgroundGradientFrom: "white",
    backgroundGradientTo: "white",
    decimalPlaces: decimals,
    color: () => `black`,
    propsForDots: {
      r: "4",
      strokeWidth: "1",
      stroke: "#047AF8",
    },
    propsForLabels: {
      scale: 0.8,
    },
  };

  return (
    <TouchableOpacity onPress={toggleIsFromZero}>
      <View style={styles.container}>
        <LineChart
          data={{
            datasets,
          }}
          withShadow={false}
          fromZero={liveData.every((x) => x == 0) ? false : isFromZero}
          width={0.65 * screenWidth}
          height={230}
          yAxisSuffix={unit}
          chartConfig={chartConfig}
          bezier
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 5,
    paddingTop: 40,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default LiveChartExample;
