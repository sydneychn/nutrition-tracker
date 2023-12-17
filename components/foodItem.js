import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function FoodItem({item}){
return(
    <TouchableOpacity>
        <Text style = {styles.item}>
            {item.name}: {item.cals} calories
        </Text>
    </TouchableOpacity>
);
}

const styles = StyleSheet.create({
    item: {
        padding: 15,
        margin: 5,
        borderColor: '#65A88E',
        borderWidth: 4,
        borderStyle: 'dashed',
        borderRadius: 10,
        fontWeight: 'bold'
    }
}); 