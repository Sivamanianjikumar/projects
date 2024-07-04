import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Modal, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, Entypo } from '@expo/vector-icons';
import Colors from "../Utils/Colors";
import Heading from "../../Components/Heading";
import BookingModal from "./BookingModal";

export default function BusinessDetailsScreen() {
    const { params } = useRoute();
    const [business, setBusiness] = useState(null);
    const [isReadMore, setIsReadMore] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        if (params && params.business) {
            setBusiness(params.business);
        }
    }, [params]);

    const onMessageBtnClick = () => {
        Linking.openURL('mailto:' + business.email + "?subject=I am looking for your Service&body=Hi There,");
    };

    if (!business) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    const renderHeader = () => (
        <View>
            <TouchableOpacity style={styles.backBtnContainer} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-outline" size={24} color="white" />
            </TouchableOpacity>
            {business.images?.length > 0 && (
                <Image
                    source={{ uri: business.images[0].url }}
                    style={{ width: '100%', height: 300 }}
                />
            )}
            <View style={styles.infoContainer}>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{business?.name}</Text>
                <View style={styles.subContainer}>
                    <Text style={{ color: Colors.PRIMARY, fontSize: 20 }}>{business?.contactPerson}</Text>
                    <Text style={{ color: Colors.PRIMARY, backgroundColor: Colors.PRIMARY_LIGHT, padding: 5, borderRadius: 5, fontSize: 14 }}>{business?.category.name}</Text>
                </View>
                <Text>
                    <Entypo name="location" size={24} color="black" /> {business?.address}
                </Text>
                <View style={styles.divider}></View>
                <View>
                    <Heading text={'About'} />
                    <Text style={{ color: Colors.GRAY, lineHeight: 28, fontSize: 16 }} numberOfLines={isReadMore ? 20 : 5}>
                        {business.about}
                    </Text>
                    <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)}>
                        <Text style={{ color: Colors.PRIMARY, fontSize: 16 }}>{isReadMore ? 'Read Less' : 'Read More'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.divider}></View>
                <Heading text={'Photos'} />
            </View>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={business.images}
                numColumns={2}
                ListHeaderComponent={renderHeader}
                renderItem={({ item }) => (
                    <Image
                        source={{ uri: item.url }}
                        style={{ width: '100%', flex: 1, height: 120, margin: 7, borderRadius: 15 }}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.messageBtn} onPress={onMessageBtnClick}>
                    <Text style={styles.messageText}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bookingBtn} onPress={() => setShowModal(true)}>
                    <Text style={styles.bookingText}>Book Now</Text>
                </TouchableOpacity>
            </View>
            <Modal animationType="slide" visible={showModal}>
                <BookingModal businessId={business.id} hideModal={() => setShowModal(false)} />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    loadingText: {
        fontSize: 18,
        color: 'gray',
    },
    backBtnContainer: {
        position: 'absolute',
        zIndex: 10,
        padding: 20,
    },
    infoContainer: {
        padding: 20,
    },
    subContainer: {
        flexDirection: 'row',
        gap: 5,
    },
    divider: {
        borderWidth: 0.4,
        borderColor: Colors.GRAY,
        marginTop: 20,
        marginBottom: 20,
    },
    actionContainer: {
        flexDirection: 'row',
        margin: 8,
        gap: 8,
    },
    messageBtn: {
        flex: 1,
        padding: 15,
        backgroundColor: Colors.WHITE,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 99,
    },
    messageText: {
        textAlign: 'center',
        color: Colors.PRIMARY,
        fontSize: 18,
    },
    bookingBtn: {
        flex: 1,
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 99,
    },
    bookingText: {
        textAlign: 'center',
        color: Colors.WHITE,
        fontSize: 18,
    },
});
