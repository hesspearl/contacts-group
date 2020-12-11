import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import Picture from "./stylingComponents/picture";
import { AntDesign } from "@expo/vector-icons";

type props = {
  data: Array<{
    id: number;
    image: object;
    name: string;
  }>;
  onPress: Function;
};
export default function selected({ data, onPress }: props) {
  // onPress execute remove function from body component

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        renderItem={(item) => {
          return (
            <View style={styles.container}>
              <TouchableOpacity
                style={{ position: "absolute", right: 0, top: 0, zIndex: 1 }}
                onPress={() => onPress(item.item.id)}
              >
                <View style={styles.close}>
                  <AntDesign name="close" size={15} color="white" />
                </View>
              </TouchableOpacity>

              <Picture size={60} uri={item.item.image} />
              <View style={{ width: 60, alignItems: "center" }}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.text}
                >
                  {item.item.name}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    marginTop: 5,
    fontSize: 11,
  },
  close: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: "#abaaaa",
    alignItems: "center",
    justifyContent: "center",
  },
});
