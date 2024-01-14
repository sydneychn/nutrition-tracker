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
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Text style={styles.dateText}> 
          {currentDate.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}{/*Display current date*/}</Text> 
        <Text style={styles.welcomeText}>Welcome Back, {FIREBASE_AUTH.currentUser.email}!</Text>
      </View>
      <TouchableOpacity /*Pressable component to signOut*/
        style={styles.signOutButton}
        onPress={() => handleSignOut()}>
        <MaterialIcons name="logout" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 35,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
    backgroundColor: '#7ECFAF',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'column',
  },
  dateText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  welcomeText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  signOutButton: {
    backgroundColor: '#DF5454',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
