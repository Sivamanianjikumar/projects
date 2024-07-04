import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../Utils/GlobalApi";

import Heading from "../../Components/Heading";
export default function Slider() {
  const [slider, setSlider] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSliderData = async () => {
    try {
      const resp = await GlobalApi.getSlider();
      console.log("resp", resp.sliders);
      setSlider(resp?.sliders || []);
    } catch (error) {
      console.error("Error fetching sliders:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSliderData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error fetching sliders: {error.message}</Text>;
  }

  const renderItem = ({ item }) => (
    <View style={styles.sliderContainer}>
      <Image source={{ uri: item.image.url }} style={styles.sliderImage} />
      
    </View>
  );

  return (
    <View>
      <Heading text={'Offers For you'}></Heading>
      <FlatList
        data={slider}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    marginBottom: 10,
    alignItems: 'center', // Center the content horizontally
  },
  sliderImage: {
    width: 270,
    height: 150,
    borderRadius: 20,
    marginRight:15

  },
  
});
