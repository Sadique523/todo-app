import React, {useEffect} from 'react';
import firebase from "firebase";
import {ScrollView, View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { ProgressBar, Checkbox, FAB } from 'react-native-paper';

export default function Todo({navigation, route}) {
  const [todos, setTodosList] = React.useState([]);
  const [completed, setCompleted] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  
  const { params : { type: todoType }} = route;
  useEffect(() => {
      let value = {};
      firebase
      .database()
      .ref(`todo/${todoType}`)
      .once("value", function(snapshot) {
          value = snapshot.val();
          let array = [];
          if (value) {
            Object.keys(value).forEach(item => array.push(value[item]));
            setTodosList(array);
            let checked = 0;
            array.forEach(item => {
              if(item.checked) {
                checked++; 
              }
            })
            setCompleted(checked);
          }
      });
      setLoading(false);
   
  }, [route.params]);

  const filterItems = (id, type) => {
    if(type === 'check') {
      let todoArray = [ ...todos ];
      let newtodoArray = todoArray.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            checked: !item.checked
          };
        } else {
          return item;
        }
      });
      let checked = 0;
      newtodoArray.forEach(item => {
        if(item.checked) {
          checked++; 
        }
      })
      setCompleted(checked);
      setTodosList([ ...newtodoArray ]);
      toggleTodo(newtodoArray);
    }
    else {
      let todoArray = [ ...todos ];
      let newtodoArray = todoArray.filter((item) => item.id !== id);
      setTodosList([ ...newtodoArray ]);
      toggleTodo(newtodoArray);
    }
	};

  const toggleTodo = (todoList) => {
    firebase
    .database()
    .ref(`todo/${todoType}`)
    .set({
      ...todoList
    })
    .then(data => {
      //success callback
      console.log("data ", data);
    })
    .catch(error => {
      //error callback
      console.log("error ", error);
    });
  }
  if(loading) {
    return (
      <View>
        <Text>
          Loading...
        </Text>
      </View>
    )
  }
  return (
    <View style={styles.containerStyles}>
      <ScrollView>
        <View style={styles.innerContainerStyles}>
          <View style={styles.avatarStyles}>
            <Icon name={todoType === 'personal' ? 'rocket1' : 'laptop'} size={24} color="#F8A05A" />
          </View>
          <View style={styles.infoContainerStyles}>
            <Text style={styles.textStyles}>{todos.length} Tasks</Text>
            <Text style={styles.text2Styles}>{todoType === 'personal' ? 'Personal' : 'Work'}</Text>
            <ProgressBar
              progress={completed/todos.length}
              color="#F8A05A"
              style={styles.progressBarStyles}
            />
          </View>
          <View style={styles.todoContainer}>
            <Text style={styles.textStyles}>Today</Text>
            <View style={styles.todoListContainer}>
             {todos.map(todo => (
                    <View style={styles.todoStyles}>
                      <Checkbox color="#000" status={todo.checked ? 'checked' : 'unchecked'}  onPress={() => filterItems(todo.id, 'check') } />
                      <Text style={styles.todoTextStyles}>
                          {todo.content}
                      </Text>
                    </View>
                 
             ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <FAB
        style={styles.fab}
        medium
        icon="plus"
        color="white"
        onPress={() => navigation.navigate('AddTodo', { todosLength: todos.length, todoType })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyles: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainerStyles: {
    padding: 50,
    flex: 1,
  },
  avatarStyles: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#F8A05A',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainerStyles: {
    marginTop: 20,
  },
  progressBarStyles: {
    marginTop: 20,
  },
  textStyles: {
    fontSize: 12,
    color: 'grey',
    fontFamily: 'Rubik'
  },
  todoContainer: {
    marginTop: 20,
  },
  text2Styles: {
    fontSize: 24,
    fontFamily: 'Rubik',
    color: '#707070',
  },
  todoStyles: {
    paddingBottom: 20,
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F8F8F8',
  },
  todoListContainer: {
    marginTop: 20,
  },
  todoTextStyles: {
    paddingLeft: 20,
    fontSize: 10,
    color: '#606060',
    fontFamily: 'Rubik'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 10,
    backgroundColor: '#F8A05A',
  },
});
