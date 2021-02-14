import React from "react";
import { View, Image, ImageSourcePropType, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type props = {
  uri:(string|undefined);
  size: number;
};
export default function picture({ uri, size }: props) {
  // style for picture
  return (
    <View style={{ ...styles.imageContainer, width: size, height: size }}>
      {uri ? (
        <Image
          style={{ width: size, height: size, borderRadius: 100 }}
          source={{uri :uri}}
        />
      ) : (
        <Ionicons name="md-person" size={30} color="white" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 100,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
  },
});
