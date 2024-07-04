import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import Heading from "../../Components/Heading";
import Colors from "../Utils/Colors";

export default function BusinessAbout({ business }) {
    const [isReadMore, setIsReadMore] = useState(false);

    if (!business) {
        return null; // Safe guard in case business is not provided
    }

    return (
        <View style={styles.container}>
            <Heading text="About" />
            <Text
                style={styles.aboutText}
                numberOfLines={isReadMore ? 20 : 5}
            >
                {business.about}
            </Text>
            <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)}>
                <Text style={styles.readMoreText}>
                    {isReadMore ? 'Read Less' : 'Read More'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    aboutText: {
        color: Colors.GRAY,
        lineHeight: 28,
        fontSize: 16,
    },
    readMoreText: {
        color: Colors.PRIMARY,
        fontSize: 16,
        marginTop: 5,
    }
});
