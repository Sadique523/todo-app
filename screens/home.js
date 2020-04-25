import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

import firebase from "firebase";
import { LinearGradient } from 'expo-linear-gradient';

import Icon from 'react-native-vector-icons/AntDesign';

export default function Home({navigation}) {

    const [personalTodos, setPersonalTodosList] = useState([]);
    const [workTodos, setWorkTodosList] = useState([]);
    const [personalCompleted, setPersonalCompleted] = useState(0);
    const [workCompleted, setWorkCompleted] = useState(0);

    useFocusEffect(() => {
        let value = {};
        firebase
        .database()
        .ref(`todo/personal`)
        .once("value", function(snapshot) {
            value = snapshot.val();
            let array = [];
            if (value) {
              Object.keys(value).forEach(item => array.push(value[item]));
              setPersonalTodosList(array);
              let checked = 0;
              array.forEach(item => {
                if(item.checked) {
                  checked++; 
                }
              })
              setPersonalCompleted(checked);
            }
            else {
                setPersonalTodosList([]);
                setPersonalCompleted(0);
            }
        });
      }, []);

      useFocusEffect(() => {
        let value = {};
        firebase
        .database()
        .ref(`todo/work`)
        .once("value", function(snapshot) {
            value = snapshot.val();
            let array = [];
            if (value) {
              Object.keys(value).forEach(item => array.push(value[item]));
              setWorkTodosList(array);
              let checked = 0;
              array.forEach(item => {
                if(item.checked) {
                  checked++; 
                }
              })
              setWorkCompleted(checked);
            }
            else {
                setWorkTodosList([]);
                setWorkCompleted(0);
            }
        });
      }, []);
    

    return (
        <View style={styles.containerStyles}>
        <LinearGradient
            colors={['#F8A05A', '#f4736a']}
            style={styles.linearGradient}>
            <View style={styles.innerContainerStyles}>
                <Text style={styles.textStyles}>TODO</Text>
            </View>
            <View style={styles.todoContainer}>
            <View style={styles.avatarWrapper}>
                <Image
                style={styles.avatarStyles}
                source={require('../assets/avatar.png')}
                />
            </View>
            <View>
                <Text style={styles.greetingStyles}>Hello, Sadique.</Text>
                <View style={styles.infoContainer}>
                <Text style={styles.infoTextStyles}>
                    Looks like you feel good!
                </Text>
                <Text style={styles.infoTextStyles}>
                    You have {(personalTodos.length - personalCompleted) + (workTodos.length - workCompleted)} tasks to do today
                </Text>
                </View>
            </View>
            </View>
            <ScrollView style={styles.cardContainerStyles} horizontal={true}>
            <TouchableOpacity onPress={() => navigation.navigate('ToDo', { type: 'personal'})}>
                <View
                style={styles.cardStyles}
                >
                <View style={styles.cardAvatarStyles}>
                    <Icon name="rocket1" size={24} color="#F8A05A" />
                </View>
                <View>
                    <Text style={styles.cardTaskInfoStyles}>{personalTodos.length} Tasks</Text>
                    <Text style={styles.cardTaskTypeInfoStyles}>Personal</Text>
                    <ProgressBar
                    progress={personalCompleted/ personalTodos.length}
                    color="#F8A05A"
                    style={styles.progressBarStyles}
                    />
                </View>
                </View>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate('ToDo',  { type: 'work'})}>
                <View
                style={styles.cardStyles}>
                <View style={styles.cardAvatarStyles}>
                    <Icon name="laptop" size={24} color="#F8A05A" />
                </View>
                <View>
                    <Text style={styles.cardTaskInfoStyles}>{workTodos.length} Tasks</Text>
                    <Text style={styles.cardTaskTypeInfoStyles}>Work</Text>
                    <ProgressBar
                    progress={workCompleted/ workTodos.length}
                    color="#F8A05A"
                    style={styles.progressBarStyles}
                    />
                </View>
                </View>
            </TouchableOpacity> */}
            </ScrollView>
        </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
  containerStyles: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  innerContainerStyles: {
    alignItems: 'center',
    padding: 10,
  },
  todoContainer: {
    margin: 50,
    marginBottom: 20,
  },
  cardAvatarStyles: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#F8A05A',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarWrapper: {
    backgroundColor: 'green',
    width: 40,
    height: 40,
    borderRadius: 100,
    elevation: 20,
  },
  avatarStyles: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 100,
  },
  greetingStyles: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: '600',
    color: '#F5F6FC',
    fontFamily: 'Rubik'
  },
  infoContainer: {
    marginTop: 10,
  },
  infoTextStyles: {
    fontSize: 12,
    color: '#F8F8F8',
    opacity: 0.6,
    fontFamily: 'Rubik',
    marginTop: 5,
  },
  cardContainerStyles: {
    padding: 20,
  },
  cardStyles: {
    margin: 20,
    width: 250,
    height: 350,
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    padding: 15,
    elevation: 15,
  },
  avatar2Styles: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
    borderRadius: 100,
  },
  cardTaskInfoStyles: {
    fontSize: 12,
    color: 'grey',
    fontFamily: 'Rubik'
  },
  progressBarStyles: {
    marginTop: 20,
  },
  cardTaskTypeInfoStyles: {
    fontSize: 24,
    fontWeight: '500',
    color: 'grey',
    fontFamily: 'Rubik'
  },
  textStyles: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Rubik'
  },
});
