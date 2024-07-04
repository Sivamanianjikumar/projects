import { View, Text, Image, TouchableOpacity, FlatList, Alert } from "react-native";
import React from "react";
import { useUser, useAuth } from "@clerk/clerk-expo";
import Colors from "../Utils/Colors";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation for navigation

export default function ProfileScreen() {
    const { user } = useUser();
    const { signOut } = useAuth(); // Get the signOut function
    const navigation = useNavigation(); // Get the navigation object

    // Profile menu items
    const profileMenu = [
        { id: 1, name: 'Home', icon: 'home' },
        { id: 2, name: 'My Booking', icon: 'bookmark-sharp' },
        { id: 3, name: 'Contact Us', icon: 'mail' },
        { id: 4, name: 'LogOut', icon: 'log-out' }
    ];

    // Function to handle menu item click
    const handleMenuClick = (item) => {
        if (item.name === 'LogOut') {
            // Show confirmation dialog before logging out
            Alert.alert(
                "Confirm Logout",
                "Are you sure you want to log out?",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Logout Cancelled"),
                        style: "cancel"
                    },
                    { 
                        text: "Yes", 
                        onPress: () => {
                            signOut(); // Perform the signOut action if confirmed
                        }
                    }
                ],
                { cancelable: false }
            );
        } else if (item.name === 'Home') {
            navigation.navigate('home'); // Navigate to Home screen
        } 
        else if (item.name === 'My Booking') {
            navigation.navigate('booking'); // Navigate to Home screen
        } 
        else {
            // Handle other menu item clicks
            console.log(`Navigating to ${item.name}`);
        }
    };

    return (
        <View>
            <View style={{ padding: 20, paddingTop: 30, backgroundColor: Colors.PRIMARY }}>
                <Text style={{ fontSize: 30, color: Colors.WHITE }}>Profile</Text>
                <View style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20,
                }}>
                    <Image
                        source={{ uri: user.imageUrl }}
                        style={{ width: 90, height: 90, borderRadius: 99 }}
                    />
                    <Text style={{ fontSize: 20, marginTop: 8, color: Colors.WHITE }}>{user.fullName}</Text>
                    <Text style={{ fontSize: 18, marginTop: 8, color: Colors.WHITE }}>
                        {user?.primaryEmailAddress.emailAddress}
                    </Text>
                </View>
            </View>
            <View style={{ paddingTop: 60 }}>
                <FlatList
                    data={profileMenu}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={{
                                display: 'flex', 
                                flexDirection: 'row', 
                                alignItems: 'center',
                                marginBottom: 40,
                                paddingHorizontal: 50
                            }}
                            onPress={() => handleMenuClick(item)} // Handle click
                        >
                            <Ionicons name={item.icon} size={44} color={Colors.PRIMARY} />
                            <Text style={{ fontSize: 20 }}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString()} // Ensure unique keys
                />
            </View>
        </View>
    );
}
