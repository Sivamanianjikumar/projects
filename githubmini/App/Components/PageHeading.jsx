import { View,Text,TouchableOpacity } from "react-native";

import React from "react";
import { useNavigation,useRoute  } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

export default function PageHeading({title}){
    const navigation=useNavigation();
    return(
        <View>
            <TouchableOpacity style={{display:'flex',flexDirection:'row',gap:10,
        alignItems:'center'}}
        onPress={()=>navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
            <Text style={{fontSize:25}}>
                {title}</Text>
            </TouchableOpacity>
        </View>
    )
}