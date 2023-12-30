import React from 'react';
import {StyleSheet, Text, TextInput, View, Pressable, TouchableOpacity} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { MaterialIcons } from '@expo/vector-icons';

export default function InputForm({
    food,
    calories,
    protein,
    carbs,
    fats,
    setFood,
    setCalories,
    setProtein,
    setCarbs,
    setFats,
    addFood,
    setShowInput}){
    return (
        <View style={styles.inputContainer} /*input container*/>
            <View style={ {flexDirection: 'row', justifyContent: 'flex-start',}} /*Input container for item and calorie inputs*/>
              <View>
                <Text style = {{marginLeft: 10}}>Food </Text>
                <TextInput 
                  style={styles.inputName}
                  placeholder='Enter food name'
                  value={food}
                  onChangeText={(val) => setFood(val)} />
              </View>
              <View>
                <Text style = {{marginLeft: 10}}>Calories </Text>
                <TextInput /*input for calories*/
                  style={styles.inputCal}
                  placeholder='Enter calories'
                  keyboardType="numeric"
                  value={calories.toString()}
                  onChangeText={(val) => setCalories((val))} />
              </View>
              <View>
                <Text> </Text>
                <TouchableOpacity /*Pressable component to add food*/
                  style={styles.addButton}
                  onPress={() =>addFood()}>
                  <Text style={{ fontWeight: "bold", textAlign: 'center'}}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.inputContainerMacros} /*Input container for macros inputs*/>
              <View>
                <Text style = {{marginLeft: 10}}>Protein (g) </Text>
                <TextInput /*input for protein*/
                  style={styles.inputMacros}
                  placeholder=''
                  keyboardType="numeric"
                  value={protein.toString()}
                  onChangeText={(val) => setProtein((val))} />
              </View>
              <View>
                <Text style = {{marginLeft: 10}}>Carbs (g) </Text>
                <TextInput /*input for carbs*/
                  style={styles.inputMacros}
                  placeholder=''
                  keyboardType="numeric"
                  value={carbs.toString()}
                  onChangeText={(val) => setCarbs((val))} />
              </View>
              <View>
                <Text style = {{marginLeft: 10}}>Fat (g) </Text>
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
              width={200}
              height={100}
              chartConfig={{
                color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`
              }}
              accessor="value" // This is the key to customize the displayed values
              backgroundColor="transparent"
              padding="10"
            />
            {/* <PieChart widthAndHeight={100} series={[protein+.01, carbs+.01, fats+.01]} sliceColor={['#2bae7c', '#87bda2', '#c9c9c9']} coverRadius={0.45} coverFill={'#FFF'} /> */}
            <TouchableOpacity /*Pressable component to minimize input form*/
                style = {styles.minimizeInputButton}
                onPress={() => setShowInput(false)} /*When Minimize button pressed, hide the input form*/>
                <MaterialIcons name="no-food" size={24} color="black" />
            </TouchableOpacity>
          </View>
    );
}

const styles = StyleSheet.create({
    
    inputContainer: {
        padding: 5,
        marginHorizontal: 30,
        backgroundColor: '#D5D5D5',
        borderWidth: 2,
        borderRadius: 10,
        },
    inputName: {
        borderWidth: 1,
        backgroundColor: '#7ECFAF',
        borderColor: '#ddd',
        padding: 6,
        margin: 3,
        width: 150,
        borderRadius: 10,
    },
    inputCal: {
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#7ECFAF',
        padding: 6,
        margin: 3,
        width: 110,
        borderRadius: 10,
    },
    addButton: {
        backgroundColor: '#3498DB',
        borderRadius: 10,
        margin: 3,
        justifyContent: 'center',
        height: 30,
        width: 50,
        
    },
    inputContainerMacros: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    inputMacros: {
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#7ECFAF',
        padding: 6,
        margin: 3,
        width: 80,
        borderRadius: 10,
        marginBottom: 1
    },
    minimizeInputButton: {
        backgroundColor: '#FF5C5C',
        borderRadius: 10,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
});