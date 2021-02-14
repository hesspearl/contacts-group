import React, { useEffect, useReducer } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ImageSourcePropType,
} from "react-native";
import Card from "./stylingComponents/card";
import Selected from "./selected";
import colors from "./stylingComponents/colors";
import * as Contacts from "expo-contacts";
import { reducer } from "./reducer";

type Image = { uri?: string };

interface ContactArray {
  id: string;
  image?: Image;
  name: string;
}

interface props {
  //array from app component
  contacts: ContactArray[];
  //array from header component
  search: ContactArray[];
  groupLength: Function;
}

export default function Body({ contacts, search, groupLength }: props) {
  const [state, dispatch] = useReducer(reducer, {
    //items => array of selected contact group
    //selected=> id of selected contact : true(when selected)/false(when not selected)
    //contactsArray=> an array of all phone contacts & return an array if search results exist
    items: [],
    selected: {},
    contactsArray: [],
  });

  useEffect(() => {
    // search array
    if (search) {
      dispatch({ type: "array", value: search });
    }

    //when there is contacts array and empty search array
    if (contacts && !search.length)
      dispatch({ type: "array", value: contacts });
    // send group array length to app component
    groupLength(state.items.length);
  }, [search, contacts, state.items]);

  // select contact handler
  const pressHandler = (item: ContactArray): void => {
    //if selected contact id dont exist
    if (!state.selected[item.id]) {
      dispatch({ type: "add", value: item, selected: item.id });
    }
    //if selected contact id  exist
    if (state.selected[item.id]) {
      dispatch({ type: "remove", selected: item.id });
    }
  };

  // function is handle the press in selected component
  const remove = (id: string): void =>
    dispatch({ type: "remove", selected: id });

  return (
    <View style={{ flex: 1 }}>
      {/*  when select contact it show picture and name on top of ScrollView */}
      {state.items && <Selected onPress={remove} data={state.items} />}
      <View style={styles.lettersBar}>{/* <Title>A</Title> */}</View>

      <ScrollView>
        {state.contactsArray?.map((item, index) => (
          <View key={index}>
            <Card
              onPress={() => pressHandler(item)}
              uri={item.image?.uri}
              name={item.name}
              select={state.selected[item.id] ?? false}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  lettersBar: {
    width: "100%",
    height: 30,
    backgroundColor: colors.background,
    borderTopWidth: 0.5,
    borderColor: colors.search,
    paddingLeft: 20,
    marginBottom: 10,
  },
});
