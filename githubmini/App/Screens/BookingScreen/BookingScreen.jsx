import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../Utils/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
import BusinessListItem from "../BusinessListByCategoryScreen/BusinessListItem";
import Colors from "../Utils/Colors"; // Ensure you import your colors

export default function BookingScreen() {
    const { user } = useUser();
    const [bookingList, setBookingList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        user && getUserBookings();
    }, [user]);

    const getUserBookings = () => {
        setLoading(true);
        GlobalApi.getUserBookings(user.primaryEmailAddress.emailAddress)
            .then(resp => {
                setBookingList(resp.bookings);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false); // Stop loading in case of an error
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>My Bookings</Text>
            
            {loading ? (
                <ActivityIndicator size="large" color={Colors.PRIMARY} />
            ) : (
                bookingList.length === 0 ? (
                    <View style={styles.noBookingsContainer}>
                        <Text style={styles.noBookingsText}>No Bookings Found</Text>
                    </View>
                ) : (
                    <FlatList
                        data={bookingList}
                        onRefresh={getUserBookings}
                        refreshing={loading}
                        renderItem={({ item, index }) => (
                            <BusinessListItem 
                                key={index}
                                business={item?.businessList}
                                booking={item}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    heading: {
        fontSize: 26,
        marginBottom: 10
    },
    noBookingsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noBookingsText: {
        fontSize: 18,
        color: Colors.GRAY // Adjust the color to match your design
    }
});
