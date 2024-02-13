import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Keyboard, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Header from '../components/header';
import InputForm from '../components/inputForm';

import { FIREBASE_AUTH, FIRESTORE_DB } from '../FirebaseConfig';
import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

export default function HomeScreen(navigation) {
  //H
  const [foods, setFoods] = useState([
    {
      name: 'Help',
      cals: 202,
      protein: 19,
      carbs: 30,
      fats: 5,
    },
    {
      name: 'Chicken',
      cals: 202,
      protein: 0,
      carbs: 3,
      fats: 30,
    }
  ]);
  
  const [food, setFood] = useState(''); //new item to be added to list
  const [carbs, setCarbs] = useState('0'); //default item's carbs
  const [protein, setProtein] = useState('0'); //default item's protein
  const [fats, setFats] = useState('0'); //default item's fats
  const [calories, setCalories] = useState('0'); //default item's calories
  const [totalCalories, setTotalCalories] = useState(0); //total calories
  const [showInput, setShowInput] = useState(false) //state to show/hide input field
  const [currentDate, setCurrentDate] = useState(new Date());
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [weight, setWeight] = useState('');
  
  //Constantly updates the collection to sync with our display, including calculating total calories
  useEffect(() => {
    const currentUserCollection = `${FIREBASE_AUTH.currentUser.uid}_foods`; //Each collection is the current user's id + '_foods'
    const foodRef = collection(FIRESTORE_DB, currentUserCollection);
    const subscriber = onSnapshot(foodRef, {
      next: (snapshot) => {
        const foods = [];
        let sum = 0;
        snapshot.docs.forEach((doc) => {
          console.log(doc.data())
          foods.push({
            id: doc.id,
            ...doc.data(),
          });
          sum += doc.data().cals;
        });
        setFoods(foods);
        setTotalCalories(sum);
      }
    });
    return () => subscriber();
  }, [FIREBASE_AUTH.currentUser]);
  //function that adds current item to the collection in firestore
  const addFood = ( )=> {
  //checks for missing input values
    if (!food || !carbs || !protein || !fats || !calories){ 
      alert('You left a field blank!');
      return;
    }
 
    const newFood = {
      name: food,
      cals: parseInt(calories),
      protein: parseFloat(protein),
      carbs: parseFloat(carbs),
      fats: parseFloat(fats),
    }
    //Adds to collection in firestore database
    const currentUserCollection = `${FIREBASE_AUTH.currentUser.uid}_foods`;
    const doc = addDoc(collection(FIRESTORE_DB, currentUserCollection), newFood);
    console.log(doc)  
    //Updates the the food list and totalCalories
    //sets default values for inputs after new item is added
    setFood('');
    setCalories('0');
    setCarbs('0');
    setProtein('0');
    setFats('0');
    Keyboard.dismiss();
  }
  //function that removes the slected food from list
  const removeFood = (item) => {
    const ref = doc(FIRESTORE_DB, `${FIREBASE_AUTH.currentUser.uid}_foods/${item.id}`);
    deleteDoc(ref); 
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
    console.log(FIREBASE_AUTH.currentUser.uid);}}>
      <View style = {styles.container}>
        {/*Header Component*/}
        <Header currentDate={currentDate}></Header> 
        <View style = {[styles.goalsContainer, styles.shadowProp]}>
          <View style = {styles.goalsHeading}>
              <Text style = {styles.cardTitleText}>Today's Goals</Text>
              <Text style = {styles.dateText}> {currentDate.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</Text>
          </View>
          <View style = {styles.totalCalorieContainer}>
            <View style = {styles.totalCalorieText}>
              <Text style>Total Calories:</Text>
              <Text>1070/2000</Text>
            </View>
            <View style = {styles.totalCalorieBar}>
              
            </View>
          </View>
        </View>
        <View style = {[styles.listContainer, styles.shadowProp]}>
              <View style = {styles.listHeading}>
                <Text style = {styles.cardTitleText}>Today's Consumptions</Text>
              </View>
            {!showInput ? ( //If showInput true, view the input field. If not, hide it
              <TouchableOpacity
                style = {[styles.newButton, styles.shadowProp]}
                onPress={() => setShowInput(true)} /*When New Item button pressed, show the input field*/>                
                <Text style = {{fontFamily: 'FiraMono_400Regular'}}>Add Item</Text>
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
            <FlatList 
              data = {foods}
              renderItem= {({item}) => (
                <TouchableOpacity item> 
                  <View style={[styles.listItem, styles.shadowProp]}> 
                      <View style={styles.listItemDetails}>
                        <Text style={styles.listItemText}>{item.name} - {item.cals} Calories</Text>
                        <Text style={styles.listItemMacroText}>Protein: {item.protein}g | Carbs: {item.carbs}g | Fat: {item.fats}g </Text>
                      </View>   
                      <View style = {{justifyContent: 'center'}}>
                        <TouchableOpacity /*Pressable component to minimize input form*/
                            onPress={() => removeFood(item)}>
                            <MaterialCommunityIcons name="trash-can-outline" size={30} color="#E57E68" />                        
                        </TouchableOpacity>          
                      </View>     
                  </View>
                </TouchableOpacity>
              )}
            />
        </View>
        </View>
        {/*FlatList of items*/}     
      </TouchableWithoutFeedback> 
       
  );
}
        
    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8',
    alignItems: 'center'
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputField: {
    width: 50,
    borderBottomWidth: 1,
    textAlign: 'center',
  },
  goalsContainer: {
    flex: 1,
    marginVertical: 20,
    padding: 12,
    borderRadius: 16,
    width: '90%',
    backgroundColor: '#E3F6EC',
  },
  goalsHeading: {
    flexDirection: 'row',
    padding: 2,
    margin: 5,
  },
  listHeading: {
    padding: 2,
    margin: 5,
  },
  cardTitleText: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'FiraMono_700Bold',
  },
  dateText: {
    fontSize: 12,
    fontFamily: 'FiraMono_400Regular',
  },
  totalCalorieContainer: {
    flexDirection: 'row',
  },
  totalCalorieText: {
    flex:1,
    backgroundColor: 'grey',
    alignItems: 'flex-end'
  },
  totalCalorieBar: {
    flex:1,
    backgroundColor: 'blue'
  },
  newButton: {
    backgroundColor: '#ABC3CD',
    borderRadius: 16,    
    padding: 10,
    margin: 8,
    alignItems: 'center',
    marginHorizontal: '35%'
  },
  macrosSlider: {
    width: 150,
    height: 40,
    marginVertical: 10,
    marginLeft: 5,
  },
  listContainer: {
    flex: 3,
    marginVertical: 5,
    padding: 12,
    borderRadius: 16,
    width: '90%',
    backgroundColor: '#E3F6EC',
  },
  listItem: {
    flex: 1,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row'
  },
  listItemText: {
    fontSize: 18,
    marginVertical: 5,
    fontFamily: 'FiraMono_500Medium',
  },
  listItemMacroText: {
    marginHorizontal: 3,
    fontSize: 12,
    fontFamily: 'FiraMono_400Regular',
  },
  listItemDetails: {
    flex: 1,
    alignContent : 'center',
  },
  
});

   
