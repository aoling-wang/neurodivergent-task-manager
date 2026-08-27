import { Task } from '@/app/(tabs)/index';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import { Pressable, StyleSheet } from 'react-native';

export default function TaskItem({ task, toggleTask }: { task: Task; toggleTask: (id: number) => void }) {
    return (
        <Pressable onPress={() => toggleTask(task.id)}>
            <ThemedView style={styles.taskItem}>
                <FontAwesome name={task.completed ? 'check-square' : 'square-o'} size={24} color="black" />
                <ThemedText style={styles.taskText}>{task.title}</ThemedText>
            </ThemedView>
        </Pressable>
    );
}

const styles = StyleSheet.create({

})