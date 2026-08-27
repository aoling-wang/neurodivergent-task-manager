import { Complexity, Task } from '@/app/(tabs)/index';
import TaskItem from '@/components/task-item';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function GeneralTasks({ tasks, complexity, toggleTask }: { tasks: Task[]; complexity: Complexity; toggleTask: (id: number) => void }) {
    const filteredTasks = tasks.filter((task) => task.complexity === complexity);

    const totalEstimatedTime = filteredTasks.reduce((total, task) => total + task.estimatedMinutes, 0);

    return ( 
        <ThemedView style={styles.container}>
            <ThemedView style={styles.headerContainer}>
                <ThemedText style={styles.header}>{capitalize(complexity)} Tasks</ThemedText>
                <ThemedText style={styles.totalTime}>{totalEstimatedTime} min</ThemedText>
            </ThemedView>
            <ThemedView style={styles.tasksContainer}>
                {filteredTasks.map((task) => (<TaskItem key={task.id} task={task} toggleTask={toggleTask} />))}
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({

})