import { View,Text,Image, StyleSheet, TouchableOpacity } from "react-native";

import React from "react";
import Colors from "../Utils/Colors";
import { useNavigation } from "@react-navigation/native";

export default function BusinessListItemSmall({business}){
    const navigation=useNavigation();
    return(
        <TouchableOpacity style={styles.container}
        onPress={()=>navigation.push('business-detail',{
            business:business
        })}>
            <Image
            source={{uri:business?.images[0]?.url}}
            style={styles.image}
            ></Image>
            <View style={styles.infoContainer}>
        <Text style={{fontSize:17}}>{business?.name}</Text>
        <Text style={{fontSize:13,color:Colors.BLACK}}>{business?.contactPerson}</Text>
        <Text style={{
            fontSize:10,
            padding:3,
            color:Colors.PRIMARY,
            backgroundColor:Colors.PRIMARY_lIGHT,
            alignSelf:'flex-start',
            paddingHorizontal:7
        }}>{business?.category?.name}</Text>

        </View>
     </TouchableOpacity>
     
    )
}
const styles=StyleSheet.create({
    image:{
        width:160,
        height:100,
        borderRadius:10
    },
    infoContainer:{
        padding:7,
        display:'flex',
        gap:3
    },
    container:{
         padding:10,
         backgroundColor:Colors.WHITE,
         borderRadius:10
    }
})