import { StyleSheet } from 'react-native';

import TaskItem from '@/components/task-item';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Complexity, Task } from '@/constants/types';

const complexityColors: Record<Complexity, string> = {
    'simple': '#2DD4BF',
    'moderate': '#F59E0B',
    'complex': '#8B5CF6',
};

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function GeneralTasks({ tasks, complexity, complexityOrder, toggleTask }: { tasks: Task[]; complexity: Complexity; complexityOrder: Complexity[]; toggleTask: (id: number) => void }) {
    const filteredTasks = tasks.filter((task) => task.complexity === complexity && !task.urgent);

    const isComplexityUnlocked = (complexity: Complexity) => {
        const index = complexityOrder.indexOf(complexity);

        if (index === 0) {
        return true;
        }

        const previousComplexity = complexityOrder[index - 1];

        const previousTasks = tasks.filter(
        (task) => task.complexity === previousComplexity && !task.urgent
        );

        return (previousTasks.length > 0 && previousTasks.every((task) => task.completed));
    };

    const calculateTime = (mins: number): string => {
        if (mins < 60) {
            return `${mins}m`
        };

        const h = Math.floor(mins / 60);
        const m = mins % 60;
        
        return m ? `${h}h ${m}m` : `${h}h`;
        }

    const totalEstimatedTime = calculateTime(filteredTasks.reduce((total, task) => total + task.estimatedMinutes, 0));

    return ( 
        <ThemedView style={[
            styles.container, 
            isComplexityUnlocked(complexity) ? 
            {
                backgroundColor: complexityColors[complexity] + '1a',
                borderColor: '#F1F5F9'
            } :
            {
                backgroundColor: complexityColors[complexity] + '0A',
                borderColor: '#F1F5F915'
            }
            ]}>
            <ThemedView style={styles.headerContainer}>
                <ThemedText style={[styles.header,
                    isComplexityUnlocked(complexity) ? {color: complexityColors[complexity]} : {color: complexityColors[complexity] + '25'}
                ]}>{capitalize(complexity)}</ThemedText>
                <ThemedText style={[styles.tag,
                    isComplexityUnlocked(complexity) ?
                    {
                        color: complexityColors[complexity],
                        backgroundColor: complexityColors[complexity] + '40',
                        borderColor: '#2DD4BF1F'
                    } :
                    {
                        color: complexityColors[complexity] + '25',
                        backgroundColor: complexityColors[complexity] + '1f',
                        borderColor: '#F1F5F91F'
                    }
                ]}>{totalEstimatedTime} total</ThemedText>
            </ThemedView>
            <ThemedView style={styles.tasksContainer}>
                {filteredTasks.sort(
                    (a, b) => a.estimatedMinutes - b.estimatedMinutes
                ).map(
                    (task) => (<TaskItem key={task.id} task={task} unlock={isComplexityUnlocked(complexity)} toggleTask={toggleTask} />)
                ) || <ThemedText style={{ fontStyle: 'italic', color: 'grey' }}>No tasks available</ThemedText>}
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 16,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        borderRadius: 16,
        borderWidth: 1.317,

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
    },});