import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Header({currentDate}){
    return (
        <View style = {styles.header}> 
          <Text style = {styles.title}>{currentDate.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</Text>
          <Text style = {styles.title}>Welcome Back, Squid!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        padding: 15,
        marginBottom:30,
        justifyContent: 'flex-end',
        height:105,
        backgroundColor: '#7ECFAF',
      },
      title: {
        textAlign: 'justify',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
      },
});



