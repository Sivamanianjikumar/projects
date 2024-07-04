
import { View,Text,TouchableOpacity,FlatList } from "react-native";

import React, { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";

import GlobalApi from "../Utils/GlobalApi";

import BusinessListItem from "./BusinessListItem";
import Colors from "../Utils/Colors";
import PageHeading from "../../Components/PageHeading";
export default function BusinessListByCategoryScreen(){
    const param=useRoute().params;
    const navigation=useNavigation();
    const [businessList,setBussinessList]=useState([]);

    useEffect(()=>{
       param&&getBusinessByCategory()
    },[param])

    const getBusinessByCategory=()=>{
        GlobalApi.getBusinessListByCategory(param.category)
        .then(resp=>{
            setBussinessList(resp.businessLists);
        })
    }
    return(
        <View style={{padding:20,paddingTop:30}}>
            <PageHeading title={param.category}></PageHeading>
          {businessList?.length>0? <FlatList
            data={businessList}
            style={{marginTop:15}}
            renderItem={({item,index})=>(
                <BusinessListItem business={item}></BusinessListItem>
            )}
            ></FlatList>:
            <Text style={{fontSize:20,
            color:Colors.GRAY,textAlign:'center',marginTop:'20%'}}>No Business Found</Text>}
        </View>
    )
}