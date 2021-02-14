import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Title from "./stylingComponents/title";
import Colors from "./stylingComponents/colors";

interface Contacts{
  name:( string| number)
}

type props = {
  total: number;
  setSearch: Function;
  contacts: Contacts[];
  groupLength: Number;
};
const Header:React.FC<props> = ({ total, setSearch, contacts, groupLength }: props) => {
  //input text handler, return search result and send it to parent component App
  const onChangeHandler = (text: string) :void => {
    //change text to upper case
    const searchText = text.toUpperCase();
    //filter the contacts array
    const data = contacts.filter((contact) => {
      //modify the names to upper case
      const name = contact.name?.toString().toUpperCase() ?? "" ;
      //then check if the text from input is match with names
      //in contacts by using includes
      return name.includes(searchText);
    });

    //send it to parents component with function props
    setSearch(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.button}>Cancel</Text>
        <View style={{ alignItems: "center" }}>
          <Title>Add Participants</Title>
          <Text style={{ color: "white" }}>
            {groupLength}/{total}
          </Text>
        </View>

        <Text style={styles.button}>Next</Text>
      </View>
      <View style={styles.search}>
        <AntDesign name="search1" size={24} color="white" />
        <TextInput
          style={{ marginHorizontal: 5, fontSize: 16, color: "black" }}
          placeholder="Search"
          placeholderTextColor="white"
          onChangeText={onChangeHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 130,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 10,
  },
  button: {
    fontSize: 16,
    color: Colors.btn,
    alignSelf: "center",
    // fontWeight:"bold"
  },

  search: {
    width: "90%",
    height: 40,
    backgroundColor: "#8d8d8d",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
    padding: 5,
    flexDirection: "row",
  },
});
export default Header;
