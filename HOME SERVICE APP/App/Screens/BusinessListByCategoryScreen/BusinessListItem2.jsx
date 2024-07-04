import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colors from "../Utils/Colors"; // Ensure you import your colors

export default function BusinessListItem({ business, booking }) {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.businessName}>{business?.name || "Unknown Business"}</Text>
            <Text style={styles.bookingDetails}>
                Date: {booking.date}
            </Text>
            <Text style={styles.bookingDetails}>
                Time: {booking.time}
            </Text>
            {booking.note && (
                <Text style={styles.bookingDetails}>
                    Note: {booking.note}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        padding: 15,
        marginVertical: 8,
        backgroundColor: Colors.LIGHT_GRAY,
        borderRadius: 10
    },
    businessName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.DARK_GRAY
    },
    bookingDetails: {
        fontSize: 16,
        color: Colors.GRAY,
        marginTop: 5
    }
});
