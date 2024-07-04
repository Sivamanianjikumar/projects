import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../Utils/Colors";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
export default function BusinessListItem({ business, booking }) {

    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.container} 
            onPress={() => navigation.navigate('business-detail', {
                business: business
            })
        }>
            <Image 
                source={{ uri: business?.images[0]?.url }}
                style={styles.image} 
            />
            <View style={styles.subContainer}>
                <Text style={{ color: Colors.GRAY, fontSize: 15 }}>{business.contactPerson}</Text>
                <Text style={{ fontSize: 18 }}>{business.name}</Text>

                {/* Display the booking status if available */}
                {booking?.id && (
                    <Text style={styles.bookingStatus}><AntDesign name="calendar" size={24} color={Colors.PRIMARY} />
                        {`  ${booking.bookingStatus} on ${booking.date}`}
                    </Text>
                   
                )}

                <Text style={{ color: Colors.GRAY, fontSize: 16 }}>
                    <MaterialIcons name="location-on" size={24} color={Colors.GRAY} />
                    {business.address}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginBottom: 15,
        flexDirection: 'row',
        gap: 10
    },
    subContainer: {
        display: 'flex',
        gap: 8
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 15
    },
    bookingStatus: {
        color: Colors.PRIMARY,       // Text color for booking status
        fontSize: 16,              // Font size for booking status
        backgroundColor: Colors.PRIMARY_lIGHT, // Background color for booking status
        paddingVertical: 4,        // Vertical padding
        paddingHorizontal: 8,      // Horizontal padding
        borderRadius: 5,           // Rounded corners
        overflow: 'hidden',        // Ensures text is contained within the rounded corners
        alignSelf: 'flex-start'    // Aligns the status to the start of its container
    }
});
