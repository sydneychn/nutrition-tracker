import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, FlatList, Keyboard, Pressable, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider'
import PieChart from 'react-native-pie-chart';
import Header from './components/header';
import FoodItem from './components/foodItem';


export default function App() {
  var count = 2;
  const [foods, setFoods] = useState([
    {name: 'Chicken', cals: 220, carbs: 0, fats: 5, protein: 20, id: 0},
    {name: 'Milk', cals: 150, carbs: 0, fats: 10, protein: 10, id: 1},
    {name: 'Rice', cals: 200, carbs: 15, fats: 0, protein: 0, id: 2},
    {name: 'Eggs', cals: 70, carbs: 0, fats: 2, protein: 7, id: 3}
  ]);
  const [food, setFood] = useState('');
  const [carbs, setCarbs] = useState('1');
  const [protein, setProtein] = useState('1');
  const [fats, setFats] = useState('1');
  const [calories, setCalories] = useState('');
  const [totalCalories, setTotalCalories] = useState(640);
  const macSum = carbs+protein+fats;
  const addFood = ( )=> {
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
    //Adds the new item to FlatList
    setFoods((prevFoods) => prevFoods.concat(newFood));
    //Updates the totalCalories
    setTotalCalories(totalCalories + newFood.cals)
    setFood('');
    setCalories('');
    setCarbs('');
    setProtein('');
    setFats('');

    Keyboard.dismiss();
  }

  return (
    <View style = {styles.container}>
      <View style = {styles.header} /*header*/> 
        <Text style = {styles.title}>December 1, 2023</Text>
      </View>
      <Text padding = {10}>Enter Food and Nutritioal Information </Text>
        <View style = {styles.inputContainer} /*input container*/>
          <View style = {styles.inputs1} /*Input container for item and calorie inputs*/> 
            <TextInput /*input for food item*/
              style = {styles.inputName}
              placeholder='Food'
              value ={food}
              onChangeText={(val) => setFood(val)}
            />
            <TextInput /*input for calories*/
              style = {styles.inputCal}
              placeholder='Calories'
              keyboardType = "numeric"
              value ={calories}
              onChangeText={(val) => setCalories(val)}
            />
          </View>
            <View style = {{flexDirection: 'row'}}>
              <View style = {styles.inputs2}/*Input container for macros inputs*/>
                <View style = {{flexDirection: 'row'}}>
                  <Text style = {{marginVertical: 20, marginLeft: 10}}>Protein</Text>
                  <Slider
                    style={styles.macrosSlider}
                    minimumValue={0}
                    maximumValue={100}
                    value={protein}
                    onValueChange={(val) => setProtein(val)}
                  />
                </View>
                <View style = {{flexDirection: 'row'}}>
                <Text style = {{marginVertical: 20, marginLeft: 10, marginRight:14}}>Carb</Text>
                  <Slider
                    style={styles.macrosSlider}
                    minimumValue={0}
                    maximumValue={100}
                    value={carbs}
                    onValueChange={(val) => setCarbs(val)}
                  />
                </View>
                <View style = {{flexDirection: 'row'}}>
                  <Text style = {{marginVertical: 20, marginLeft: 10, marginRight:25}}>Fat</Text>
                  <Slider
                    style={styles.macrosSlider}
                    minimumValue={0}
                    maximumValue={100}
                    value={fats}
                    onValueChange={(val) => setFats(val)}
                  />
                </View>
              </View>
                {/*If macros add up to 0, show a default pie chart of equal values. Once slider is adjusted update piechart*/}
                {(macSum) === 0 ? (
                  <PieChart widthAndHeight={100} series={[1, 1, 1]} sliceColor={['#2bae7c', '#87bda2', '#c9c9c9']} coverRadius={0.45} coverFill={'#FFF'} />
                ) : (
                <PieChart widthAndHeight={100} series={[protein, carbs, fats]} sliceColor={['#2bae7c', '#87bda2', '#c9c9c9']} coverRadius={0.45} coverFill={'#FFF'} />
                )}   
            </View>
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
                {item.name}: {item.cals} calories P: {item.protein} C: {item.carbs} F: {item.fats}
                </Text>
              </TouchableOpacity>
            )}
          />
      </View>
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
    margin: 10,
    height: 70,
    backgroundColor: '#7ECFAF',
    borderRadius: 10,
  },
  title: {
    textAlign: 'justify',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25
  },
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputs1: {
    flexDirection: 'row',
  },
  inputs2: {
    flexDirection: 'column',
    marginRight: 50
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
    marginLeft: 5
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
