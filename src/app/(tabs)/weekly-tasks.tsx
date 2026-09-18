import { addDays, eachDayOfInterval, endOfISOWeek, format, startOfISOWeek } from 'date-fns';
import { FlatList, StyleSheet } from 'react-native';

import PriorityTaskCard from '@/components/task-container/date';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import { TestTasks } from '@/test-data';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WeekScreen() {

    const getFormattedWeekDays = () => {
        const today = new Date();
        const days = eachDayOfInterval({ start: startOfISOWeek(today), end: addDays(endOfISOWeek(today), 2) });
        return days.map(day => format(day, 'yyyy-MM-dd'));
    };

  return (
    <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.container}>
            <ThemedView style={styles.headerContainer}>
                <ThemedText style={styles.header}>Weekly Tasks</ThemedText>
                <ThemedText style={styles.subheader}>
                    {format(startOfISOWeek(new Date()), 'yyyy-MM-dd')} - {format(endOfISOWeek(new Date()), 'yyyy-MM-dd')}
                </ThemedText>
            </ThemedView>
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
    safeArea: {
        flex: 1, 
        backgroundColor: 'black',
        paddingHorizontal: 20,
    },
    
    container: {
        flex: 1,
        backgroundColor: 'black',
    },

    headerContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 4,
        backgroundColor: 'transparent',
        marginVertical: 24,
    },

    textContainer: {
        flexDirection: 'column',
        gap: 4,
        backgroundColor: 'transparent'
    },

    header: {
        color: '#F1F5F9',
        // fontFamily: 'Outfit',
        fontSize: 28,
        fontWeight: 700,
        lineHeight: 33.6, /* 120% */
        letterSpacing: -0.56,
    },
        
    subheader: {
        color: '#94A3B8',
        // fontFamily: 'Inter',
        fontSize: 13,   
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 19.5, /* 150% */
    },

    grid: {
        gap: 24,
    },

    row: {
        gap: 12,
    },
});