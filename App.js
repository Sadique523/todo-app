import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import { providers, firebaseAppAuth } from "./firebase";
import withFirebaseAuth from "react-with-firebase-auth";

import * as Font from 'expo-font';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/home';
import ToDo from './screens/todo';
import AddTodo from './screens/addTodo';

const Stack = createStackNavigator();

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
      Font.loadAsync({
          Rubik: require('./assets/fonts/RubikMonoOne-Regular.ttf'),
      }).then(() => setLoading(false));
  }, []);

  if(loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
  return (
    <>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="ToDo"
            component={ToDo}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#fff',
                elevation: 0,
              },
            }}
          />
            <Stack.Screen
            name="AddTodo"
            component={AddTodo}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#fff',
                elevation: 0,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);