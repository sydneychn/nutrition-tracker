import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Header(){
return (
<View style = {styles.header}>
    <Text style = {styles.title}>Foods/Drinks Consumed Today</Text>
</View>
)
}


const styles = StyleSheet.create({
    header: {
        padding: 20,
        height: 70,
        backgroundColor: '#7ECFAF',
        borderRadius: 10,
    },
    title: {
        textAlign: 'justify',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    }
});