import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, KeyboardAvoidingView, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import CalendarPicker from "react-native-calendar-picker";
import { TextInput } from "react-native-gesture-handler";
import moment from "moment/moment";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "@clerk/clerk-expo";
import GlobalApi from "../Utils/GlobalApi";
import Colors from "../Utils/Colors";
import Heading from "../../Components/Heading";

export default function BookingModal({ businessId, hideModal }) {
    const navigation = useNavigation();
    const { user } = useUser();
    const [selectedTime, setSelectedTime] = useState(null);
    const [timeList, setTimeList] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [note, setNote] = useState("");

    useEffect(() => {
        generateTimeSlots();
    }, []);

    // Generates the time slots for booking
    const generateTimeSlots = () => {
        const timeList = [];
        for (let i = 8; i < 12; i++) {
            timeList.push({ time: `${i}:00 AM` });
            timeList.push({ time: `${i}:30 AM` });
        }
        timeList.push({ time: `12:00 PM` });
        timeList.push({ time: `12:30 PM` });
        for (let i = 1; i <= 7; i++) {
            timeList.push({ time: `${i}:00 PM` });
            timeList.push({ time: `${i}:30 PM` });
        }
        setTimeList(timeList);
    };

    // Handle booking creation
    const createNewBooking = () => {
        if (!selectedTime || !selectedDate) {
            ToastAndroid.show('Please select Date and Time', ToastAndroid.LONG);
            return;
        }
        const data = {
            userName: user?.fullName,
            userEmail: user?.primaryEmailAddress.emailAddress,
            time: selectedTime,
            date: moment(selectedDate).format('DD-MMM-yyyy'),
            businessId: businessId,
            note: note // Include the note in the booking data
        };
        GlobalApi.createBooking(data).then(resp => {
            console.log("Resp", resp);
            ToastAndroid.show('Booking Created Successfully!', ToastAndroid.LONG);
            hideModal();
        }).catch(error => {
            console.error("Booking Error:", error);
            ToastAndroid.show('Booking Failed. Please try again.', ToastAndroid.LONG);
        });
    };

    return (
        <ScrollView>
            <KeyboardAvoidingView style={{ padding: 20 }} behavior="padding">
                <TouchableOpacity style={styles.backButton} onPress={hideModal}>
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                    <Text style={styles.backButtonText}>Booking</Text>
                </TouchableOpacity>

                <Heading text={'Select Date'} />
                <View style={styles.calendarContainer}>
                    <CalendarPicker
                        onDateChange={setSelectedDate}
                        width={340}
                        minDate={Date.now()}
                        todayBackgroundColor={Colors.BLACK}
                        todayTextStyle={{ color: Colors.WHITE }}
                        selectedDayColor={Colors.PRIMARY}
                        selectedDayTextColor={Colors.WHITE}
                    />
                </View>

                <View style={{ marginTop: 20 }}>
                    <Heading text={'Select Time Slot'} />
                    <FlatList
                        data={timeList}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={{ marginRight: 10 }} onPress={() => setSelectedTime(item.time)}>
                                <Text style={selectedTime === item.time ? styles.selectedTime : styles.unSelectedTime}>
                                    {item.time}
                                </Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>

                <View style={{ paddingTop: 20 }}>
                    <Heading text={'Any Suggestion Note'} />
                    <TextInput
                        placeholder="Note"
                        style={styles.noteTextArea}
                        numberOfLines={4}
                        multiline={true}
                        value={note}
                        onChangeText={setNote}
                    />
                </View>

                <TouchableOpacity style={{ marginTop: 15 }} onPress={createNewBooking}>
                    <Text style={styles.confirmBtn}>Confirm & Book</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    backButtonText: {
        fontSize: 25,
        marginLeft: 10
    },
    calendarContainer: {
        backgroundColor: Colors.PRIMARY_LIGHT,
        padding: 20,
        borderRadius: 15
    },
    selectedTime: {
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 99,
        paddingHorizontal: 18,
        color: Colors.WHITE,
        backgroundColor: Colors.PRIMARY
    },
    unSelectedTime: {
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 99,
        paddingHorizontal: 18,
        color: Colors.PRIMARY
    },
    noteTextArea: {
        borderWidth: 1,
        borderRadius: 15,
        textAlignVertical: 'top',
        padding: 20,
        fontSize: 16,
        borderColor: Colors.PRIMARY_LIGHT
    },
    confirmBtn: {
        textAlign: 'center',
        fontSize: 17,
        backgroundColor: Colors.PRIMARY,
        color: Colors.WHITE,
        padding: 13,
        borderRadius: 99,
        elevation: 2
    }
});
