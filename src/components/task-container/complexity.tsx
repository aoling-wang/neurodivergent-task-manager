import { StyleSheet } from 'react-native';

import { Complexity, complexityOrder, Task } from '@/app/(tabs)/index';
import TaskItem from '@/components/task-item';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const complexityColors: Record<Complexity, string> = {
    simple: '#F0F7ED',
    moderate: '#F8F5E8',
    complex: '#FCEEEE',
};

const complexityBorderColors: Record<Complexity, string> = {
    simple: '#245C24',
    moderate: '#5A4700',
    complex: '#7A1F1F',
};

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function GeneralTasks({ tasks, complexity, toggleTask }: { tasks: Task[]; complexity: Complexity; toggleTask: (id: number) => void }) {
    const filteredTasks = tasks.filter((task) => task.complexity === complexity);

    const totalEstimatedTime = filteredTasks.reduce((total, task) => total + task.estimatedMinutes, 0);

    const isComplexityUnlocked = (complexity: Complexity) => {
        const index = complexityOrder.indexOf(complexity);

        if (index === 0) {
        return true;
        }

        const previousComplexity = complexityOrder[index - 1];

        const previousTasks = tasks.filter(
        (task) => task.complexity === previousComplexity
        );

        return (
        previousTasks.length > 0 &&
        previousTasks.every((task) => task.completed)
        );
    };

    return ( 
        <ThemedView style={[
            styles.container, 
            isComplexityUnlocked(complexity) && {
                backgroundColor: complexityColors[complexity], 
                borderColor: complexityBorderColors[complexity],
                opacity: 1
            }]}>
            <ThemedView style={styles.headerContainer}>
                <ThemedText style={styles.header}>{capitalize(complexity)} Tasks</ThemedText>
                <ThemedText style={styles.tag}>{totalEstimatedTime} min</ThemedText>
            </ThemedView>
            <ThemedView style={styles.tasksContainer}>
                {filteredTasks.sort(
                    (a, b) => a.estimatedMinutes - b.estimatedMinutes
                ).map(
                    (task) => (<TaskItem key={task.id} task={task} toggleTask={toggleTask} />)
                ) || <ThemedText style={{ fontStyle: 'italic', color: 'grey' }}>No tasks available</ThemedText>}
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
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
        opacity: 0.55
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