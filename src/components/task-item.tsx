import { Task } from '@/app/(tabs)/index';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import { StyleSheet, TouchableOpacity } from 'react-native';

const complexityTagColors: Record<string, string> = {
    simple: '#569139', // dark green
    moderate: '#d0c060', // dark khaki
    complex: '#d06060', // dark coral
};

export default function TaskItem({ task, toggleTask }: { task: Task; toggleTask: (id: number) => void }) {
    return (
        <TouchableOpacity onPress={() => toggleTask(task.id)}>
            <ThemedView style={styles.taskContainer}>
                {task.completed ? 
                <FontAwesome name="check-square" size={22} color="black" style={styles.icon}/> : 
                <FontAwesome name="square-o" size={24} color="black" style={styles.icon}/>}
                <ThemedText style={styles.title}>{task.title}</ThemedText>
                <ThemedText style={styles.tag}>{task.estimatedMinutes} min</ThemedText>
            </ThemedView>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 2,
        backgroundColor: 'transparent',
    },

    icon: {
        backgroundColor: 'white',
    },

    title: {
        fontWeight: '400',
    },

    tag: {
        marginLeft: 'auto',
        fontSize: 12,
        paddingHorizontal: 8,
        paddingVertical: 0,
        borderRadius: 12,
        backgroundColor: '#e0e0e0',
    },
})