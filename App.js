import { StatusBar } from 'expo-status-bar';
import { View ,Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from './src/components/Header';
import Tasks from './src/components/Tasks/Tasks';
import Form from './src/components/Form';
import styles from './src/styles/main';
import { useState, useEffect } from 'react';
import database from './Database'

const Tab = createBottomTabNavigator();

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(function() {
    database.init()
    getTasks()
  },[])

  const getTasks=()=> {
    database.retrieve().then(function(tasksArray){
      setTasks(tasksArray); console.log(tasksArray)
    }).catch(function(){
      setTasks([])
    })
  }

  const addTask = (descr, taskDone) => {
    database.add({description: descr, done: taskDone}).then(function(){
      getTasks()
    })
  }

  const changeStatus = (id) => {
    
     tasks.forEach((t)=> {
      if(t.id === id) {
        t.done = !t.done
        database.update(t, id).then( function(){
          getTasks()
        })
      }
    })
  }

  const taskRemove = (id) => {
    database.delete(id).then(function() {
      getTasks()
    })
  }

  return (
    <NavigationContainer style={styles.container}>
      {/* <View style={styles.container}> */}
        <StatusBar style="auto" />
        <Header />

        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="List">
           
            {props => <Tasks {...props} tasks={tasks} changeStatus={changeStatus} onRemove={taskRemove}/>}
          </Tab.Screen>
          
          <Tab.Screen name="Add">
            {props => <Form {...props} onAddTask={addTask}/>}
          </Tab.Screen>    
        </Tab.Navigator>
      {/* </View> */}
    </NavigationContainer>
  );
}