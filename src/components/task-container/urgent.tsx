import { Task } from '@/app/(tabs)/index';
import TaskItem from '@/components/task-item';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

export default function UrgentTasks({ tasks, toggleTask }: { tasks: Task[]; toggleTask: (id: number) => void }) {
    const filteredTasks = tasks.filter((task) => task.urgent);

    return (
        <ThemedView style={styles.urgentContainer}>
            <ThemedView style={styles.urgentHeaderContainer}>
                <ThemedText style={styles.urgentHeader}>Priority Tasks</ThemedText>
                <ThemedText style={styles.urgentSubHeader}>Urgent</ThemedText>
            </ThemedView>
            <ThemedView style={styles.urgentTasksContainer}>
                {filteredTasks.map((task) => (<TaskItem key={task.id} task={task} toggleTask={toggleTask} />))}
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({

})