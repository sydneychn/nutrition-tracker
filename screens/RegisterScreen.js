import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native'
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const auth = FIREBASE_AUTH;

    const signUp = async () => {
        try{
            // Attempt to create a new user account using the provided email and password.
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Account Created!');
        } catch (error) { //Logs and alerts the user of any errors occured
            console.log(error);
            alert('Sign in failed: ' + error.message);
        } 
    }

    const verifyPassword = () => {
        console.log(password + confirmPassword);
        if (email === ''){ //Check if email is empty
            alert('Invalid email. Try again');
        }
        else if (password != confirmPassword) { //Check if passwords don't match
            alert('Passwords do not match. Try again.');
        }
        else { //Attempt to create account
            signUp();
        }
    }

    
    return (
    
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
    <View style={styles.container}>
        <View style={styles.inputContainer}>
        <Text style={{fontSize: 24, fontWeight: 'bold', margin: 6}}>Create an account</Text>
        <TextInput
            style={styles.inputs}
            placeholder="Your Email"
            value={email}
            onChangeText={val => setEmail(val)}
            autoCapitalize='none'
        />
        <TextInput
            style={styles.inputs}
            placeholder="Choose your password"     
            secureTextEntry={true}
            value={password}
            onChangeText={val => setPassword(val)}
        />
        <TextInput
            style={styles.inputs}
            placeholder="Confirm your password"     
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={val => setConfirmPassword(val)}
        />
        <View alignItems = 'center'>
          <TouchableOpacity 
            style={styles.registerButton}
            onPress={() => verifyPassword()}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>Create Account!</Text>
          </TouchableOpacity>
        </View>
        </View>
    </View>
</TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
    padding: 20,
    },
    inputContainer: {
    backgroundColor: '#DFEFE9',
    borderRadius: 8,
    padding: 20,
    },
    inputs: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 6,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    },
    loginButton: {
    backgroundColor: '#65A88E',
    borderRadius: 8,
    padding: 18,
    alignItems: 'center',
    marginVertical: 10,
    width: '50%'
    },
    registerButton: {
    backgroundColor: '#4E7D68',
    borderRadius: 8,
    padding: 18,
    margin: 5,
    alignItems: 'center',
    width: '50%'
    }
});