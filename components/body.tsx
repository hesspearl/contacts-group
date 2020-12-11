import React, { useEffect, useReducer } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Card from "./stylingComponents/card";
import Selected from "./selected";
import colors from "../colors";

interface props {
  //array from app component
  contacts: Array<object>;
  //array from header component
  search: Array<object>;
  groupLength: Function;
}

type state = {
  items: Array<object>;
  contactsArray: Array<object>;
  selected: {
    [key: number]: boolean;
  };
};

type Action =
  | { type: "array"; value: Array<object> }
  | { type: "add"; value: object; selected: number }
  | { type: "remove"; selected: number };

const reducer = (state: state, action: Action): state => {
  switch (action.type) {
    case "add":
      //add the checked contact to the array
      //and return true to selected

      return {
        ...state,
        items: [...state.items, action.value],
        selected: {
          ...state.selected,
          [action.selected]: true,
        },
      };

    case "remove":
      // remove the unchecked contact from the array
      let removeItem = state.items.map((i) => i.id).indexOf(action.selected);
      state.items.splice(removeItem, 1);
      //and return false to selected
      return {
        ...state,
        items: [...state.items],
        selected: {
          ...state.selected,
          [action.selected]: false,
        },
      };

    case "array":
      // saved contacts array or search array

      return {
        ...state,
        contactsArray: [...action.value],
      };
  }
};

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
  const pressHandler = (item: { id: number }) => {
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
  const remove = (id: number) => dispatch({ type: "remove", selected: id });

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
              uri={item.image}
              name={item.name}
              select={state.selected[item.id] ? state.selected[item.id] : false}
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
