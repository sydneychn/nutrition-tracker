import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native'
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


export default function LoginScreen(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        //setLoading(true);
        try{
            // Attempt to sign in using the provided email and password.
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) { //Logs and alerts the user of any errors occured
            console.log(error);
            Alert.alert('Login Failed', 'Incorrect email or password');
        } /*finally {
            setLoading(false);
        }*/
    }
    const signUp = async () => {
        //setLoading(true);
        try{
            // Attempt to create a new user account using the provided email and password.
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Account Created!');
        } catch (error) { //Logs and alerts the user of any errors occured
            console.log(error);
            alert('Sign in failed: ' + error.message);
        } /*finally {
            setLoading(false);
        }*/
    }


    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                <Text style={{fontSize: 24, fontWeight: 'bold', margin: 6}}>Log in to your account</Text>
                <TextInput
                    style={styles.inputs}
                    placeholder="Email"
                    value={email}
                    onChangeText={val => setEmail(val)}
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputs}
                    placeholder="Password"     
                    secureTextEntry={true}
                    value={password}
                    onChangeText={val => setPassword(val)}
                />
                <View alignItems = 'center'>
                  <TouchableOpacity 
                    style={styles.loginButton}
                    onPress={() => signIn()}>
                      <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>Log In</Text>
                  </TouchableOpacity>
    
                  <TouchableOpacity 
                    style={styles.registerButton}
                    onPress={() => signUp()}>
                      <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>Register</Text>
                  </TouchableOpacity>
                </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
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
        alignItems: 'center',
        width: '50%'
        }
    });