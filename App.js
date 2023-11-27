import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, FlatList, Keyboard, Pressable, ScrollView } from 'react-native';
import Header from './components/header';
import FoodItem from './components/foodItem';


export default function App() {
  var count = 2;
  const [foods, setFoods] = useState([
    {name: 'Chicken ', cals: 220, id: 0},
    {name: 'Milk', cals: 150, id: 1},
    {name: 'Rice', cals: 200, id: 2},
    {name: 'Eggs', cals: 70, id: 3}
  ]);
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState('');
  const [totalCalories, setTotalCalories] = useState(640);
  
  const addFood = ( )=> {
    if (!food || !calories){
      alert('You left something blank!');
      return;
    }
    const newFood = {
      name: food,
      cals: parseInt(calories),
      id: Date.now(),
    }
    setFoods((prevFoods) => prevFoods.concat(newFood));
    setTotalCalories(totalCalories + newFood.cals);
    setFood('');
    setCalories('');
    Keyboard.dismiss();
  }

  return (
    <View style = {styles.container}>
      <Header/>
      <Text padding = {10}>Enter Food and Calories: </Text>
      <TextInput
          style = {styles.input}
          placeholder='Food'
          value ={food}
          onChangeText={(val) => setFood(val)}
         />
      <TextInput
          style = {styles.inputNum}
          placeholder='Calories'
          keyboardType = "numeric"
          value ={calories}
          onChangeText={(val) => setCalories(val)}
         />
        <Pressable 
        style = {styles.inputNum}
        onPress = {addFood}>
          <Text style = {{fontWeight: "bold"}}> Add Item</Text>
        </Pressable>
      <Text>You consumed {totalCalories} calories today!</Text>
      <View style = {styles.content}>
        <View style = {styles.list}>
          <FlatList 
            data = {foods}
            renderItem= {({item}) =>(
              <FoodItem item={item}/>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#85929E',

  },
  content: {
    padding: 5,
    backgroundColor: 'black'
  },
  list: {
    padding: 10,
    backgroundColor: '#85929E'
  },
  buttonContainer: {
    marginTop: 50
  },
  input: {
    borderWidth: 1,
    backgroundColor: '#BFA4D6',
    borderColor: '#777',
    padding: 8,
    marginLeft: 10,
    marginBottom: 5,
    width: 150,
    borderRadius: 10,
  },
  inputNum: {
    borderWidth: 1,
    borderColor: '#777',
    backgroundColor: '#BFA4D6',
    padding: 8,
    marginLeft: 10,
    marginBottom: 5,
    width: 90,
    borderRadius: 10,
}});

