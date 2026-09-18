import { addDays, format } from 'date-fns';

import { Task } from '@/constants/types';
import { FlatList, StyleSheet } from 'react-native';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const colors: { [key: string]: string } = {
    'monday': '#08b18c',
    'tuesday': '#9f2dd4',
    'wednesday': '#a6f65c',
    'thursday': '#f43f66',
    'friday': '#f5f10b',
    'saturday': '#2d54d4',
    'sunday': '#eb8f06',
}

export default function PriorityTaskCard({
  date,
  tasks,
}: {
  date: string;
  tasks: Task[];
}) {
  const filteredTasks = tasks.filter(
    (task) => task.urgent && task.date === date
  );

  return (
    <ThemedView style={styles.card}>
      <ThemedView style={[styles.dateContainer, { backgroundColor: colors[format(date, 'eeee').toLowerCase()] + '1f' }]}>
        <ThemedText style={[styles.day, {
          color: colors[format(date, 'eeee').toLowerCase()]
        }]}>{format(date, 'eee')}</ThemedText>
        <ThemedText style={styles.date}>
          {format(addDays(date, 1), 'MMM dd')}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.taskContainer}>
        {filteredTasks.length > 0 ? (
          <FlatList
            data={filteredTasks}
            renderItem={({ item }) => (
              <ThemedText style={styles.task}>
                {item.title}
              </ThemedText>
            )}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <ThemedText style={styles.emptyText}>
            No Priority Tasks
          </ThemedText>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 200,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#f1f5f9a6',
    backgroundColor: '#ffffff10',

  },

  dateContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 8,
    paddingBottom: 4,
    paddingHorizontal: 12,
  },

  day: {
    fontSize: 14,
    fontWeight: '700',
  },

  date: {
    fontSize: 12,
    fontWeight: '500',
    color: '#ffffff8c'
  },

  taskContainer: {
    flex: 1,
    gap: 6,
    backgroundColor: 'transparent',
    padding: 12,
  },

  task: {
    color: '#94A3B8',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 13.5,
  },

  emptyText: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 12,
    opacity: 0.6,
    color: '#54657c',
  },
});