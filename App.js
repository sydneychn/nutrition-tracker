import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';

const Stack = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();

function HomeLayout() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen options= {{headerShown: false}} name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
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
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          //If authentication state exists, go to Home Screen, otherwise, go to login screen
          <Stack.Screen options= {{headerShown: false}} name="Home" component={HomeLayout} />
        ) : (
          <Stack.Screen options= {{headerShown: false}} name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}