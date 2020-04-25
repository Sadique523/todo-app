import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from "firebase";
import {Button} from 'react-native-paper';

import * as Font from 'expo-font';

export default function Todo({route, navigation}) {
    const [todo, setTodo] = useState('')
    
    const addTodo = () => {
        const {params: { todoType}} = route;
        if(todo !== '') {
          firebase
          .database()
          .ref(`todo/${todoType}/${route.params.todosLength ? route.params.todosLength : 0}`)
          .update({
              id: route.params.todosLength ? route.params.todosLength : 0,
              content: todo,
              checked: false          
          })
          .then(data => {
            //success callback
            console.log("data ", data);
            navigation.navigate('ToDo', {focus: true});
          })
          .catch(error => {
            //error callback
            console.log("error ", error);
          });
        }
    }

  return (
    <View style={styles.containerStyles}>
        <Text style={styles.textStyles} >
          What tasks are you planning to complete?
        </Text>
        <TextInput
            style={styles.textInputStyles}
            multiline
            numberOfLines={4}
            value={todo}
            onChangeText={text => setTodo(text)}
        />
         <Button style={styles.buttonStyles} color="#F8A05A" mode="outlined" onPress={() => addTodo()}>
            Add Todo
        </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyles: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  textStyles: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'Rubik'
  },
  textInputStyles: {
    padding: 5,
    fontFamily: 'Rubik',
    color: 'grey',
  },
  buttonStyles: {
    marginTop: 10,
    borderColor: '#F8A05A',
    borderWidth: 2,
    color: 'green',
    fontFamily: 'Rubik'
  }
});
