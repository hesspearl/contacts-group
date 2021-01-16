import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import Header from "./components/header";
import Body from "./components/body";
import * as Contacts from "expo-contacts";

type Image={uri?:string;}

type ContactsData={
  id:string;
  image?:Image
  name:string;
  
  
  }
type TypesContacts = Contacts.Contact & ContactsData

export default function App() {
  //contacts array
  const [contacts, setContacts] = useState<TypesContacts[]>([]);
  //search array that sent from header
  const [search, setSearch] = useState<ContactsData[]>([]);
  // length of selected group array
  const [groupLength, setGroupLength] = useState<number>(0);

 

  useEffect(() => {
    (async () => {
      //get phone contacts permission
      const { status } = await Contacts.requestPermissionsAsync();

      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.Image],
          sort: Contacts.SortTypes.FirstName,
        });

        
        setContacts(data);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor="black" />
      <Header
        contacts={contacts}
        setSearch={setSearch}
        total={contacts?.length}
        groupLength={groupLength}
      />
      <Body groupLength={setGroupLength} search={search} contacts={contacts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 50,
  },
});
