import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, Button} from 'react-native'
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const auth = FIREBASE_AUTH;
    const navigation = useNavigation();
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
            <View style={[styles.inputContainer, styles.shadowProp]}>
                <Text style={{fontSize: 20, fontWeight: 'bold', margin: 6, fontFamily: 'FiraMono_700Bold'}}>Create an account</Text>
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
                    style={[styles.registerButton, styles.shadowProp]}
                    onPress={() => verifyPassword()}>
                    <Text style={{fontSize: 16, fontFamily: 'FiraMono_500Medium'}}>Sign up</Text>
                </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style = {{color: '#ABCDBA', fontFamily: 'FiraMono_700Bold'}}>Already have an account? Click here</Text>
            </TouchableOpacity>
            </View>
        </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ABCDBA',
        justifyContent: 'center',
        padding: 20,
        },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {height: 5},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        height: '42%'
        },
    inputs: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'FiraMono_400Regular',
        marginVertical: 8,
        width: '90%',
        padding: 12,
        borderRadius: 16,
        borderWidth: 1,
        backgroundColor: 'white',
    },
    registerButton: {
        backgroundColor: '#ABCDBA',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginVertical: 12,
        width: 170
    }
});