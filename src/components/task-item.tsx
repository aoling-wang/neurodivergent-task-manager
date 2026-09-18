import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Task } from '@/constants/types';
import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import { StyleSheet, TouchableOpacity } from 'react-native';

const tagColors: Record<string, string> = {
    'urgent': '#f43f5e',
    'simple': '#2DD4BF',
    'moderate': '#F59E0B',
    'complex': '#8B5CF6',
};

export default function TaskItem({ task, unlock, toggleTask }: { task: Task; unlock: boolean; toggleTask: (id: number) => void }) {
    return (
        <TouchableOpacity onPress={() => toggleTask(task.id)}>
            <ThemedView style={styles.taskContainer}>
                {task.completed ? 
                <FontAwesome name="check-square" size={14} color="#4b4b4ba8"/> : 
                <FontAwesome name="square-o" size={16} color={!unlock && !task.urgent ? "#4b4b4ba8" : "#858585e1"}/>}
                <ThemedText style={[styles.title, task.completed && styles.strikethrough, !unlock && styles.locked]}>{task.title}</ThemedText>

                <ThemedText style={[styles.tag, task.urgent ?
                    (!task.completed ? {
                            color: tagColors['urgent'],
                            backgroundColor: tagColors['urgent'] + '1f',
                            borderColor: tagColors['urgent']
                        } :
                        {
                            color: tagColors['urgent'] + '25',
                            backgroundColor: tagColors['urgent'] + '1f',
                            borderColor: tagColors['urgent'] + '25'
                        }) :
                    (!task.completed && unlock ? {
                        color: tagColors[task.complexity],
                        backgroundColor: tagColors[task.complexity] + '1f',
                        borderColor: tagColors[task.complexity]
                    } :
                    {
                        color: tagColors[task.complexity] + '25',
                        backgroundColor: tagColors[task.complexity] + '1f',
                        borderColor: tagColors[task.complexity] + '25'
                    })
                ]}>
                    {task.estimatedMinutes} min
                </ThemedText>
            </ThemedView>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    taskContainer: {
        display: 'flex',
        paddingVertical: 5,
        paddingHorizontal: 8,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        borderRadius: 10,
        borderWidth: 1.317,
        borderColor: '#ffffff0d',
        backgroundColor: '#ffffff08',
    },

    title: {
        color: '#F1F5F9',
        // fontFamily: 'Inter',
        fontSize: 13,
        fontStyle: 'normal',
        fontWeight: 400,
        marginRight: 'auto',
    },

    locked: {
        color: '#858585e1',
    },

    strikethrough: {
        textDecorationLine: 'line-through',
        color: '#858585e1',
    },

    tag: {
        display: 'flex',
        paddingHorizontal: 8,
        flexDirection: 'column',
        borderRadius: 100,
        borderWidth: 1.317,
        fontFamily: 'Inter',
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: 600,
    },
})