import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View, FlatList, Keyboard, Pressable, TouchableOpacity, Image, TouchableWithoutFeedback, ScrollView} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { MaterialIcons } from '@expo/vector-icons';
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
  const [carbs, setCarbs] = useState(0); //default item's carbs
  const [protein, setProtein] = useState(0); //default item's protein
  const [fats, setFats] = useState(0); //default item's fats
  const [calories, setCalories] = useState(0); //default item's calories
  const [totalCalories, setTotalCalories] = useState(640); //total calories 
  const [showInput, setShowInput] = useState(false) //state to show/hide input field
  const [currentDate, setCurrentDate] = useState(new Date());

  //function that adds current item to the list and updates the total calories
  const addFood = ( )=> {
  //checks for missing input values
    if (!food){ 
      alert('You left it blank!');
      return;
    }
    const newFood = {
      name: food,
      cals: parseInt(calories),
      protein: parseFloat(protein),
      carbs: parseFloat(carbs),
      fats: parseFloat(fats),
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
    }, []);

  

  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()
    console.log("hello test");}}>
      <View style = {styles.container}>
        <View style = {styles.header} /*header*/> 
          <Text style = {styles.title}>{currentDate.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</Text>
          <Text style = {styles.title}>Welcome Back, Squid!</Text>
        </View>
        <Text style = {{fontSize: 20, fontWeight: 'bold', margin: 10}}>You consumed {totalCalories} calories today!</Text>
        {/*If showInput true, view the input field. If not, hide it */}
        {!showInput ? (
          <Pressable
            style = {styles.newButton}
            onPress={() => setShowInput(true)} /*When New Item button pressed, show the input field*/>
            <MaterialIcons name="fastfood" size={24} color="black" />
          </Pressable>
        ) : (
        <>
          
          <View style={styles.inputContainer} /*input container*/>
            <View style={ {flexDirection: 'row', justifyContent: 'flex-start',}} /*Input container for item and calorie inputs*/>
              <View>
                <Text style = {{marginLeft: 10}}>Food: </Text>
                <TextInput 
                  style={styles.inputName}
                  placeholder='Enter food name'
                  value={food}
                  onChangeText={(val) => setFood(val)} />
              </View>
              <View>
                <Text style = {{marginLeft: 10}}>Calories: </Text>
                <TextInput /*input for calories*/
                  style={styles.inputCal}
                  placeholder='Enter calories'
                  keyboardType="numeric"
                  value={calories.toString()}
                  onChangeText={(val) => setCalories((val))} />
              </View>
              <View>
                <Text> </Text>
                <Pressable /*Pressable component to add food*/
                  style={styles.addButton}
                  onPress={() =>addFood()}>
                  <Text style={{ fontWeight: "bold", textAlign: 'center'}}>Add</Text>
                </Pressable>
              </View>
            </View>
            
            <View style={styles.inputContainerMacros} /*Input container for macros inputs*/>
              <View>
                <Text style = {{marginLeft: 10}}>Protein (g): </Text>
                <TextInput /*input for protein*/
                  style={styles.inputMacros}
                  placeholder=''
                  keyboardType="numeric"
                  value={protein.toString()}
                  onChangeText={(val) => setProtein((val))} />
              </View>
              <View>
                <Text style = {{marginLeft: 10}}>Carbs (g): </Text>
                <TextInput /*input for carbs*/
                  style={styles.inputMacros}
                  placeholder=''
                  keyboardType="numeric"
                  value={carbs.toString()}
                  onChangeText={(val) => setCarbs((val))} />
              </View>
              <View>
                <Text style = {{marginLeft: 10}}>Fat (g): </Text>
                <TextInput /*input for fat*/
                  style={styles.inputMacros}
                  placeholder=''
                  keyboardType="numeric"
                  value={fats.toString()}
                  onChangeText={(val) => setFats((val))} />
              </View>
            </View>
            {/*PieChart showing statistical information of macros of current item*/}
            <PieChart
              data={[
                { name: 'Protein', value: protein/1, color:'#2bae7c' },
                { name: 'Carbs', value: carbs/1, color:'#87bda2' },
                { name: 'Fats', value: fats/1, color:'#c9c9c9' },
              ]}
              width={250}
              height={130}
              chartConfig={{
                color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`
              }}
              accessor="value" // This is the key to customize the displayed values
              backgroundColor="transparent"
              paddingLeft="15"
            />
            {/* <PieChart widthAndHeight={100} series={[protein+.01, carbs+.01, fats+.01]} sliceColor={['#2bae7c', '#87bda2', '#c9c9c9']} coverRadius={0.45} coverFill={'#FFF'} /> */}
            <Pressable /*Pressable component to minimize input form*/
                style = {styles.minimizeInputButton}
                onPress={() => setShowInput(false)} /*When Minimize button pressed, hide the input form*/>
                <MaterialIcons name="no-food" size={24} color="black" />
            </Pressable>
          </View></>
        )}     
    


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
      </View>
      </TouchableWithoutFeedback>  
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    padding: 15,
    marginBottom:30,
    justifyContent: 'flex-end',
    height:105,
    backgroundColor: '#7ECFAF',
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
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row'
  },
  inputContainer: {
    justifyContent: 'space-between',
    padding: 5,
    margin: 7,
    backgroundColor: '#D5D5D5',
    borderWidth: 2,
    borderRadius: 10,
  },
  inputContainerMacros: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: -12
  },
  minimizeInputButton: {
    backgroundColor: '#FF5C5C',
    borderRadius: 10,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#3498DB',
    borderRadius: 10,
    marginTop: 0.,
    justifyContent: 'center',
    height: 30,
    width: 50,
    margin: 20,
  },
  inputName: {
    borderWidth: 1,
    backgroundColor: '#7ECFAF',
    borderColor: '#ddd',
    padding: 6,
    marginLeft: 5,
    width: 150,
    borderRadius: 10,
  },
  inputCal: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#7ECFAF',
    padding: 6,
    marginLeft: 5,
    width: 110,
    borderRadius: 10,
  },
  inputMacros: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#7ECFAF',
    padding: 6,
    marginLeft: 5,
    width: 80,
    borderRadius: 10,
  },
  macrosSlider: {
    width: 150,
    height: 40,
    marginVertical: 10,
    marginLeft: 5,
  },
  listContainer: {
    flex: 1,
  },
  listItem: {
    alignItems: 'flex-start',
    padding: 15,
    margin: 5,
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
