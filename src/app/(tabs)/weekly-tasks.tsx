import { eachDayOfInterval, endOfISOWeek, format, startOfISOWeek } from 'date-fns';
import { FlatList, StyleSheet } from 'react-native';

import PriorityTaskCard from '@/components/task-container/date';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import { TestTasks } from '@/test-data';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WeekScreen() {

    const getFormattedWeekDays = () => {
        const today = new Date();
        const days = eachDayOfInterval({ start: startOfISOWeek(today), end: endOfISOWeek(today) });
        return days.map(day => format(day, 'yyyy-MM-dd'));
    };

  return (
    <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.container}>
            <ThemedText style={styles.header}>
                Weekly Tasks
            </ThemedText>
            <ThemedText style={styles.subheader}>
                {format(startOfISOWeek(new Date()), 'yyyy-MM-dd')} - {format(endOfISOWeek(new Date()), 'yyyy-MM-dd')}
            </ThemedText>
            <FlatList
                data={getFormattedWeekDays()}
                numColumns={3}
                keyExtractor={(date) => date}
                renderItem={({ item }) => (
                    <PriorityTaskCard
                        date={item}
                        tasks={TestTasks}
                    />
                )}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.grid}
            />
        </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },

    safeArea: {
        flex: 1,
        padding: 16,
    },

    header: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1C1C1E',
        marginVertical: 6,
    },

    subheader: {
        fontSize: 16,
        color: '#6E6E73',
        marginBottom: 16,
    },

    grid: {
        gap: 24,
    },

    row: {
        gap: 12,
    },
});