import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header({ currentDate }) {
  const handleSignOut = () => {
    Alert.alert('Logging Out', 'Are you sure you want to log out?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => FIREBASE_AUTH.signOut(),
        },
      ],
      { cancelable: false }
    );
  }
  return (
    <View style={[styles.header, styles.shadowProp]}>
      <View style={styles.titleContainer}>
        
        <Text style={styles.welcomeText}>Welcome back, Sydney!</Text>
      </View>
      <TouchableOpacity /*Pressable component to signOut*/
        style={[styles.signOutButton, styles.shadowProp]}
        onPress={() => handleSignOut()}>
        <Text style = {{fontFamily: 'FiraMono_400Regular', fontSize:13}}>Not you?Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    backgroundColor: '#ABCDBA',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    },
  titleContainer: {
    flexDirection: 'column',
    padding: 8,
    marginTop: 25,
    flex: 3
  },
  welcomeText: { 
    fontFamily: 'FiraMono_700Bold',
    fontSize: 18,
  },
  signOutButton: {
    flex: 1,
    backgroundColor: '#E3F6EC',
    borderRadius: 12,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
