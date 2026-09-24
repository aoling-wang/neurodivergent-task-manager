import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import GeneralTasks from '@/components/task-container/complexity';
import UrgentTasks from '@/components/task-container/urgent';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { complexityOrder, type Task } from '@/constants/types';

import { TestTasks } from '@/test-data';

// import { createMMKV } from 'react-native-mmkv';    (Not supported in Expo Go)

// const storage = createMMKV({     
//   id: 'tasksStorage',             (Storage initailation if not exists and connection initailization)
// });

export const [tasks, setTasks] = useState<Task[]>(TestTasks);

//Get Greeting based on time of day

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Good Morning";
  } 
  if (hour < 17) {
    return "Good Afternoon"
  };
  return "Good Evening";
}

// Component Initialization

export default function HomeScreen() {
  const [reverse, setReverse] = useState(false);

  //Create derived state for complexity order

  const displayedComplexityOrder = reverse ? [...complexityOrder].reverse() : complexityOrder;

  //Load tasks from MMKV storage on component mount (Not supported in Expo Go)

  // const savedTasks = JSON.parse(storage.getString('tasksStorage') || '[]');
  // setTasks(savedTasks.length > 0 ? savedTasks : TestTasks);

  //Toggle task completion and deletion

  const toggleTask = (id: number) => {
    setTasks(tasks.map(
      (task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    // storage.set('tasksStorage', JSON.stringify(tasks));
  };

  //Element for rendering

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.headerContainer}>
          <ThemedView style={styles.textContainer}>
            <ThemedText style={styles.header}>{getGreeting()}, Kevin!</ThemedText>
            <ThemedText style={styles.subheader}>{new Date().toLocaleDateString( 'en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' } )}</ThemedText>
          </ThemedView>
          <TouchableOpacity onPress={() => setReverse(prev =>!prev)}>
            <MaterialDesignIcons name={reverse ? "sort-descending" : "sort-ascending"} size={24} color="#F1F5F9" style={styles.icon}/>
          </TouchableOpacity>
        </ThemedView>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

          {<UrgentTasks tasks={tasks} toggleTask={toggleTask} />}

          // Generate task boxes by order of complexity

          {displayedComplexityOrder.map(complexity => (
            <GeneralTasks key={complexity} tasks={tasks} complexity={complexity} complexityOrder={displayedComplexityOrder} toggleTask={toggleTask} />
          ))}

        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

//Styling

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  safeArea: {
    flex: 1, 
    backgroundColor: 'transparent',
    paddingHorizontal: 20
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 24,
    gap: 4,
    backgroundColor: 'transparent',
    
  },

  textContainer: {
    flexDirection: 'column',
    gap: 4,
    backgroundColor: 'transparent'
  },

  header: {
    color: '#F1F5F9',
    // fontFamily: 'Outfit',
    fontSize: 28,
    fontWeight: 700,
    lineHeight: 33.6, /* 120% */
    letterSpacing: -0.56,
  },
    
  subheader: {
    color: '#94A3B8',
    // fontFamily: 'Inter',
    fontSize: 13,   
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 19.5, /* 150% */
  },

  icon: {
    padding: 8,
    borderRadius: 12,
    borderWidth: 1.317,
    backgroundColor: '#ffffff2f',
    borderColor: '#ffffff85',
  }
})