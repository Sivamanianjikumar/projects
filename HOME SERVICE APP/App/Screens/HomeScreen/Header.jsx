import { View,Text,Image,TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { StyleSheet } from "react-native";
import Colors from "../Utils/Colors";
import { FontAwesome5 } from '@expo/vector-icons';
export default function Header(){
    const {user,isLoading}=useUser();
    return user&&(
        <View style={styles.container}>
            {/* profile section */}
            <View style={styles.profileMainContainer}>
            <View style={styles.profileContainer}>
                <Image source={{uri:user?.imageUrl}}
                style={styles.userImage}></Image>
                <View>
                    <Text style={{color:Colors.WHITE}}>Welcome</Text>
                    <Text style={{color:Colors.WHITE,
                        fontSize:20}}>{user?.fullName}</Text>
                </View>
            </View>
            <View style={styles.profileMainContainer}>
                <FontAwesome5 name="bookmark" size={24} color="black" />
            </View>
            </View>
            {/* Search bar section */}
            <View style={styles.serchBarContainer}>
                <TextInput placeholder="Search" 
                style={styles.textInput}>
                </TextInput>
                <FontAwesome5 name="search" style={styles.searchbtn}  size={24} color={Colors.PRIMARY} />
            </View>
        </View>
        
    )
}

const styles=StyleSheet.create({
    container:{
      padding:20,
      paddingTop:40,
      backgroundColor:Colors.PRIMARY,
      borderBottomRightRadius:25,
      borderBottomLeftRadius:25
    },
    profileMainContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        justifyContent:'space-between'
    },
    profileContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:10
    },
    userImage:{
        width:45,
        height:45,
        borderRadius:99
    },
    textInput:{
        padding:7,
        paddingHorizontal:16,
        backgroundColor:Colors.WHITE,
        borderRadius:8,
        width:'85%',
        fontSize:16
    },
    serchBarContainer:{
        marginTop:15,
        display:'flex',
        flexDirection:'row',
        gap:10,
        marginBottom:10
    },
    searchbtn:{
        backgroundColor:Colors.WHITE,
        padding:10,
        borderRadius:8
    }
})