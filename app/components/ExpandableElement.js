import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

const ExpandableElement = ({ title, initialHeight, expandableContent }) => {
  const [isExpanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    setExpanded(!isExpanded);
    Animated.timing(animation, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const containerHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, initialHeight],
  });

  return (
    <View style={styles.expandableContainer}>
      <TouchableOpacity onPress={toggleExpand}>
        <View style={styles.expandableHeader}>
          <Text style={styles.expandableHeaderText}>{title}</Text>
          {isExpanded ? (
            <AntDesign name="up" size={16} color="black" />
          ) : (
            <AntDesign name="down" size={16} color="black" />
          )}
        </View>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.expandableContent,
          isExpanded && styles.expandedContent,
          {
            height: containerHeight,
            overflow: "hidden",
          },
        ]}
      >
        {expandableContent}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  expandableContainer: {
    paddingHorizontal: 15,
    marginTop: 5,
  },
  expandableHeader: {
    padding: 15,
    paddingHorizontal: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#D1D1D1",
  },
  expandableHeaderText: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 16,
  },
  expandableContent: {
    paddingHorizontal: 40,
  },
  expandedContent: {
    borderBottomWidth: 1,
    borderBottomColor: "#D1D1D1",
  },
});

export default ExpandableElement;
