import { Task } from '@/app/(tabs)/index';
import TaskItem from '@/components/task-item';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

export default function UrgentTasks({ tasks, toggleTask }: { tasks: Task[]; toggleTask: (id: number) => void }) {
    const filteredTasks = tasks.filter((task) => task.urgent);

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.headerContainer}>
                <ThemedText style={styles.header}>Priority Tasks</ThemedText>
                <ThemedText style={styles.tag}>Urgent</ThemedText>
            </ThemedView>
            <ThemedView style={styles.tasksContainer}>
                {filteredTasks.map((task) => (<TaskItem key={task.id} task={task} toggleTask={toggleTask} />))}
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 32,
        padding: 18,

        // Modern card shape
        borderRadius: 18,
        borderWidth: 1.5,
        borderColor: '#4A4A4A',

        // Default surface
        backgroundColor: '#FFFFFF',

        // Subtle card shadow
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.14,
        shadowRadius: 10,

        // Android shadow
        elevation: 5,
    },

    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        marginBottom: 14,
        paddingBottom: 12,

        // Creates a subtle visual separation between
        // the card header and its task list.
        borderBottomWidth: 1,
        borderBottomColor: '#6B6B6B',

        backgroundColor: 'transparent',
    },

    header: {
        fontSize: 19,
        fontWeight: '700',

        // Very dark text provides strong contrast
        // against the light card backgrounds.
        color: '#171717',

        letterSpacing: 0.2,
    },

    tag: {
        fontSize: 12,
        fontWeight: '700',

        // High-contrast text
        color: '#171717',

        // Pill shape
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 999,

        // Light surface with a clearly defined boundary
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: '#3D3D3D',

        overflow: 'hidden',
    },

    tasksContainer: {
        paddingLeft: 4,
        paddingTop: 2,

        backgroundColor: 'transparent',
    },
});