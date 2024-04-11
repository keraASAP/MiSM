import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import InfoParameterRow from "../../components/InfoParameterRow";

import { useSettings } from "../../settings/Settings";

import {
  circleSize,
  circleRadius,
  lineRadius,
  middleCircle,
  additionalCirclesArray,
} from "../../data/circlesData";

const DashboardScreen = () => {
  const navigation = useNavigation();

  const { islandWork, arrows, liveData } = useSettings();

  for (let additionalCircle of additionalCirclesArray) {
    additionalCircle.arrowDirection = arrows[additionalCircle.text].direction;
  }

  const calculatePosition = (index, totalCircles, radius) => {
    const startAngle = -Math.PI / 2;
    const angle = startAngle + (index / totalCircles) * 2 * Math.PI;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  const totalP =
    Object.keys(liveData).length === 0
      ? 0
      : liveData.PAC_Pa.values[liveData.PAC_Pa.values.length - 1] +
        liveData.PAC_Pb.values[liveData.PAC_Pb.values.length - 1] +
        liveData.PAC_Pc.values[liveData.PAC_Pc.values.length - 1];

  const totalQ =
    Object.keys(liveData).length === 0
      ? 0
      : liveData.PAC_Qa.values[liveData.PAC_Qa.values.length - 1] +
        liveData.PAC_Qb.values[liveData.PAC_Qb.values.length - 1] +
        liveData.PAC_Qc.values[liveData.PAC_Qc.values.length - 1];

  return (
    <View style={[styles.mainContainer]}>
      {Object.keys(liveData).length === 0 ? (
        <ActivityIndicator />
      ) : (
        <View style={[styles.container]}>
          <TouchableOpacity
            style={[styles.circle]}
            onPress={() => {
              navigation.navigate(middleCircle.text);
            }}
          >
            {middleCircle.icon}
          </TouchableOpacity>

          <View style={styles.additionalCirclesContainer}>
            {additionalCirclesArray.map((circle, index) => {
              const position = calculatePosition(
                index,
                additionalCirclesArray.length,
                circleRadius
              );
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.circle,
                    styles.additionalCircle,
                    {
                      left: position.x - circleSize / 2,
                      top: position.y,
                    },
                  ]}
                  onPress={() => {
                    navigation.navigate(circle.text);
                  }}
                >
                  {circle.icon}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Lines and arrows */}
          {additionalCirclesArray.map((circle, index) => {
            const position = calculatePosition(
              index,
              additionalCirclesArray.length,
              lineRadius
            );
            return (
              <View
                key={index}
                style={[
                  styles.line,
                  {
                    left: position.x + circleSize * 2 - 15,
                    top: position.y + circleSize / 2 - 1,
                    transform: [
                      {
                        rotate: `${
                          90 + (index * 360) / additionalCirclesArray.length
                        }deg`,
                      },
                    ],
                  },
                ]}
              >
                <View
                  style={[
                    styles.arrow,
                    circle.arrowDirection == `none`
                      ? styles.arrowInvisible
                      : circle.arrowDirection == `inside`
                      ? styles.arrowFacingInside
                      : styles.arrowFacingOutside,
                  ]}
                />
              </View>
            );
          })}

          <View style={styles.summaryContainer}>
            <InfoParameterRow
              name={`Tryb pracy`}
              value={`${islandWork ? `wyspowy` : `synchroniczny`}`}
              dashboard={true}
            ></InfoParameterRow>

            <InfoParameterRow
              name={`${totalP >= 0 ? "Pobierana" : "Wysyłana"} moc czynna`}
              value={`${(Math.abs(Math.floor(totalP)) / 1000).toFixed(2)} kW`}
              dashboard={true}
            ></InfoParameterRow>
            <InfoParameterRow
              name={`${totalQ >= 0 ? "Pobierana" : "Wysyłana"} moc bierna`}
              value={`${(Math.abs(Math.floor(totalQ)) / 1000).toFixed(2)} kVar`}
              dashboard={true}
            ></InfoParameterRow>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 180,
  },
  summaryContainer: {
    width: "80%",
    marginBottom: 83,
  },
  circle: {
    width: circleSize,
    height: circleSize,
    borderWidth: 2,
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
    elevation: 5,
    shadowColor: "#047AF8",
  },
  additionalCirclesContainer: {
    position: "absolute",
  },
  additionalCircle: {
    position: "absolute",
  },
  line: {
    position: "absolute",
    width: 24,
    height: 2,
    backgroundColor: "#6FB5FF",
  },
  arrow: {
    position: "absolute",
    top: -7,
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderRightWidth: 16,
    borderBottomWidth: 8,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#047AF8",
  },
  arrowFacingInside: {
    left: 5,
    transform: [{ rotate: "180deg" }],
  },
  arrowFacingOutside: {
    left: 3,
  },
  arrowInvisible: {
    borderRightColor: "transparent",
  },
});

export default DashboardScreen;
