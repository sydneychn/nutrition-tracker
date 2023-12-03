import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, FlatList, Keyboard, Pressable, TouchableOpacity, Image, TouchableWithoutFeedback} from 'react-native';
import Slider from '@react-native-community/slider'
import PieChart from 'react-native-pie-chart';
import Header from './components/header';
import FoodItem from './components/foodItem';


export default function App() {
  //Hardcoded initial items for testing purposes
  const [foods, setFoods] = useState([
    {name: 'Chicken', cals: 220, carbs: 0, fats: 5, protein: 20, id: 0},
    {name: 'Milk', cals: 150, carbs: 0, fats: 10, protein: 10, id: 1},
    {name: 'Rice', cals: 200, carbs: 15, fats: 0, protein: 0, id: 2},
    {name: 'Eggs', cals: 70, carbs: 0, fats: 2, protein: 7, id: 3}
  ]);
  const [food, setFood] = useState(''); //new item to be added to list
  const [carbs, setCarbs] = useState('1'); //new item's carbs
  const [protein, setProtein] = useState('1'); //new item's protein
  const [fats, setFats] = useState('1'); //new item's fats
  const [calories, setCalories] = useState(''); //new item's calories
  const [totalCalories, setTotalCalories] = useState(640); //total calories 
  const [showInput, setShowInput] = useState(false) //state to show/hide input field
  //function that adds current item to the list and updates the total calories
  const addFood = ( )=> {
  //checks for missing input values
    if (!food || !calories){ 
      alert('You left it blank!');
      return;
    }
    const newFood = {
      name: food,
      cals: parseInt(calories),
      carbs: parseInt(carbs),
      protein: parseInt(protein),
      fats: parseInt(fats),
      id: Date.now(),
    }
    
    setFoods((prevFoods) => {return [newFood, ...prevFoods]}); //Adds the new item to FlatList
    
    setTotalCalories(totalCalories + newFood.cals) //Updates the totalCalories
    //sets default values
    setFood('');
    setCalories(0);
    setCarbs(0);
    setProtein(0);
    setFats(0);
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()
    console.log("hello test");}}>
      <View style = {styles.container}>
        <View style = {styles.header} /*header*/> 
          <Text style = {styles.title}>December 1, 2023</Text>
          <Text style = {styles.title}>Welcome Back, Sydney!</Text>
        </View>
        <Text style = {{fontWeight: 'bold', marginBottom: 20}}>You consumed {totalCalories} calories today!</Text>
        {/*If showInput true, view the input field. If not, hide it */}
        {!showInput ? (
          <Pressable
            style = {styles.newButton}
            onPress={() => setShowInput(true)} /*When New Item button pressed, show the input field*/>
            <Text style={{ fontWeight: 'bold' }}>+New</Text>
            </Pressable>
        ) : (
        <>
          <View style={styles.inputContainer} /*input container*/>
            <View style={styles.inputs1} /*Input container for item and calorie inputs*/>
              <TextInput /*input for food item*/
                style={styles.inputName}
                placeholder='Food'
                value={food}
                onChangeText={(val) => setFood(val)} />
              <TextInput /*input for calories*/
                style={styles.inputCal}
                placeholder='Calories'
                keyboardType="numeric"
                value={calories.toString()}
                onChangeText={(val) => setCalories((val))} />
              <Pressable /*Pressable component to add food*/
                style={styles.addButton}
                onPress={() =>addFood()}>
                <Text style={{ fontWeight: "bold", textAlign: 'center' }}>Add</Text>
              </Pressable>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.inputs2} /*Input container for macros inputs*/>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ marginVertical: 20, marginLeft: 10 }}>Protein</Text>
                  <Slider
                    style={styles.macrosSlider}
                    minimumValue={0}
                    maximumValue={100}
                    value={protein}
                    minimumTrackTintColor={'#2bae7c'}
                    thumbImage={require('./assets/chris.png')}
                    onValueChange={(val) => setProtein(val)} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ marginVertical: 20, marginLeft: 10, marginRight: 14 }}>Carb</Text>
                  <Slider
                    style={styles.macrosSlider}
                    minimumValue={0}
                    maximumValue={100}
                    value={carbs}
                    minimumTrackTintColor={'#87bda2'}
                    thumbImage={require('./assets/thumb.png')}
                    onValueChange={(val) => setCarbs(val)} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ marginVertical: 20, marginLeft: 10, marginRight: 25 }}>Fat</Text>
                  <Slider
                    style={styles.macrosSlider}
                    minimumValue={0}
                    maximumValue={100}
                    value={fats}
                    minimumTrackTintColor={'#c9c9c9'}
                    thumbImage={require('./assets/matthew.png')}
                    onValueChange={(val) => setFats(val)} />
                </View>
              </View>
              {/*If macros add up to 0, show a default pie chart of equal values. Once slider is adjusted update piechart*/}
              {(carbs + protein + fats) === 0 ? (
                <PieChart widthAndHeight={100} series={[1, 1, 1]} sliceColor={['#2bae7c', '#87bda2', '#c9c9c9']} coverRadius={0.45} coverFill={'#FFF'} />
              ) : (
                <PieChart widthAndHeight={100} series={[protein, carbs, fats]} sliceColor={['#2bae7c', '#87bda2', '#c9c9c9']} coverRadius={0.45} coverFill={'#FFF'} />
              )}
            </View>
            <Pressable /*Pressable component to minimize input form*/
                style = {styles.minimizeInputButton}
                onPress={() => setShowInput(false)} /*When Minimize button pressed, hide the input form*/>
                <Text style={{ fontWeight: 'bold'}}>-Minimize</Text>
              </Pressable>
          </View></>
        )}     
    
        <View style = {styles.listContainer}>
            <FlatList 
              data = {foods}
              renderItem= {({item}) =>(
                <TouchableOpacity /*item*/>
                  <Text style = {styles.item}>
                  {item.name}: {item.cals} calories P: {item.protein} C: {item.carbs} F: {item.fats}
                  </Text>
                </TouchableOpacity>
              )}
            />
        </View>
      </View>
      </TouchableWithoutFeedback>  
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
    marginBottom: 20,
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
  newButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 5,
    marginBottom: 20,
    backgroundColor: '#D5D5D5',
    borderWidth: 4,
    borderRadius: 10,
  },
  minimizeInputButton: {
    backgroundColor: '#FF5C5C',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  inputs1: {
    flexDirection: 'row',
  },
  inputs2: {
    flexDirection: 'column',
    marginRight: 50
  },
  addButton: {
    backgroundColor: '#3498DB',
    borderRadius: 10,
    justifyContent: 'center',
    height: 30,
    width: 50,
    marginLeft: 20
  },
  inputName: {
    borderWidth: 1,
    backgroundColor: '#7ECFAF',
    borderColor: '#777',
    padding: 8,
    marginLeft: 10,
    marginBottom: 5,
    width: 150,
    borderRadius: 10,
  },
  inputCal: {
    borderWidth: 1,
    borderColor: '#777',
    backgroundColor: '#7ECFAF',
    padding: 8,
    marginLeft: 10,
    marginBottom: 5,
    width: 100,
    borderRadius: 10,
  },
  macrosSlider: {
    width: 150,
    height: 40,
    marginVertical: 10,
    marginLeft: 5,
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
