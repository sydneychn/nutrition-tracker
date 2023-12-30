import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Keyboard, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../components/header';
import InputForm from '../components/inputForm';

export default function HomeScreen() {
  //Hardcoded initial items for testing purposes
  const [foods, setFoods] = useState([
    {name: 'Chicken', cals: 220, carbs: 0, fats: 5, protein: 20, id: 0},
    {name: 'Milk', cals: 150, carbs: 0, fats: 10, protein: 10, id: 1},
    {name: 'Rice', cals: 200, carbs: 15, fats: 0, protein: 0, id: 2},
    {name: 'Eggs', cals: 70, carbs: 0, fats: 2, protein: 7, id: 3}
  ]);
  
  const [food, setFood] = useState(''); //new item to be added to list
  const [carbs, setCarbs] = useState('0'); //default item's carbs
  const [protein, setProtein] = useState('0'); //default item's protein
  const [fats, setFats] = useState('0'); //default item's fats
  const [calories, setCalories] = useState(''); //default item's calories
  const [totalCalories, setTotalCalories] = useState(640); //total calories 
  const [showInput, setShowInput] = useState(false) //state to show/hide input field
  const [currentDate, setCurrentDate] = useState(new Date());

  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [weight, setWeight] = useState('');

  //function that adds current item to the list and updates the total calories
  const addFood = ( )=> {
  //checks for missing input values
    if (!food){ 
      alert('You left it blank!');
      return;
    }
    console.log(calories);
    console.log(protein);
    console.log(carbs);
    console.log(fats);
    const newFood = {
      name: food,
      cals: parseInt(calories),
      protein: parseFloat(protein),
      carbs: parseFloat(carbs),
      fats: parseFloat(fats),
      id: Date.now(),
    }
    //Updates the the food list and totalCalories
    setFoods((prevFoods) => {return [newFood, ...prevFoods]});
    setTotalCalories(totalCalories + newFood.cals) 
    //sets default values for inputs after new item is added
    setFood('');
    setCalories('');
    setCarbs('');
    setProtein('');
    setFats('');
    Keyboard.dismiss();
  }

  //Getting Current Time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
    }, []);

  return (
    
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()
    console.log("hello test");}}>
      <KeyboardAvoidingView style = {styles.container}>
        {/*Header Component*/}
        <Header currentDate={currentDate}></Header> 
        <Text style = {{fontSize: 20, fontWeight: 'bold', margin: 10}}>You consumed {totalCalories} calories today!</Text>
        {!showInput ? ( //If showInput true, view the input field. If not, hide it
          <TouchableOpacity
            style = {styles.newButton}
            onPress={() => setShowInput(true)} /*When New Item button pressed, show the input field*/>
            <MaterialIcons name="fastfood" size={24} color="black" />
          </TouchableOpacity>
        ) : ( /*InputForm Component */
          <InputForm
            food={food}
            calories={calories}
            protein={protein}
            carbs={carbs}
            fats={fats}
            setFood={setFood}
            setCalories={setCalories}
            setProtein={setProtein}
            setCarbs={setCarbs}
            setFats={setFats}
            addFood={addFood}
            setShowInput={setShowInput}
          />
        )}
        {/*FlatList of items*/}     
        <View style = {styles.listContainer}>
            <FlatList 
              data = {foods}
              renderItem= {({item}) =>(
                <TouchableOpacity /*item*/>
                  <View style={styles.listItem}>
                      <Text style={styles.listItemText}>
                        {item.name}
                      </Text>
                      <View style={styles.listItemDetails}>
                        <Text style={styles.listItemMacro}>P: {item.protein}</Text>
                        <Text style={styles.listItemMacro}>C: {item.carbs}</Text>
                        <Text style={styles.listItemMacro}>F: {item.fats}</Text>
                        <Text style={styles.listItemMacro}>Cal: {item.cals}</Text>
                      </View>
                  </View>
                </TouchableOpacity>
              )}
            />
        </View>
        
      </KeyboardAvoidingView>
      </TouchableWithoutFeedback> 
       
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  heightInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    width: 50,
    borderBottomWidth: 1,
    textAlign: 'center',
  },
  bodyInfoContainer: {
    backgroundColor: '#D5D5D5',
    borderWidth: 2,
    borderRadius: 10,
    flex: 0.5
  },
  newButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row'
  },
  macrosSlider: {
    width: 150,
    height: 40,
    marginVertical: 10,
    marginLeft: 5,
  },
  listContainer: {
    flex: 2,
    marginVertical: 5,
  },
  listItem: {
    alignItems: 'flex-start',
    padding: 10,
    margin: 2,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#65A88E',
    backgroundColor: '#DFEFE9',
  },
  listItemText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  listItemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemMacro: {
    marginHorizontal: 3,
  },
});

   
