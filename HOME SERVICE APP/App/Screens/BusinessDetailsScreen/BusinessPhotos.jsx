import { View,Text, FlatList, Image } from "react-native";

import React from "react";
import Heading from "../../Components/Heading";

export default function BusinessPhotos(business){
    return(
        <View>
            <Heading text={'Photos'}></Heading>
            <FlatList
             data={business.images}
             renderItem={({item})=>(
                <Image source={{uri:item.url}}
                style={{width:'100',height:120}}
                ></Image>
             )} 
            ></FlatList>
        </View>
    )
} 