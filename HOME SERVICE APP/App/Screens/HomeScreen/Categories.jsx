import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../Utils/GlobalApi";
import Heading from "../../Components/Heading";
import Colors from "../Utils/Colors";
import { useNavigation } from "@react-navigation/native";

export default function Categories() {
  const [categories, setCategories] = useState([]);
   const navigation=useNavigation()
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    GlobalApi.getCategories().then((resp) => {
      console.log(resp);
      setCategories(resp?.categories);
    });
  };

  return (
    <View style={{ marginTop: 10 }}>
      <Heading text={'Categories'} isViewAll={true}></Heading>
      <FlatList
        data={categories}
        horizontal={true} // Enable horizontal scrolling
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.container}
          onPress={()=>navigation.push('business-list',{
            category:item.name
          })}>
            <View style={styles.iconContainer}>
              <Image
                source={{ uri: item?.icon?.url }}
                style={{ width: 30, height: 30 }}
              />
            </View>
            <Text style={{ marginTop: 5 }}>{item?.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 17,
    borderRadius: 99,
  },
  container: {
    alignItems: 'center',
    marginHorizontal: 10, // Add some margin between items
  },
});
