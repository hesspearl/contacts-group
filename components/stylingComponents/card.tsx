import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  ImageSourcePropType,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Title from "./title";
import colors from "../../colors";
import Picture from "./picture";

type props = {
  uri: ImageSourcePropType;
  onPress: Function;
  name: string;
  select: boolean;
};

export default function card({ uri, name, onPress, select }: props) {
  // onPress execute pressHandler in body component
  // select get true/ false when select contact
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Picture uri={uri} size={50} />
        <View style={{ marginHorizontal: 10 }}>
          <Title>{name}</Title>
        </View>
      </View>

      <TouchableOpacity onPress={() => onPress()}>
        {!select ? (
          <View style={styles.circleButton} />
        ) : (
          <View style={{ ...styles.circleButton, backgroundColor: colors.btn }}>
            <Ionicons name="ios-checkmark" size={24} color="black" />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.background,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },

  circleButton: {
    width: 30,
    height: 30,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.search,
    alignItems: "center",
  },
});
