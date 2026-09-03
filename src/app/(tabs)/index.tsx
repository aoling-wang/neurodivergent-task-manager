import { useState } from "react";
import { ScrollView, StyleSheet, Switch } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import GeneralTasks from '@/components/task-container/complexity';
import UrgentTasks from '@/components/task-container/urgent';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import { TestTasks } from '@/test-data';

export type Complexity = "simple" | "moderate" | "complex";

export const complexityOrder: Complexity[] = ["simple", "moderate", "complex"];

export type Task = {
  id: number;
  title: string;
  date: string;
  estimatedMinutes: number;
  complexity: Complexity;
  urgent: boolean;
  completed: boolean;
};

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>(TestTasks);

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
    // storage.set('tasksStorage', JSON.stringify(newTasks));
  };

  const [reverse, setReverse] = useState(false);

  const toggleReverse = () => {
    setReverse((prev) => !prev);
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.headerContainer}>
          <ThemedView style={styles.textContainer}>
            <ThemedText style={styles.header}>Good Evening, Kevin!</ThemedText>
            <ThemedText style={styles.subheader}>Today's {new Date().toLocaleDateString()}</ThemedText>
          </ThemedView>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={reverse ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleReverse}
            value={reverse}
          />
        </ThemedView>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {<UrgentTasks tasks={tasks} toggleTask={toggleTask} />}

          {reverse ?
          complexityOrder.reverse().map(complexity => (
            <GeneralTasks key={complexity} tasks={tasks} complexity={complexity} toggleTask={toggleTask} />
          )) :
          complexityOrder.map(complexity => (
            <GeneralTasks key={complexity} tasks={tasks} complexity={complexity} toggleTask={toggleTask} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
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
    fontSize: 28,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 6,
  },
    
  subheader: {
    fontSize: 16,
    color: '#6E6E73',
    marginBottom: 0,
  },
})