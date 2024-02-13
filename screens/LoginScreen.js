import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, KeyboardAvoidingView, ImageBackground, Button} from 'react-native'
import { FIREBASE_AUTH } from '../FirebaseConfig';
import {signInWithEmailAndPassword } from 'firebase/auth';
import {useFonts, FiraMono_400Regular, FiraMono_500Medium, FiraMono_700Bold,} from '@expo-google-fonts/fira-mono';
import { useNavigation } from '@react-navigation/native';


export default function LoginScreen(){
    let [fontsLoaded] = useFonts({
        FiraMono_400Regular,
        FiraMono_700Bold,
      });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = FIREBASE_AUTH;
    const navigation = useNavigation();
    const signIn = async () => {
        try{
            // Attempt to sign in using the provided email and password.
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) { //Logs and alerts the user of any errors occured
            console.log(error);                                                     
            Alert.alert('Login Failed', 'Incorrect email or password');
        } 
    }
  

    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <View style={styles.container}>
                <View style={[styles.inputContainer, styles.shadowProp]}>
                    <Text style={{fontSize: 20, margin: 6, fontFamily: 'FiraMono_700Bold'}}>Sign in to continue</Text>
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
                        style={[styles.loginButton, styles.shadowProp]}
                        onPress={() => signIn()}>
                        <Text style={{fontSize: 15, fontFamily: 'FiraMono_500Medium'}}>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style = {{color: '#ABCDBA', fontFamily: 'FiraMono_700Bold'}}>New user? Click here</Text>
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
        backgroundColor: '#ABCDBA',
        justifyContent: 'center',
        padding: 20,
        },
        inputContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        height: '37%'
        },
        shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {height: 5},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        },
        inputs: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'FiraMono_400Regular',
        marginVertical: 10,
        width: '90%',
        padding: 12,
        borderRadius: 16,
        borderWidth: 1,
        backgroundColor: 'white',
        },
        loginButton: {
        backgroundColor: '#ABCDBA',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginVertical: 12,
        width: 170
        },
    });