import { format, getDate } from 'date-fns';

import { Task } from '@/app/(tabs)/index';
import { FlatList, StyleSheet } from 'react-native';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

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
      <ThemedText style={styles.date}>{format(date, 'eee') + ' ' + getDate(date)}</ThemedText>

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
    minHeight: 160,
    padding: 12,
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
    gap: 8,
  },

  date: {
    fontSize: 14,
    fontWeight: '700',
  },

  taskContainer: {
    flex: 1,
    gap: 6,
  },

  task: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 6,
  },

  emptyText: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 12,
    opacity: 0.6,
  },
});