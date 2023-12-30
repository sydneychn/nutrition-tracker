import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native'
import auth from '@react-native-firebase/auth';
import { err } from 'react-native-svg';
export default function LoginScreen(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signUp = () => {
        console.log(email);
        console.log(password);
        auth().createUserWithEmailAndPassword(email,password).then(() => {
            Alert.alert("User Created")
        })
        .catch((err) => {
            console.log(err)
        })

    }


    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                <Text style={{fontSize: 24, fontWeight: 'bold', margin: 6}}>Log In</Text>
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
                    style={styles.loginButton}>
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