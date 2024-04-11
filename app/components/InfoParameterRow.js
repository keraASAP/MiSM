import { View, Text, StyleSheet } from "react-native";

const InfoParameterRow = ({ name, value, dashboard = false }) => {
  return (
    <View style={styles.container}>
      {dashboard ? (
        <Text style={styles.text}>{name} </Text>
      ) : (
        <Text style={[styles.text, styles.textName]}>{name} </Text>
      )}
      <Text style={[styles.text, styles.blueText]}> {value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
  },
  textName: {
    width: 210,
  },
  blueText: {
    color: "#047AF8",
  },
});

export default InfoParameterRow;
