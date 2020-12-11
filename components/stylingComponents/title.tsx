import React from "react";
import { Text, StyleSheet } from "react-native";

type props = {
  children: string;
};

export default function title({ children }: props) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});
