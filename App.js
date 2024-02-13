import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';

const Stack = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();
function HomeLayout() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen options= {{headerShown: false}} name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}
function LoginLayout(){
  return (
  <LoginStack.Navigator initialRouteName="Login">
    <LoginStack.Screen options= {{headerShown: false, headerStyle: {backgroundColor: '#DFEFE9'}}} name="Login" component={LoginScreen}  />
    <LoginStack.Screen options= {{headerShown: false, headerStyle: {backgroundColor: '#DFEFE9'}}} name="Register" component={RegisterScreen} />
  </LoginStack.Navigator>
  );
}
export default function App(){
  //User authentication state 
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, []);
  return (
    <NavigationContainer> 
      <Stack.Navigator initialRouteName="LoginScreen">
        {user ? (
          //If authentication state exists, go to Home Screen, otherwise, go to login screen
          <Stack.Screen options= {{headerShown: false}} name="HomeScreen" component={HomeLayout} />
        ) : (
          <Stack.Screen options= {{headerShown: false}} name="LoginScreen" component={LoginLayout} />
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}