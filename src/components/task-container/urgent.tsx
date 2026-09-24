import TaskItem from '@/components/task-item';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Task } from '@/constants/types';
import { StyleSheet } from 'react-native';

export default function UrgentTasks({ tasks, toggleTask }: { tasks: Task[]; toggleTask: (id: number) => void }) {
    const filteredTasks = tasks.filter((task) => task.urgent);

    // Converts total estimated minutes into an hours and minutes format

    function calculateTime(mins: number): string {
        if (mins < 60) {
            return `${mins}m`
        };

        const h = Math.floor(mins / 60);
        const m = mins % 60;
        
        return m ? `${h}h ${m}m` : `${h}h`;
        }

    const totalEstimatedTime = calculateTime(filteredTasks.reduce((total, task) => total + task.estimatedMinutes, 0));

    // Component initialization and rendering

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.headerContainer}>
                <ThemedText style={styles.header}>Urgent</ThemedText>
                <ThemedText style={styles.tag}>{totalEstimatedTime} total</ThemedText>
            </ThemedView>
            <ThemedView style={styles.tasksContainer}>
                {filteredTasks.map((task) => (<TaskItem key={task.id} task={task} unlock={true} toggleTask={toggleTask} />))}
            </ThemedView>
        </ThemedView>
    );
}

// Styling

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 16,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        borderRadius: 16,
        borderWidth: 1.317,
        borderColor: '#F1F5F9',
        backgroundColor: '#f43f5e1a',
        marginBottom: 16,
    },

    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
    },

    header: {
        color: '#F43F5E',
        // fontFamily: 'Outfit',
        fontSize: 13,
        fontWeight: 600,
        lineHeight: 19.5, /* 150% */
        letterSpacing: 0.78,
        textTransform: 'uppercase',
    },

    tag: {
        display: 'flex',
        paddingHorizontal: 8,
        flexDirection: 'column',
        borderRadius: 100,
        borderWidth: 1.317,
        borderColor: '#f43f5e33',
        backgroundColor: '#f43f5e1a',
        color: '#f43f5e',
        fontFamily: 'Inter',
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: 600,
    },

    tasksContainer: {
        paddingLeft: 4,
        paddingTop: 2,
        gap: 8,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
    },
});