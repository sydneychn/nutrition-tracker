import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, FlatList, Keyboard, Pressable, TouchableOpacity } from 'react-native';
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
  var date = new Date().toLocaleString;

  
  const addFood = ( )=> {
    if (!food || !calories){
      alert('You left it blank monkey');
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
      <View style = {styles.header} /*header*/> 
        <Text style = {styles.title}>Foods/Drinks Consumed Today</Text>
      </View>
      <Text padding = {10}>Enter Item and Nutritional Information:</Text>
      <View style = {styles.inputContainer} /*input container*/>
        <TextInput /*input for food item*/
          style = {styles.input}
          placeholder='Food'
          value ={food}
          onChangeText={(val) => setFood(val)}
        />
        <TextInput /*input for calories*/
          style = {styles.inputNum}
          placeholder='Calories'
          keyboardType = "numeric"
          value ={calories}
          onChangeText={(val) => setCalories(val)}
        />
        <Pressable /*Pressable component to add food*/
          style = {styles.addButton}
          onPress = {addFood}>
          <Text style = {{fontWeight: "bold"}}>Add Item</Text>
        </Pressable>
      </View>

      <Text style = {{fontWeight: 'bold', marginBottom: 20}}>You consumed {totalCalories} calories today!</Text>

      <View style = {styles.listContainer}>
          <FlatList 
            data = {foods}
            renderItem= {({item}) =>(
              <TouchableOpacity /*item*/>
                <Text style = {styles.item}>
                {item.name}: {item.cals} calories
                </Text>
              </TouchableOpacity>
            )}
          />
      </View>
      <Text>{}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    backgroundColor: '#f4f4f4',
  },
  header: {
    padding: 20,
    height: 70,
    backgroundColor: '#7ECFAF',
    borderRadius: 10,
  },
  title: {
    textAlign: 'justify',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    backgroundColor: '#7ECFAF',
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
    backgroundColor: '#7ECFAF',
    padding: 8,
    marginLeft: 10,
    marginBottom: 5,
    width: 90,
    borderRadius: 10,
  },
  addButton: {
    borderWidth: 1,
    borderColor: '#777',  
    backgroundColor: '#7ECFAF',
    padding: 8,
    marginLeft: 10,
    marginBottom: 5,
    width: 90,
    borderRadius: 10,
  },
  listContainer: {
    padding: 5,
    flex: 1
  },
  list: {
    padding: 10,
    backgroundColor: '#DFEFE9'
  },
  item: {
    padding: 15,
    margin: 5,
    borderColor: '#65A88E',
    borderWidth: 4,
    borderStyle: 'dashed',
    borderRadius: 10,
    fontWeight: 'bold',
  }
});

